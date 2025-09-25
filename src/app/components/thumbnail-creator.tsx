"use client";

import { useEffect, useRef, useState } from "react";
import { Dropzone } from "./dropzone";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "./loading";
import { removeBackground } from '@imgly/background-removal';


export const ThumbnailCreator = () => {
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [processedImageSrc, setProcessedImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [canvasReady, setCanvasReady] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const setSelectedImage = async (file?: File) => {
    // if (!file) return;
    // setLoading(true);
    // setError(null);
    // setProcessedImageSrc(null);
    // const reader = new FileReader();
    // reader.onload = async (e) => {
    //   const src = e.target?.result as string;
    //   setImageSrc(src);
    //   try {
    //     const blob = await removeBackground(src);
    //     const processedUrl = URL.createObjectURL(blob);
    //     setProcessedImageSrc(processedUrl);
    //   } catch (err) {
    //     setError('Failed to remove background. Please try another image.');
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // reader.readAsDataURL(file);
    if (file) {
      setLoading(true)
      const reader = new FileReader();
      reader.onload = async (e) => {
        const src = e.target?.result as string;
        setImageSrc(src)

        const blob = await removeBackground(src)
        const processedImageUrl = URL.createObjectURL(blob)
        setProcessedImageSrc(processedImageUrl)
        setCanvasReady(true)
        setLoading(false)
      };
      reader.readAsDataURL(file)
    }
  };



  // call whenever imageSrc or processedImageSrc change
  const drawCompositeImage = () => {
    if (!canvasRef.current || !imageSrc) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const bg = new Image();
    bg.onload = () => {
      canvas.width = bg.width;
      canvas.height = bg.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

      if (processedImageSrc) {
        const fg = new Image();
        fg.onload = () => {
          ctx.drawImage(fg, 0, 0, canvas.width, canvas.height);
        };
        fg.src = processedImageSrc;
      }
    };
    bg.src = imageSrc;
  };

  useEffect(() => {
    if (imageSrc) setCanvasReady(true);
  }, [imageSrc]);

  useEffect(() => {
    if (canvasReady) drawCompositeImage();
  }, [canvasReady, imageSrc, processedImageSrc]);


  return (
    <section className="w-full flex flex-col items-center justify-center py-8 sm:py-12 lg:py-16 gap-10">

      {loading ? (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <LoadingSpinner />
            <p className="mt-4 text-center text-sm text-gray-600">Processing image...</p>
          </div>
        </div>
      ) : (imageSrc && (
        <div className="w-full max-w-2xl space-y-4">
          <h3 className="text-xl font-semibold text-center">Preview</h3>
          <canvas ref={canvasRef} className="w-full rounded-xl border shadow-lg" />
          {processedImageSrc && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border bg-white p-3 shadow-sm">
                <p className="mb-2 text-sm font-medium text-gray-700">Original</p>
                <img src={imageSrc} alt="Original" className="w-full rounded-lg" />
              </div>
              <div className="rounded-xl border bg-white p-3 shadow-sm">
                <p className="mb-2 text-sm font-medium text-gray-700">After </p>
                <img src={processedImageSrc} alt="Processed cutout" className="w-full rounded-lg bg-transparent" />
              </div>
            </div>
          )}
        </div>
      ))}



      {/* Download Button */}
      {imageSrc && (
        <Button
          className="cursor-pointer"
          onClick={() => {
            const link = document.createElement('a');
            link.download = 'thumbnail.png';
            link.href = canvasRef.current?.toDataURL() ?? '';
            link.click();
          }}
        >
          Download Thumbnail
        </Button>
      )}

      {/* File Upload */}
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <Dropzone setFile={(files) => setSelectedImage(files?.[0])} />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="text-sm text-red-600" role="alert">{error}</div>
      )}



    </section>
  );
};