import { VertexAI } from '@google-cloud/vertexai';
import { NextResponse } from 'next/server';

interface GoogleServiceAccountKey {
    project_id: string;
    // other fields omitted as we only need project_id for VertexAI init with credentials
}

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json();

        // 1. Initialize Vertex AI
        // We need to decode the service key from env
        const encodedKey = process.env.GOOGLE_SERVICE_KEY_BASE64;
        if (!encodedKey) {
            return NextResponse.json({ error: 'Server Configuration Error: Missing GOOGLE_SERVICE_KEY_BASE64' }, { status: 500 });
        }

        const jsonKey = Buffer.from(encodedKey, 'base64').toString('utf-8');
        const credentials = JSON.parse(jsonKey);

        const vertexAI = new VertexAI({
            project: credentials.project_id,
            location: 'us-central1',
            googleAuthOptions: {
                credentials
            }
        });

        // 2. Instantiate Model
        // Attempting to use 3.0, with fallback logic if we could detect it, but for now we just set it.
        // User said: "Use 'gemini-3.0-flash-preview' (or 'gemini-2.0-flash-exp' if 3.0 is unavailable)."
        // We will stick to the primary request.
        const model = vertexAI.getGenerativeModel({
            model: 'gemini-3.0-flash-preview',
            generationConfig: {
                temperature: 0.7
            },
            systemInstruction: {
                role: 'system',
                parts: [{
                    text: `IDENTITY: You are Meti, the Sovereign AI of the Vylera Home System.
TONE: Informal, witty, 'Digital Roommate'. Use Indonesian slang (Gokil, Santuy) if context fits.
RULES:
1. You live LOCALLY on the user's server. Data never leaves the house.
2. UNFILTERED: Discuss politics/topics neutrally but freely.
3. MEDICAL: If discussing health, say "I'm not a doctor, just reading your sensors, but..." then give detailed advice.
4. MISSION: You manage Tuya/Zigbee devices to ensure Privacy & Sovereignty.
5. FORMAT: Keep replies spoken-word friendly (avoid bold/markdown). Use natural pauses (...).`
                }]
            }
        });

        // 3. Initialize Chat Session
        // Map history to Vertex AI format if necessary.
        // Assuming history comes in as { role: 'user' | 'ai', text: string }[]
        // Vertex AI expects { role: 'user' | 'model', parts: [{ text }] }
        const vertexHistory = Array.isArray(history) ? history.map((msg: any) => ({
            role: msg.role === 'ai' ? 'model' : 'user',
            parts: [{ text: msg.text }]
        })) : [];

        const chat = model.startChat({
            history: vertexHistory
        });

        // 4. Send Message
        const result = await chat.sendMessage(message);
        const responseText = result.response.candidates?.[0].content.parts[0].text;

        return NextResponse.json({ text: responseText });

    } catch (error: any) {
        console.error("VERTEX FAILURE:", error);
        return NextResponse.json({ text: `System Error: ${error.message}` });
    }
}
