"use client";

import { useEffect, useRef, useState } from "react";
import { Dropzone } from "./dropzone";
import { StyleDecorative } from "@/app/components/style-decorative";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "./loading";

export const ThumbnailCreator = () => {
  const [selectedStyle, setSelectedStyle] = useState<"style1" | "style2" | "style3">("style1");
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const setSelectedImage = (files?: File[]) => {
    console.log("that is the file", files)
    const file = files?.[0];
    if (!file) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setImageSrc(src);
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!canvasRef.current || !imageSrc) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      // Simple style overlay demo
      ctx.fillStyle = selectedStyle === "style1" ? "rgba(0,0,0,0.2)" : selectedStyle === "style2" ? "rgba(255,255,255,0.2)" : "rgba(255,0,0,0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    img.src = imageSrc;
  }, [imageSrc, selectedStyle]);

  return (
    <section className="w-full flex flex-col items-center justify-center py-8 sm:py-12 lg:py-16 gap-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* <StyleDecorative image="/style1.png" selected={selectedStyle === "style1"} onSelect={() => setSelectedStyle("style1")} disabled={loading} />
        <StyleDecorative image="/style2.png" selected={selectedStyle === "style2"} onSelect={() => setSelectedStyle("style2")} disabled={loading} />
        <StyleDecorative image="/style3.png" selected={selectedStyle === "style3"} onSelect={() => setSelectedStyle("style3")} disabled={loading} /> */}
      </div>

      <div className="w-full max-w-2xl">
        <canvas ref={canvasRef} className="w-full rounded-xl border" />
      </div>

      {imageSrc && (
        <Button className="cursor-pointer" onClick={() => {
          const link = document.createElement('a');
          link.download = 'thumbnail.png';
          link.href = canvasRef.current?.toDataURL() ?? '';
          link.click();
        }}>Download Thumbnail</Button>
      )}


      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <Dropzone setFile={setSelectedImage} />
        </div>
      </div>

      {loading && (
        <LoadingSpinner />
      )}


    </section>
  );
};
