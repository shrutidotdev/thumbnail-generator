// app/page.tsx
"use server";

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { auth } from '@clerk/nextjs/server';
import { Badge } from '@/components/ui/badge';
import { ensureUserExists } from '@/lib/db/user'; // Import your function
import { ThumbnailCreator } from '@/app/components/thumbnail-creator';

export default async function HomeThumbnailGenerator() {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const user = await ensureUserExists();
  const credits = user?.credits ?? 0;

  return credits === 0 ? (
    // if no credits → show buy credits
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm mx-4">
        <CardHeader className="text-center pb-2">
          <Image src="/file.svg" alt="Thumbnail Generator" width={24} height={24} />
          <Badge>You have 0 credits</Badge>
          <CardContent className="text-center text-muted-foreground">
            <div className="text-lg font-semibold">You’re out of credits!</div>
            <Button className="mt-2 w-full">Buy Credits</Button>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  ) : (
    // if credits > 0 → show your other component
    <ThumbnailCreator />
  );
}
