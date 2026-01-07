import { streamTextToSpeech } from '@/lib/elevenLabs';
import { generateGoogleTTS } from '@/lib/google-ai';

export async function POST(request: Request) {
  const { text, lang } = await request.json();

  if (!text) {
    return new Response(JSON.stringify({ error: 'Text is required' }), { status: 400 });
  }

  try {
    // PRIMARY ENGINE: ElevenLabs
    const audioStream = await streamTextToSpeech(text, lang);

    return new Response(audioStream, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });

  } catch (primaryError: any) {
    console.warn('Primary TTS (ElevenLabs) Failed, attempting fallback:', primaryError);

    try {
      // SECONDARY ENGINE: Google Chirp 3 HD Fallback
      const audioBuffer = await generateGoogleTTS(text);

      // Ensure we pass a Buffer or ArrayBuffer, or Blob to Response
      // Uint8Array is technically ArrayBufferView, which some environments might complain about if expecting Blob | BufferSource
      // Casting to any to bypass strict check if environment supports it, or wrap in Blob.
      // But standard Request/Response should take ArrayBuffer or Uint8Array.
      // The error says "missing properties from URLSearchParams", implying it thinks we are passing something else.

      return new Response(audioBuffer as unknown as BodyInit, {
        headers: {
            'Content-Type': 'audio/mpeg',
            'Content-Length': audioBuffer.byteLength.toString(),
        }
      });

    } catch (fallbackError: any) {
       console.error('All TTS Engines Failed. Secondary Error:', fallbackError);
       return new Response(JSON.stringify({ error: 'TTS System Failure' }), { status: 500 });
    }
  }
}
