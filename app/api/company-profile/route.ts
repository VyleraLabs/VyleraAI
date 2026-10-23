import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const filenames = [
  "Vylera_Labs_Company_Profile_2026.pdf",
  "COMPROWEB Vylera Labs Indonesia - AI Enterprise Solutions - 2026.pdf"
];

export async function GET() {
  for (const filename of filenames) {
    const filePath = path.join(process.cwd(), "public", "assets", filename);
    try {
      await stat(filePath);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") continue;
      throw error;
    }

    // Omit Content-Length so Cloud Run streams PDFs larger than 32 MiB.
    const stream = Readable.toWeb(createReadStream(filePath));
    return new Response(stream as ReadableStream<Uint8Array>, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Vylera_Labs_Company_Profile_2026.pdf"',
        "Cache-Control": "no-store"
      }
    });
  }

  return new Response("Company profile is unavailable.", { status: 404 });
}
