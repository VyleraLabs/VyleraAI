export async function streamTextToSpeech(text: string, lang?: string): Promise<ReadableStream<Uint8Array>> {
  const apiKey = process.env.ELEVENLABS_API_KEY;

  // Select Voice ID based on language
  // English: VOICE_ID_EN (fallback to ELEVENLABS_VOICE_ID or hardcoded)
  // Indonesian: VOICE_ID_ID
  let voiceId = process.env.VOICE_ID_EN || process.env.ELEVENLABS_VOICE_ID || 'iWydkXKoiVtvdn4vLKp9';

  if (lang === 'id' && process.env.VOICE_ID_ID) {
    voiceId = process.env.VOICE_ID_ID;
  }

  if (!apiKey) {
    throw new Error('ELEVENLABS_API_KEY is not defined in environment variables');
  }

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream?optimize_streaming_latency=3`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_turbo_v2_5',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ElevenLabs API error: ${response.status} ${response.statusText} - ${errorText}`);
  }

  if (!response.body) {
    throw new Error('No body received from ElevenLabs API');
  }

  return response.body;
}
