import { VertexAI } from '@google-cloud/vertexai';

// Initialize Vertex AI with our project credentials
const vertex_ai = new VertexAI({
  project: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  location: 'us-central1' // Must match the region where we trained the model
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // THE SWITCH:
    // 1. Priority: Use 'VYLERA_TUNED_MODEL_ID' if set (Our Custom "Meti" Brain)
    // 2. Fallback: Use 'gemini-2.5-flash' (Latest base model for speed/cost)
    // NOTE: Do not use 1.5-flash; 2.5 is significantly faster for IoT JSON generation.
    const modelName = process.env.VYLERA_TUNED_MODEL_ID || 'gemini-2.5-flash';

    console.log(`[VyleraAI] Initializing neural core: ${modelName}`);

    // Instantiate the model
    const model = vertex_ai.getGenerativeModel({
      model: modelName,
      // Safety settings tuned for "Sovereign OS" personality (less restrictive on "scary" IoT terms)
      safetySettings: [{category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH'}]
    });

    // Create the chat session with history
    const chat = model.startChat({
      history: messages.slice(0, -1).map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      })),
    });

    // Send the latest user message
    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;

    // Extract text safely
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return new Response(text);

  } catch (error) {
    console.error("[VyleraAI] Neural Core Error:", error);
    return new Response("Neural Core Error: Unable to process request.", { status: 500 });
  }
}
