import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const thumbnails = await prisma.thumbnail.findMany({
      where: {
        userId: userId,
        status: { in: ['PROCESSING','COMPLETED']},
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
    }, {
      headers: {
        'Cache-Control': 'no-store', 
      }
    });

  } catch (error) {
    console.error('Fetch thumbnails error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch thumbnails' },
      { status: 500 }
    );
  }
}