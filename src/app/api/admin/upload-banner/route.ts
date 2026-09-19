import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getMongoDb } from "@/lib/mongodb";
import { Binary } from "mongodb";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image file provided." }, { status: 400 });
    }

    // Validate mime type (PNG, JPG/JPEG, WEBP)
    const validMimes = ["image/jpeg", "image/png", "image/webp"];
    if (!validMimes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file format. Only PNG, JPG, and WebP images are permitted." },
        { status: 400 }
      );
    }

    // Limit size to 5MB (well within MongoDB 16MB document limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image size exceeds 5MB limit." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate safe unique filename
    const ext = path.extname(file.name) || ".jpg";
    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_").toLowerCase();
    const uniqueFilename = `banner_${Date.now()}_${baseName}${ext}`;

    // 1. Permanently persist into MongoDB Atlas (uploaded_media collection)
    // This ensures uploaded banners are never lost during cloud/Hostinger git redeployments
    try {
      const db = await getMongoDb();
      await db.collection("uploaded_media").updateOne(
        { filename: uniqueFilename },
        {
          $set: {
            filename: uniqueFilename,
            contentType: file.type || "image/jpeg",
            data: new Binary(buffer),
            size: file.size,
            uploadedAt: new Date(),
          },
        },
        { upsert: true }
      );
    } catch (dbErr) {
      console.error("[MongoDB Media Persistence Error]:", dbErr);
    }

    // 2. Local filesystem cache for fast static asset serving
    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads", "banners");
      await mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, uniqueFilename);
      await writeFile(filePath, buffer);
    } catch (fsErr) {
      console.warn("[Local File Cache Warning]:", fsErr);
    }

    const publicUrl = `/uploads/banners/${uniqueFilename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: uniqueFilename,
    });
  } catch (error: any) {
    console.error("[Upload Banner Error]:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process image upload." },
      { status: 500 }
    );
  }
}
