import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user's recent completed thumbnails
    const thumbnails = await prisma.thumbnail.findMany({
      where: {
        userId: userId,
        status: 'COMPLETED',
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 6,
      select: {
        id: true,
        title: true,
        thumbnailUrl: true,
        createdAt: true,
        settings: true,
      },
    });

    return NextResponse.json({
      success: true,
      thumbnails: thumbnails,
    });

  } catch (error) {
    console.error('Fetch thumbnails error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch thumbnails' },
      { status: 500 }
    );
  }
}