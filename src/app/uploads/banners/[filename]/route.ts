import { NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  context: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await context.params;
    const safeFilename = path.basename(filename);

    const ext = path.extname(safeFilename).toLowerCase();
    const contentType =
      ext === ".png"
        ? "image/png"
        : ext === ".webp"
        ? "image/webp"
        : "image/jpeg";

    // 1. Check if the file exists on the local filesystem
    const localFilePath = path.join(process.cwd(), "public", "uploads", "banners", safeFilename);
    if (fs.existsSync(localFilePath)) {
      const fileBuffer = fs.readFileSync(localFilePath);
      return new Response(new Uint8Array(fileBuffer), {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    // 2. Look up in MongoDB Atlas uploaded_media collection (persistent across deployments)
    try {
      const db = await getMongoDb();
      const mediaDoc = await db.collection("uploaded_media").findOne({ filename: safeFilename });

      if (mediaDoc && mediaDoc.data) {
        let buffer: Buffer;
        if (Buffer.isBuffer(mediaDoc.data)) {
          buffer = mediaDoc.data;
        } else if (mediaDoc.data.buffer) {
          buffer = Buffer.from(mediaDoc.data.buffer);
        } else {
          buffer = Buffer.from(mediaDoc.data);
        }

        // Cache back to local disk for fast subsequent serving
        try {
          const uploadDir = path.join(process.cwd(), "public", "uploads", "banners");
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }
          fs.writeFileSync(localFilePath, buffer);
        } catch {
          // Local cache write is non-blocking
        }

        return new Response(new Uint8Array(buffer), {
          status: 200,
          headers: {
            "Content-Type": mediaDoc.contentType || contentType,
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      }
    } catch (dbErr) {
      console.error("[Serve Banner DB Error]:", dbErr);
    }

    // 3. Resilient Fallback: If image was wiped prior to persistent storage or not found,
    // gracefully serve a branded default banner instead of throwing a 404 console error.
    const fallbackCandidates = [
      path.join(process.cwd(), "public", "uploads", "banners", "banner_1789246739015_ibloom_banner.png"),
      path.join(process.cwd(), "public", "images", "traderoom", "time-cycle-trading.jpg"),
      path.join(process.cwd(), "public", "images", "traderoom", "hero-02.png"),
    ];

    for (const fallbackPath of fallbackCandidates) {
      if (fs.existsSync(fallbackPath)) {
        const fallbackBuffer = fs.readFileSync(fallbackPath);
        const fallbackExt = path.extname(fallbackPath).toLowerCase();
        const fallbackMime = fallbackExt === ".png" ? "image/png" : "image/jpeg";

        return new Response(new Uint8Array(fallbackBuffer), {
          status: 200,
          headers: {
            "Content-Type": fallbackMime,
            "Cache-Control": "public, max-age=60", // Short cache for fallback
          },
        });
      }
    }

    return new Response("Banner image not found", { status: 404 });
  } catch (error: any) {
    console.error("[Banner Route Handler Error]:", error);
    return new Response("Error loading image", { status: 500 });
  }
}
