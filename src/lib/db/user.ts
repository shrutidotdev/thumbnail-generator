"use server";

import { auth, currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma'; 

export async function ensureUserExists() {
  const { userId } = await auth();
  const clerkUser = await currentUser();
  
  if (!userId || !clerkUser) {
    return null;
  }

  // Use upsert to create or update user
  const user = await prisma.user.upsert({
    where: { id: userId },
    update: {
      email: clerkUser.emailAddresses[0]?.emailAddress || '',
      name: `${clerkUser.firstName} ${clerkUser.lastName}`.trim() || null,
      imageUrl: clerkUser.imageUrl,
    },
    create: {
      id: userId, // Use Clerk's userId as primary key
      email: clerkUser.emailAddresses[0]?.emailAddress || '',
      name: `${clerkUser.firstName} ${clerkUser.lastName}`.trim() || null,
      imageUrl: clerkUser.imageUrl,
      credits: 5, // Default credits for new users
    },
  });

  return user;
}
