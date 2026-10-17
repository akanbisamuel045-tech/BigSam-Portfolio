import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { ADMIN_COOKIE_NAME, getAdminPassword, verifySessionToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

async function isAuthorized(request: NextRequest): Promise<boolean> {
  const adminKey = request.headers.get("x-admin-key");
  if (adminKey && adminKey.trim() === getAdminPassword().trim()) {
    return true;
  }
  const sessionToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (sessionToken && (await verifySessionToken(sessionToken))) {
    return true;
  }
  return false;
}

/**
 * POST /api/admin/upload
 * Accepts multipart/form-data with a "file" field, validates file type and size (< 10MB),
 * and saves it into public/assets/uploads/.
 */
export async function POST(request: NextRequest) {
  try {
    if (!(await isAuthorized(request))) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Administrator session required." },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided in form data." },
        { status: 400 }
      );
    }

    // Validate size (< 10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: "File exceeds maximum size limit of 10MB." },
        { status: 400 }
      );
    }

    // Validate MIME type
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/svg+xml",
      "image/gif",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Unsupported file type. Please upload a PNG, JPEG, WebP, SVG, or GIF image.",
        },
        { status: 400 }
      );
    }

    // Ensure destination directory exists
    const uploadsDir = path.join(process.cwd(), "public", "assets", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    // Generate sanitized unique filename
    const ext = path.extname(file.name) || ".png";
    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    const filename = `upload_${Date.now()}_${baseName}${ext}`;
    const destinationPath = path.join(uploadsDir, filename);

    // Save file to disk
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(destinationPath, buffer);

    const publicUrl = `/assets/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      size: file.size,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to process image upload.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
