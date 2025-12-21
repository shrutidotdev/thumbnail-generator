import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import sharp from "sharp";
import { uploadToBlob } from "@/lib/blob";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    // Check for user
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized user. Please sign in" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { thumbnailId } = body;

    if (!thumbnailId) {
      return NextResponse.json({ error: "Thumbnail ID is required" }, { status: 400 });
    }

    // Get thumbnail from database
    const thumbnail = await prisma.thumbnail.findUnique({
      where: { id: thumbnailId },
      select: { id: true, originalImageUrl: true, userId: true, status: true }
    });

    if (!thumbnail || thumbnail.userId !== userId) {
      return NextResponse.json({ error: "Thumbnail not found" }, { status: 404 });
    }

    if (thumbnail.status !== "PROCESSING") {
      return NextResponse.json({ error: "Thumbnail already processed" }, { status: 400 });
    }

    // Fetch the original image
    const imageResponse = await fetch(thumbnail.originalImageUrl);
    if (!imageResponse.ok) {
      throw new Error("Failed to fetch original image");
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);

    // Process image with Sharp - basic optimization
    // For better background removal, consider using a more advanced library
    const processedBuffer = await sharp(buffer)
      .png({
        quality: 90,
        compressionLevel: 6
      })
      .resize(1920, 1080, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .toBuffer();

    // Upload processed image to blob
    const { url: processedImageUrl } = await uploadToBlob(
      processedBuffer,
      userId,
      `processed-${thumbnailId}.png`
    );

    // Update thumbnail with processed image URL
    await prisma.thumbnail.update({
      where: { id: thumbnailId },
      data: {
        thumbnailUrl: processedImageUrl,
        status: "COMPLETED"
      }
    });

    // Deduct credit
    await prisma.user.update({
      where: { id: userId },
      data: {
        credits: {
          decrement: 1
        }
      }
    });

    // Log usage
    await prisma.usageLog.create({
      data: {
        userId: userId,
        action: 'thumbnail_generate',
        metadata: {
          thumbnailId: thumbnailId,
        }
      }
    });

    return NextResponse.json({
      success: true,
      processedImageUrl,
      message: "Image processed successfully"
    });

  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: "Image processing failed. Please try again" },
      { status: 500 }
    );
  }
}