import { VertexAI } from '@google-cloud/vertexai';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

// Interface for the Google Service Account Key
interface GoogleServiceAccountKey {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain?: string;
}

let vertexAI: VertexAI | null = null;
let ttsClient: TextToSpeechClient | null = null;

try {
  const encodedKey = process.env.GOOGLE_SERVICE_KEY_BASE64;
  if (encodedKey) {
    const jsonKey = Buffer.from(encodedKey, 'base64').toString('utf-8');
    const credentials = JSON.parse(jsonKey) as GoogleServiceAccountKey;

    // Initialize Vertex AI
    // Note: The VertexAI constructor takes project and location.
    // Authentication is handled via googleAuthOptions if needed,
    // or it falls back to ADC. passing credentials explicitly:
    vertexAI = new VertexAI({
      project: credentials.project_id,
      location: 'us-central1', // Defaulting to us-central1 as it's common for Vertex
      googleAuthOptions: {
        credentials,
      },
    });

    // Initialize Text-to-Speech
    ttsClient = new TextToSpeechClient({
      credentials,
    });

    console.log('Google AI clients initialized successfully.');
  } else {
    console.warn('GOOGLE_SERVICE_KEY_BASE64 is not set. Google AI features will not work.');
  }
} catch (error) {
  console.error('Failed to initialize Google AI clients:', error);
}

export async function generateGoogleTTS(text: string): Promise<Uint8Array> {
  if (!ttsClient) {
    throw new Error('Google TTS Client not initialized');
  }

  const request = {
    input: { text },
    // Fallback Voice: Google Chirp 3 HD (en-US-Chirp-HD-F)
    voice: { languageCode: 'en-US', name: 'en-US-Chirp-HD-F' },
    audioConfig: { audioEncoding: 'MP3' as const },
  };

  try {
    const [response] = await ttsClient.synthesizeSpeech(request);

    if (!response.audioContent) {
      throw new Error('No audio content received from Google TTS');
    }

    // Ensure we return a Uint8Array
    if (typeof response.audioContent === 'string') {
        return new Uint8Array(Buffer.from(response.audioContent, 'base64'));
    }
    return response.audioContent as Uint8Array;
  } catch (error) {
    console.error("Google TTS Generation Failed:", error);
    throw error;
  }
}

export { vertexAI, ttsClient };
