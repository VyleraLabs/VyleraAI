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

export { vertexAI, ttsClient };
