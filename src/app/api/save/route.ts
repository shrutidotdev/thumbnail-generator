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
            );
        }

        const body = await req.json();
        const { thumbnailId, settings } = body;
        if (!thumbnailId) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const thumbnail = await prisma.thumbnail.findUnique({
            where: { id: thumbnailId },
        });

        if (!thumbnail) {
            return NextResponse.json(
                { error: 'Thumbnail not found' },
                { status: 404 }
            );
        }

        if (thumbnail.userId !== userId) {
            return NextResponse.json(
                { error: 'Unauthorized access' },
                { status: 403 }
            );
        }

        if (thumbnail.status !== "COMPLETED") {
            return NextResponse.json(
                { error: 'Thumbnail is not ready to be saved' },
                { status: 400 }
            );
        }

        const updatedThumbnail = await prisma.thumbnail.update({
            where: { id: thumbnailId },
            data: {
                settings: settings || {},
            }
        });

        await prisma.usageLog.create({
            data: {
                userId: userId,
                action: 'thumbnail_save',
                metadata: {
                    thumbnailId: thumbnailId,
                    settings: settings,
                }
            }
        });

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