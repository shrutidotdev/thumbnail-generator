import { uploadToBlob } from "@/lib/blob";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // check for user
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized user. Please sign in" },
        { status: 401 }
      );
    }

    // check for credits
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { credits: true, email: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // for credits
    if (user.credits < 1) {
      return NextResponse.json(
        { error: "Insufficient credits. Please upgrade you plan." },
        { status: 403 }
      );
    }

    // get uploaded file
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file Provided" }, { status: 404 });
    }

    // file size max 10MB
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File is too large. Max size is 10MB" },
        { status: 400 }
      );
    }

    // upload orginal image to vercel blob
    const { url: originalImageUrl } = await uploadToBlob(
      file,
      userId,
      file.name
    );

    // Insert thumbnail record in the database
    const thumbnail = await prisma.thumbnail.create({
      data: {
        id: nanoid(),
        title: file.name,
        originalImageUrl: originalImageUrl,
        thumbnailUrl: null,
        width: 1920,
        height: 1080,
        format: "PNG",
        status: "PROCESSING",
        settings: {},
        fileSize: file.size,
        userId: userId,
      },
    });

    return NextResponse.json({
      success: true,
      thumbnailId: thumbnail.id,
      originalImageUrl: thumbnail.originalImageUrl,
      message: "Image uploaded successfully",
    }, {
      headers: {
        'Cache-Control': 'no-cache',
      }
    });
  } catch (error) {
    console.error("Error while Uploading", error);
    return NextResponse.json(
      { error: "Upload failed. Please try again" },
      { status: 500 }
    );
  }
}
