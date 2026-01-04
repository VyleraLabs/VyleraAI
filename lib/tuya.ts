import axios from 'axios';
import CryptoJS from 'crypto-js';

export class TuyaClient {
  private accessId: string;
  private accessSecret: string;
  private region: string;
  private baseUrl: string;

  constructor() {
    this.accessId = process.env.TUYA_ACCESS_ID || '';
    this.accessSecret = process.env.TUYA_ACCESS_SECRET || '';
    this.region = process.env.TUYA_REGION || 'US';

    // Determine Base URL based on region
    switch (this.region) {
      case 'CN': this.baseUrl = 'https://openapi.tuyacn.com'; break;
      case 'US': this.baseUrl = 'https://openapi.tuyaus.com'; break;
      case 'EU': this.baseUrl = 'https://openapi.tuyaeu.com'; break;
      case 'IN': this.baseUrl = 'https://openapi.tuyain.com'; break;
      default: this.baseUrl = 'https://openapi.tuyaus.com';
    }
  }

  private calculateSignature(
    method: string,
    url: string,
    body: string,
    timestamp: string,
    accessToken: string = '',
    nonce: string = ''
  ): string {
    const contentSha256 = CryptoJS.SHA256(body).toString(CryptoJS.enc.Hex);

    // StringToSign = HTTPMethod + "\n" + Content-SHA256 + "\n" + Headers + "\n" + URL
    // Headers are optional in signature if not strictly required, standard mode uses simpler form usually but docs say:
    // stringToSign = HTTPMethod + "\n" + Content-SHA256 + "\n" + Headers + "\n" + URL
    // If Headers are empty, it's just two newlines.

    const stringToSign = [
      method,
      contentSha256,
      '', // Headers (empty for now)
      url
    ].join('\n');

    // Str = client_id + access_token + t + nonce + stringToSign
    const str = this.accessId + accessToken + timestamp + nonce + stringToSign;

    return CryptoJS.HmacSHA256(str, this.accessSecret).toString(CryptoJS.enc.Hex).toUpperCase();
  }

  // Helper to get access token (Simplified for this task, assuming we might need it)
  // For standard mode with V2, we need a token.
  async getToken(): Promise<string> {
    const method = 'GET';
    const path = '/v1.0/token?grant_type=1';
    const timestamp = Date.now().toString();
    const nonce = ''; // UUID if needed

    // Token request signature: str = client_id + t + nonce + stringToSign
    // (No access token in the string)

    const contentSha256 = CryptoJS.SHA256('').toString(CryptoJS.enc.Hex);
    const stringToSign = [method, contentSha256, '', path].join('\n');
    const str = this.accessId + timestamp + nonce + stringToSign;
    const sign = CryptoJS.HmacSHA256(str, this.accessSecret).toString(CryptoJS.enc.Hex).toUpperCase();

    try {
      const response = await axios.get(`${this.baseUrl}${path}`, {
        headers: {
          client_id: this.accessId,
          sign: sign,
          t: timestamp,
          sign_method: 'HMAC-SHA256',
          nonce: nonce
          // stringToSign is not sent as header
        }
      });

      if (response.data.success) {
        return response.data.result.access_token;
      } else {
        throw new Error(`Tuya Token Error: ${response.data.msg}`);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Failed to get Tuya token:', error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error('Failed to get Tuya token:', error.message);
      }
      throw error;
    }
  }

  async getDeviceDetails(deviceId: string) {
    const token = await this.getToken();

    const method = 'GET';
    const path = `/v1.0/devices/${deviceId}`;
    const timestamp = Date.now().toString();
    const nonce = '';

    const signature = this.calculateSignature(method, path, '', timestamp, token, nonce);

    try {
      const response = await axios.get(`${this.baseUrl}${path}`, {
        headers: {
          client_id: this.accessId,
          access_token: token,
          sign: signature,
          t: timestamp,
          sign_method: 'HMAC-SHA256',
          nonce: nonce
        }
      });

      if (response.data.success) {
        return response.data.result;
      } else {
         // Handle error
         throw new Error(`Tuya API Error: ${response.data.msg}`);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Failed to get device details:', error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error('Failed to get device details:', error.message);
      }
       throw error;
    }
  }
}
