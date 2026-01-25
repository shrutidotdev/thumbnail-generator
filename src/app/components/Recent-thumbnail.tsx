"use client"

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Thumbnail = {
  id: string;
  title: string;
  thumbnailUrl: string;
  createdAt: string;
  settings: Record<string, unknown>;
};

const RecentThumbnail = () => {
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchThumbnails = useCallback(async () => {
    try {
      const response = await fetch('/api/recent');
      if (!response.ok) {
        throw new Error('Failed to fetch thumbnails');
      }
      const data = await response.json();
      
      if (data.success) {
        setThumbnails(data.thumbnails);
      }
    } catch (error) {
      console.error('Failed to fetch thumbnails:', error);
      toast.error('Failed to load recent thumbnails');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchThumbnails();
  }, [fetchThumbnails]);

  const handleDownload = useCallback((url: string, filename: string) => {
    try {
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      toast.success('Download started');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download thumbnail');
    }
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  }, []);

  if (loading) {
    return (
      <section 
        className="w-full p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-black via-orange-500/90 to-accent/20 rounded-3xl shadow-2xl border border-border/50"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin" aria-label="Loading thumbnails" />
        </div>
      </section>
    );
  }

  if (thumbnails.length === 0) {
    return (
      <section 
        className="w-full p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-black via-orange-500/90 to-accent/20 rounded-3xl shadow-2xl border border-border/50"
        aria-label="Recent thumbnails section"
      >
        <div className="text-center">
          <p className="text-white">No recent thumbnails yet. Create your first one!</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="w-full p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-black via-orange-500/90 to-accent/20 rounded-3xl shadow-2xl border border-border/50 overflow-hidden"
      aria-label="Recent thumbnails section"
    >
      <div className="flex flex-col items-center justify-center space-y-4 p-4">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mb-10 text-white">
          Recent thumbnail edits...
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {thumbnails.map((thumbnail) => (
            <article 
              key={thumbnail.id} 
              className="flex flex-col gap-2 justify-between bg-white/10 backdrop-blur-sm p-4 rounded-lg"
            >
              <div className="relative w-full h-48">
                <Image
                  src={thumbnail.thumbnailUrl}
                  alt={`Thumbnail: ${thumbnail.title}`}
                  fill
                  className="rounded-md object-cover"
                />
              </div>
              
              <p className="leading-7 text-white backdrop-blur-3xl p-1 border-l-2 pl-3 italic text-sm">
                From{" "}
                <time dateTime={thumbnail.createdAt}>
                  {new Date(thumbnail.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </time>
              </p>

              <Button
                onClick={() => handleDownload(thumbnail.thumbnailUrl, thumbnail.title)}
                onKeyDown={(e) => handleKeyDown(e, () => handleDownload(thumbnail.thumbnailUrl, thumbnail.title))}
                aria-label={`Download ${thumbnail.title}`}
                tabIndex={0}
                className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                Download
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentThumbnail;