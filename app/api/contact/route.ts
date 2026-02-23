import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import nodemailer from "nodemailer";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
    try {
        // Enforce Server-Side Authentication
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized Node. Session invalid." }, { status: 401 });
        }

        const body = await req.json();
        const { name, email, subject, message } = body;

        // Basic payload validation
        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: "Incomplete data payload." }, { status: 400 });
        }

        // Validate that the request email matches the authenticated session email
        // Prevents users from spoofing external addresses while logged in.
        if (session.user.email !== email) {
            return NextResponse.json({ error: "Email spoofing detected." }, { status: 403 });
        }

        // Server-Side Sanitization (Redundant defense against XSS passing through client layers)
        const sanitizeHtml = (str: string) => str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const cleanSubject = sanitizeHtml(subject);
        const cleanMessage = sanitizeHtml(message);

        // Check for required SMTP environment variables
        if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
            console.error("CRITICAL ERROR: SMTP environment variables are missing.");
            return NextResponse.json({ error: "Internal Server Configuration Error." }, { status: 500 });
        }

        // Initialize Nodemailer Transport
        const transporter = nodemailer.createTransport({
            service: "gmail", // Assuming a standard Gmail App Password setup based on standard approaches 
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        // Email Transport Options
        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: ["solutions@vyleralabs.com", "founder@vyleralabs.com"],
            subject: `[Vylera App Comm] ${cleanSubject}`,
            html: `
                <div style="font-family: monospace; background-color: #050B14; color: #a0aec0; padding: 20px; border: 1px solid #22d3ee;">
                    <h2 style="color: #22d3ee;">Incoming Vylera Transmission</h2>
                    <hr style="border-color: #334155; margin-bottom: 20px;">
                    <p><strong>Authenticated Sender:</strong> ${sanitizeHtml(name)}</p>
                    <p><strong>Verified Node (Email):</strong> ${email}</p>
                    <p><strong>Subject Segment:</strong> ${cleanSubject}</p>
                    <hr style="border-color: #334155; margin-top: 20px; margin-bottom: 20px;">
                    <h3 style="color: #fff;">Payload Message:</h3>
                    <p style="white-space: pre-wrap; font-size: 14px;">${cleanMessage}</p>
                    <br/>
                    <small style="color: #475569;">Generated via secure Google OAuth Vylera integration.</small>
                </div>
            `,
        };

        // Dispatch
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: "Transmission Successful." }, { status: 200 });

    } catch (error) {
        console.error("Contact API Server Error:", error);
        return NextResponse.json({ error: "Fatal transmission failure. Check console logic." }, { status: 500 });
    }
}
