import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { uploadToBlob } from "@/lib/blob";
import prisma from "@/lib/prisma";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  try {
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

    const thumbnail = await prisma.thumbnail.findUnique({
      where: { id: thumbnailId },
      select: { id: true, originalImageUrl: true, userId: true, status: true }
    });

    if (!thumbnail) {
      return NextResponse.json({ error: "Thumbnail not found" }, { status: 404 });
    }

    if (thumbnail.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
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
    let processedBuffer: Buffer;
    
    try {
      // Dynamically import the background removal library to avoid bundling issues
      console.log("Starting background removal...");
      const bgRemovalModule = await import("@imgly/background-removal-node");
      const removeBackground = bgRemovalModule.removeBackground;
      
      const removedBgBlob = await removeBackground(new Blob([imageBuffer]), {
        output: {
          format: "image/png",
          quality: 0.9,
        },
      });
      console.log("Background removal complete");
      
      // Convert Blob to Buffer for upload
      const processedArrayBuffer = await removedBgBlob.arrayBuffer();
      processedBuffer = Buffer.from(processedArrayBuffer);
    } catch (bgRemovalError) {
      console.error("Background removal failed, falling back to basic processing:", bgRemovalError);
      // Fallback: just process with sharp if background removal fails
      processedBuffer = await sharp(Buffer.from(imageBuffer))
        .png({ quality: 90 })
        .toBuffer();
    }

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