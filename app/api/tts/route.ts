import { TextToSpeechClient } from '@google-cloud/text-to-speech';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    const encodedKey = process.env.GOOGLE_SERVICE_KEY_BASE64;
    if (!encodedKey) {
      console.error('GOOGLE_SERVICE_KEY_BASE64 env var is missing');
      return new Response(JSON.stringify({ error: 'Server configuration error' }), { status: 500 });
    }

    // Decode Base64 string -> JSON string -> Object
    const jsonKey = JSON.parse(Buffer.from(encodedKey, 'base64').toString('utf-8'));

    // Initialize the client with these credentials
    const client = new TextToSpeechClient({ credentials: jsonKey });

    const [response] = await client.synthesizeSpeech({
      input: { text },
      voice: { languageCode: 'en-US', name: 'en-US-Chirp3-HD-Sulafat' },
      audioConfig: { audioEncoding: 'MP3' },
    });

    if (!response.audioContent) {
        throw new Error('No audio content received');
    }

    return new Response(response.audioContent as BodyInit, {
      headers: { 'Content-Type': 'audio/mpeg' },
    });
  } catch (error) {
    console.error('TTS Error:', error);
    return new Response(JSON.stringify({ error: 'TTS Failed' }), { status: 500 });
  }
}
