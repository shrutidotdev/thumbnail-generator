"use client"

import { useEffect, useRef, useState } from "react"
import { Dropzone } from "./dropzone"
import { Button } from "@/components/ui/button"
import LoadingSpinner from "./loading"
import { removeBackground } from "@imgly/background-removal"
import { Download, Sparkles, ImageIcon, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export const ThumbnailCreator = () => {
  const [loading, setLoading] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [processedImageSrc, setProcessedImageSrc] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [canvasReady, setCanvasReady] = useState(false)
  const [processingStep, setProcessingStep] = useState<string>("")
  const [text, setText] = useState("POV:")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const setSelectedImage = async (file?: File) => {
    if (file) {
      setLoading(true)
      setError(null)
      setProcessedImageSrc(null)
      setProcessingStep("Uploading image...")

      const reader = new FileReader()
      reader.onload = async (e) => {
        const src = e.target?.result as string
        setImageSrc(src)

        try {
          setProcessingStep("Removing background...")
          const blob = await removeBackground(src)
          const processedImageUrl = URL.createObjectURL(blob)
          setProcessedImageSrc(processedImageUrl)
          setCanvasReady(true)
          setProcessingStep("Complete!")
        } catch (err) {
          setError("Failed to process image. Please try another image.")
        } finally {
          setLoading(false)
          setProcessingStep("")
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const drawCompositeImage = () => {
    if (!canvasRef.current || !imageSrc) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    const bg = new Image();
    bg.onload = () => {
      canvas.width = bg.width;
      canvas.height = bg.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
      ctx.save();

      // Calculate font size to fill ~90% width
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const baseSize = 100;
      const fontFamily = "Arial";
      ctx.font = `bold ${baseSize}px ${fontFamily}`;
      const measured = ctx.measureText(text).width;
      const targetWidth = canvas.width * 0.9;
      const scaled = Math.max(24, Math.floor((baseSize * targetWidth) / Math.max(1, measured)));
      ctx.font = `bold ${scaled}px ${fontFamily}`;

      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.globalAlpha = 1;

      const x = canvas.width / 2;
      const y = canvas.height / 2;

      ctx.translate(x, y);
      // Light stroke for contrast
      ctx.lineWidth = Math.max(2, Math.floor(scaled * 0.04));
      ctx.strokeStyle = "rgb(255, 255, 255)";
      ctx.strokeText(text, 0, 0);
      ctx.fillText(text, 0, 0);
      ctx.restore()

      // Draw subject on top so text appears behind it
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
    if (imageSrc) setCanvasReady(true)
  }, [imageSrc])

  useEffect(() => {
    if (canvasReady) drawCompositeImage()
  }, [canvasReady, imageSrc, processedImageSrc, text])

  return (
    <section className="w-full flex flex-col items-center justify-center space-y-12">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-up">
          <div className="bg-card border border-border/50 p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                </div>
                <div className="absolute -inset-2 bg-primary/20 rounded-full animate-ping" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-foreground">Processing Image</h3>
                <p className="text-sm text-muted-foreground">{processingStep || "Please wait..."}</p>
              </div>
              <LoadingSpinner />
            </div>
          </div>
        </div>
      )}

      {/* Preview Section */}
      {imageSrc && !loading && (
        <div className="w-full max-w-4xl space-y-8 animate-fade-in-up">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h3 className="text-2xl font-bold text-foreground">Preview Ready</h3>
            </div>
            <p className="text-muted-foreground">Your thumbnail has been processed and is ready for download</p>
          </div>

          {/* Main Canvas Preview */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300" />
            <div className="relative bg-card border border-border/50 rounded-2xl p-6 shadow-xl">
              <canvas ref={canvasRef} className="w-full rounded-xl shadow-lg bg-white" />
            </div>
          </div>

          {/* Before/After Comparison */}
          {processedImageSrc && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-muted/50 to-accent/30 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300" />
                <div className="relative bg-card border border-border/50 rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <ImageIcon className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm font-medium text-muted-foreground">Original</p>
                  </div>
                  <img src={imageSrc || "/placeholder.svg"} alt="Original" className="w-full rounded-lg shadow-sm" />
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/30 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300" />
                <div className="relative bg-card border border-border/50 rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <p className="text-sm font-medium text-foreground">Processed</p>
                  </div>
                  <img
                    src={processedImageSrc || "/placeholder.svg"}
                    alt="Processed cutout"
                    className="w-full rounded-lg shadow-sm bg-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Download Button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              className={cn(
                "px-8 py-3 text-base font-semibold",
                "bg-primary hover:bg-primary/90",
                "shadow-lg hover:shadow-xl",
                "transition-all duration-300",
                "group relative overflow-hidden",
              )}
              onClick={() => {
                const link = document.createElement("a")
                link.download = "thumbnail.png"
                link.href = canvasRef.current?.toDataURL() ?? ""
                link.click()
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Download className="w-5 h-5 mr-2 relative z-10" />
              <span className="relative z-10">Download Thumbnail</span>
            </Button>
          </div>
        </div>
      )}

      {/* Upload Section */}
      {!imageSrc && (
        <div className="w-full max-w-2xl mx-auto animate-fade-in-up">
          <Dropzone setFile={(files) => setSelectedImage(files?.[0])} />
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="max-w-md mx-auto p-4 bg-destructive/10 border border-destructive/20 rounded-xl animate-fade-in-up">
          <p className="text-sm text-destructive text-center" role="alert">
            {error}
          </p>
        </div>
      )}
    </section>
  )
}
