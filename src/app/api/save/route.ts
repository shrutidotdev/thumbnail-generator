import { uploadThumbnailToBlob } from "@/lib/blob";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized user" },
                { status: 401 }
            )
        }

        // get the data from req 
        const body = await req.json();
        const { thumbnailId, dataUrl, settings, originalFilename } = body;
        if (!thumbnailId || !dataUrl) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        // verify thumbnail ownership 
        const thumbnail = await prisma.thumbnail.findUnique({
            where: { id: thumbnailId },
        });

        if (!thumbnail || thumbnail.userId !== userId) {
            return NextResponse.json(
                { error: 'Thumbnail not found or unauthorized' },
                { status: 404 }
            );
        }


        // upload processed thumbnail to blob 
        const { url: thumbnailUrl, size } = await uploadThumbnailToBlob(
            dataUrl,
            userId,
            originalFilename || 'thumbnail'
        )

        // save
        const updatedThumbnail = await prisma.thumbnail.update({
            where: { id: thumbnailId },
            data: {
                thumbnailUrl: thumbnailUrl,
                status: "COMPLETED",
                settings: settings || {},
                fileSize: size
            }
        })

        // deduct credit
        await prisma.user.update({
            where: { id: userId },
            data: {
                credits: {
                    decrement: 1
                }
            }
        })

        // log usage 
        await prisma.usageLog.create({
            data: {
                userId: userId,
                action: 'thumbnail_generate',
                metadata: {
                    thumbnailId: thumbnailId,
                    settings: settings,
                }
            }
        })

        return NextResponse.json({
            success: true,
            thumbnail: updatedThumbnail,
            message: "Thumbnail saved successfully"
        });


    } catch (error) {
        console.error('Save thumbnail error:', error);
        return NextResponse.json(
            { error: 'Failed to save thumbnail' },
            { status: 500 }
        );
    }
}