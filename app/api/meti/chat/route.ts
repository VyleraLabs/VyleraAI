import { NextResponse } from 'next/server';
import { vertexAI, ttsClient } from '@/lib/google-ai';

export async function POST(request: Request) {
  try {
    const { message, uid } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!vertexAI || !ttsClient) {
      console.error('Google AI clients not initialized');
      return NextResponse.json(
        { error: 'AI services unavailable' },
        { status: 503 }
      );
    }

    // 1. Generate text response using Vertex AI (Gemini Flash)
    // Note: 'gemini-1.5-flash-001' is a common model name, but checking documentation
    // or assuming a standard 'gemini-pro' or similar might be safer if flash isn't available.
    // However, the prompt specifically asked for "Gemini Flash model".
    // I will use 'gemini-1.5-flash-001'.

    const model = vertexAI.getGenerativeModel({
      model: 'gemini-1.5-flash-001',
      systemInstruction: {
        role: 'system',
        parts: [{ text: "You are Meti, the Vylera OS AI. You are helpful, concise, and futuristic." }]
      }
    });

    const chat = model.startChat({
        // We could maintain history here if we had a way to persist it or pass it back and forth
        // For now, it's single turn or stateless per request unless we pass history in.
        // The prompt implies a simple request/response structure.
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.candidates?.[0].content.parts[0].text;

    if (!responseText) {
      throw new Error('No response from Vertex AI');
    }

    // 2. Generate audio using Google TTS
    const requestTts = {
      input: { text: responseText },
      // Select the language and SSML voice gender (optional)
      voice: { languageCode: 'en-US', name: 'en-US-Journey-F' },
      // select the type of audio encoding
      audioConfig: { audioEncoding: 'MP3' as const },
    };

    const [responseTts] = await ttsClient.synthesizeSpeech(requestTts);
    const audioContent = responseTts.audioContent;

    if (!audioContent) {
        throw new Error('No audio content from TTS');
    }

    // Ensure audioContent is base64 string
    const audioBase64 = Buffer.from(audioContent).toString('base64');

    return NextResponse.json({
      text: responseText,
      audioContent: audioBase64,
    });

  } catch (error) {
    console.error('Error in /api/meti/chat:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
