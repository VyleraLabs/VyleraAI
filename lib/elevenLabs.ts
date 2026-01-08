export async function streamTextToSpeech(text: string): Promise<ReadableStream<Uint8Array>> {
  const apiKey = process.env.ELEVENLABS_API_KEY;

  // Task 1: Unified Voice ID & Audio Logic
  // Hardcoded to Indonesian Voice ID for single-voice bilingualism (Zero-Failure: One-Voice)
  // This adheres to the "Unified Indo-Accent Voice" requirement.
  const voiceId = 'iWydkXKoiVtvdn4vLKp9';

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
