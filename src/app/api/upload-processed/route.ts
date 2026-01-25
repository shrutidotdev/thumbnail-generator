import { uploadToBlob } from "@/lib/blob";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized user. Please sign in" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const thumbnailId = formData.get("thumbnailId") as string;

    if (!file || !thumbnailId) {
      return NextResponse.json({ error: "Missing file or thumbnailId" }, { status: 400 });
    }

    const thumbnail = await prisma.thumbnail.findUnique({
      where: { id: thumbnailId },
      select: { id: true, userId: true, status: true }
    });

    if (!thumbnail) {
      return NextResponse.json({ error: "Thumbnail not found" }, { status: 404 });
    }

    if (thumbnail.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    // Upload processed image to blob
    const { url: processedImageUrl } = await uploadToBlob(
      file,
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
        action: 'thumbnail_generate_client',
        metadata: {
          thumbnailId: thumbnailId,
        }
      }
    });

    return NextResponse.json({
      success: true,
      processedImageUrl,
      message: "Processed image uploaded successfully"
    });

  } catch (error) {
    console.error("Error uploading processed image:", error);
    return NextResponse.json(
      { error: "Upload failed. Please try again" },
      { status: 500 }
    );
  }
}
