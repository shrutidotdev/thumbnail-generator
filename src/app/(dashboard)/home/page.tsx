"use server";


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default async function HomeThumbnailGenerator() {

  return (
    <div className="flex items-center justify-center h-screen w-full overflow-hidden">
      <Card className="w-full max-w-sm mx-4">
        <CardHeader className="text-center pb-2">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-2 rounded-xl mx-auto">
            <Image src="/file.svg" alt="Thumbnail Generator" width={24} height={24} />
          </div>
          <CardTitle className="text-lg">Generate Thumbnail</CardTitle>
          <CardContent className="text-center text-muted-foreground">
            <p className="text-muted-foreground text-sm mb-4">
              Create eye-catching thumbnails for your videos
            </p>

            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              Start Creating
            </Button>
          </CardContent>
        </CardHeader>

      </Card>
    </div>
  );
}