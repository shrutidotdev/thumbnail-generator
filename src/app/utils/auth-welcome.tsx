"use server";

import { auth, currentUser } from '@clerk/nextjs/server';

export async function AuthWelcome() {
  const { userId } = await auth();
  
  if (!userId) {
    return;
  }

  const user = await currentUser();
  // console.log(user)
  
  return (
    <h1 className='text-2xl font-bold text-black'>
      Welcome, {user?.firstName || 'User'}
    </h1>
  );
}