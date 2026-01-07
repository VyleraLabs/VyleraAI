import { streamTextToSpeech } from '@/lib/elevenLabs';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return new Response(JSON.stringify({ error: 'Text is required' }), { status: 400 });
    }

    const audioStream = await streamTextToSpeech(text);

    return new Response(audioStream, {
      headers: {
        'Content-Type': 'audio/mpeg',
        // Optional: 'Transfer-Encoding': 'chunked' is automatic for streams usually
      },
    });

  } catch (error: any) {
    console.error('TTS Error:', error);
    // Be careful not to leak sensitive error info to client, but log it server-side
    return new Response(JSON.stringify({ error: 'TTS Failed' }), { status: 500 });
  }
}
