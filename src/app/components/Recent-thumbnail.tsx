"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";

type Thumbnail = {
  id: string;
  title: string;
  thumbnailUrl: string;
  createdAt: string;
  settings: Record<string, unknown>;
};

export default function RecentThumbnail() {
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchThumbnails();
  }, []);

  const fetchThumbnails = async () => {
    try {
      const response = await fetch('/api/recent');
      const data = await response.json();
      
      if (data.success) {
        setThumbnails(data.thumbnails);
      }
    } catch (error) {
      console.error('Failed to fetch thumbnails:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  };

  if (loading) {
    return (
      <section className="w-full p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-black via-orange-500/90 to-accent/20 rounded-3xl shadow-2xl border border-border/50">
        <div className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </section>
    );
  }

  if (thumbnails.length === 0) {
    return (
      <section className="w-full p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-black via-orange-500/90 to-accent/20 rounded-3xl shadow-2xl border border-border/50">
        <div className="text-center">
          <p className="text-white">No recent thumbnails yet. Create your first one!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-black via-orange-500/90 to-accent/20 rounded-3xl shadow-2xl border border-border/50 overflow-hidden">
      <div className="flex flex-col items-center justify-center space-y-4 p-4">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mb-10 text-white">
          Recent thumbnail edits...
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {thumbnails.map((thumbnail) => (
            <div key={thumbnail.id} className="flex flex-col gap-2 justify-between bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="relative w-full h-48">
                <Image
                  src={thumbnail.thumbnailUrl}
                  alt={thumbnail.title}
                  fill
                  className="rounded-md object-cover"
                />
              </div>
              
              <p className="leading-7 text-white backdrop-blur-3xl p-1 border-l-2 pl-3 italic text-sm">
                From{" "}
                {new Date(thumbnail.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>

              <Button
                onClick={() => handleDownload(thumbnail.thumbnailUrl, thumbnail.title)}
                className="w-full"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}