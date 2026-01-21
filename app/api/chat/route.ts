import { VertexAI, HarmCategory, HarmBlockThreshold } from '@google-cloud/vertexai';

// Initialize Vertex AI with our project credentials
const vertex_ai = new VertexAI({
  project: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  location: 'us-central1'
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // THE SWITCH: Priority to Custom Brain, Fallback to 2.5 Flash
    const modelName = process.env.VYLERA_TUNED_MODEL_ID || 'gemini-2.5-flash';

    console.log(`[VyleraAI] Initializing neural core: ${modelName}`);

    // Instantiate the model with CORRECT TYPED safety settings
    const model = vertex_ai.getGenerativeModel({
      model: modelName,
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ],
    });

    // Create the chat session
    const chat = model.startChat({
      history: messages.slice(0, -1).map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      })),
    });

    // Send message
    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return new Response(text);

  } catch (error) {
    console.error("[VyleraAI] Neural Core Error:", error);
    return new Response("Neural Core Error: Unable to process request.", { status: 500 });
  }
}
