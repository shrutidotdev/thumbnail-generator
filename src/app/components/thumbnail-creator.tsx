"use client"

import React, { useEffect, useRef, useState } from "react"
import { Dropzone } from "./dropzone"
import { Button } from "@/components/ui/button"
import LoadingSpinner from "./loading"
import { removeBackground } from "@imgly/background-removal"
import { Download, Sparkles, CheckCircle, Palette } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from '@clerk/nextjs';
import { Inter, Bebas_Neue, Oswald, Righteous, Francois_One } from "next/font/google"
// import { toast } from "sonner"

// Configure the fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

const oswald = Oswald({
  subsets: ['latin'],
  display: 'swap',
})

const righteous = Righteous({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

const fredokaOne = Francois_One({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

type TextPreset = {
  name: string
  fontSize: number
  fontWeight: string
  shadowColor: string
  color: string
  opacity: number
  shadowBlurFactor: number
}

const PRESETS: Record<string, TextPreset> = {
  glassWhiteBold: {
    name: "Glass White Bold",
    fontSize: 200,
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.95)",
    opacity: 0.95,
    shadowColor: "rgba(255, 255, 255, 0.9)",
    shadowBlurFactor: 1.2,
  },
  neonCyan: {
    name: "Neon Cyan",
    fontSize: 120,
    fontWeight: "bold",
    color: "#00f5ff",
    opacity: 1,
    shadowColor: "rgba(0, 245, 255, 0.9)",
    shadowBlurFactor: 0.35,
  },
  sunsetGlow: {
    name: "Sunset Glow",
    fontSize: 110,
    fontWeight: "bold",
    opacity: 1,
    color: "#ff4500",
    shadowColor: "rgba(255, 69, 0, 0.8)",
    shadowBlurFactor: 0.25,
  },
  cyberPink: {
    name: "Cyber Pink",
    fontSize: 100,
    fontWeight: "600",
    opacity: 1,
    color: "#ff1493",
    shadowColor: "rgba(255, 20, 147, 0.9)",
    shadowBlurFactor: 0.3,
  },
  elegantWhite: {
    name: "Elegant White",
    fontSize: 140,
    fontWeight: "300",
    color: "#f8f9fa",
    opacity: 1,
    shadowColor: "rgba(248, 249, 250, 0.8)",
    shadowBlurFactor: 0.2,
  },
  deepShadow: {
    name: "Deep Shadow",
    fontSize: 160,
    fontWeight: "bold",
    color: "#1a1a1a",
    opacity: 1,
    shadowColor: "rgba(255, 255, 255, 0.95)",
    shadowBlurFactor: 0.15,
  },
  pureWhite: {
    name: "Pure White",
    fontSize: 100,
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 1)",
    opacity: 1,
    shadowColor: "rgba(255, 255, 255, 0.6)",
    shadowBlurFactor: 0.1,
  },
  solidBlack: {
    name: "Solid Black",
    fontSize: 100,
    fontWeight: "bold",
    color: "rgba(0, 0, 0, 1)",
    opacity: 1,
    shadowColor: "rgba(255, 255, 255, 0.3)",
    shadowBlurFactor: 0.05,
  },
  softWhite: {
    name: "Soft White",
    fontSize: 100,
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.9)",
    opacity: 0.9,
    shadowColor: "rgba(255, 255, 255, 0.5)",
    shadowBlurFactor: 0.12,
  },
  oceanBreeze: {
    name: "Ocean Breeze",
    fontSize: 140,
    fontWeight: "bold",
    color: "#00b4d8",
    opacity: 1,
    shadowColor: "rgba(0, 180, 216, 0.9)",
    shadowBlurFactor: 0.25,
  },
  goldenHour: {
    name: "Golden Hour",
    fontSize: 130,
    fontWeight: "600",
    color: "#f77f00",
    opacity: 1,
    shadowColor: "rgba(247, 127, 0, 0.8)",
    shadowBlurFactor: 0.22,
  },
  lavenderDream: {
    name: "Lavender Dream",
    fontSize: 120,
    fontWeight: "500",
    color: "#9d4edd",
    opacity: 1,
    shadowColor: "rgba(157, 78, 221, 0.7)",
    shadowBlurFactor: 0.2,
  },
  emeraldGlow: {
    name: "Emerald Glow",
    fontSize: 135,
    fontWeight: "bold",
    color: "#2d6a4f",
    opacity: 1,
    shadowColor: "rgba(45, 106, 79, 0.8)",
    shadowBlurFactor: 0.18,
  },
  cosmicPurple: {
    name: "Cosmic Purple",
    fontSize: 150,
    fontWeight: "bold",
    color: "#7209b7",
    opacity: 1,
    shadowColor: "rgba(114, 9, 183, 0.9)",
    shadowBlurFactor: 0.3,
  },
  sunflowerYellow: {
    name: "Sunflower Yellow",
    fontSize: 125,
    fontWeight: "600",
    color: "#ffbe0b",
    opacity: 1,
    shadowColor: "rgba(255, 190, 11, 0.8)",
    shadowBlurFactor: 0.2,
  },
  crimsonFire: {
    name: "Crimson Fire",
    fontSize: 140,
    fontWeight: "bold",
    color: "#dc2626",
    opacity: 1,
    shadowColor: "rgba(220, 38, 38, 0.9)",
    shadowBlurFactor: 0.25,
  },
  mintFresh: {
    name: "Mint Fresh",
    fontSize: 115,
    fontWeight: "500",
    opacity: 1,
    color: "#06ffa5",
    shadowColor: "rgba(6, 255, 165, 0.7)",
    shadowBlurFactor: 0.15,
  },
  royalBlue: {
    name: "Royal Blue",
    fontSize: 160,
    fontWeight: "bold",
    opacity: 1,
    color: "#1e40af",
    shadowColor: "rgba(30, 64, 175, 0.8)",
    shadowBlurFactor: 0.28,
  },
  peachSunset: {
    name: "Peach Sunset",
    fontSize: 130,
    fontWeight: "600",
    color: "#fb8500",
    opacity: 1,
    shadowColor: "rgba(251, 133, 0, 0.8)",
    shadowBlurFactor: 0.22,
  },
  electricBlue: {
    name: "Electric Blue",
    fontSize: 145,
    fontWeight: "bold",
    color: "#0077b6",
    opacity: 1,
    shadowColor: "rgba(0, 119, 182, 0.9)",
    shadowBlurFactor: 0.3,
  },
  roseGold: {
    name: "Rose Gold",
    fontSize: 135,
    fontWeight: "500",
    color: "#e85d75",
    opacity: 1,
    shadowColor: "rgba(232, 93, 117, 0.7)",
    shadowBlurFactor: 0.2,
  },
  forestGreen: {
    name: "Forest Green",
    fontSize: 140,
    fontWeight: "bold",
    color: "#2d5016",
    opacity: 1,
    shadowColor: "rgba(45, 80, 22, 0.8)",
    shadowBlurFactor: 0.25,
  },
  amethyst: {
    name: "Amethyst",
    fontSize: 125,
    fontWeight: "600",
    color: "#8e44ad",
    opacity: 1,
    shadowColor: "rgba(142, 68, 173, 0.8)",
    shadowBlurFactor: 0.2,
  },
  turquoise: {
    name: "Turquoise",
    fontSize: 130,
    fontWeight: "500",
    color: "#17a2b8",
    opacity: 1,
    shadowColor: "rgba(23, 162, 184, 0.7)",
    shadowBlurFactor: 0.18,
  },
}

export const ThumbnailCreator = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [processedImageSrc, setProcessedImageSrc] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [canvasReady, setCanvasReady] = useState(false)
  const [processingStep, setProcessingStep] = useState<string>("")
  const [presetKey, setPresetKey] = useState<keyof typeof PRESETS>("sunsetGlow")
  const [text, setText] = useState("POV")
  const [thumbnailId, setThumbnailId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { userId } = useAuth();

  //  font options with Google Fonts
  const FONT_OPTIONS = [
    {
      key: 'arial',
      label: 'Arial',
      stack: 'Arial, Helvetica, sans-serif'
    },
    {
      key: 'impact',
      label: 'Impact',
      stack: 'Impact, Haettenschweiler, "Arial Black", sans-serif'
    },
    {
      key: 'inter',
      label: 'Inter',
      stack: `${inter.style.fontFamily}, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
    },
    {
      key: 'bebas',
      label: 'Bebas Neue',
      stack: `${bebasNeue.style.fontFamily}, Impact, "Arial Black", sans-serif`
    },
    {
      key: 'oswald',
      label: 'Oswald',
      stack: `${oswald.style.fontFamily}, Impact, "Arial Black", sans-serif`
    },
    {
      key: 'righteous',
      label: 'Righteous',
      stack: `${righteous.style.fontFamily}, Impact, "Arial Black", sans-serif`
    },
    {
      key: 'fredoka',
      label: 'Fredoka One',
      stack: `${fredokaOne.style.fontFamily}, Impact, "Arial Black", sans-serif`
    },
    {
      key: 'mono',
      label: 'Monospace',
      stack: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
    },
  ] as const

  const [fontKey, setFontKey] = useState<typeof FONT_OPTIONS[number]['key']>('arial')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Update setSelectedImage function
  const setSelectedImage = async (file?: File) => {
    if (file && userId) {
      setLoading(true);
      setError(null);
      setProcessedImageSrc(null);
      setProcessingStep("Uploading image...");

      try {
        // 1. Upload to blob via API
        const formData = new FormData();
        formData.append('file', file);

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          const error = await uploadResponse.json();
          throw new Error(error.error || 'Upload failed');
        }

        const uploadData = await uploadResponse.json();
        setThumbnailId(uploadData.thumbnailId);
        setImageSrc(uploadData.originalImageUrl);

        // 2. Process image (background removal)
        setProcessingStep("Removing background...");
        const blob = await removeBackground(uploadData.originalImageUrl);
        const processedImageUrl = URL.createObjectURL(blob);
        setProcessedImageSrc(processedImageUrl);
        setCanvasReady(true);
        setProcessingStep("Complete!");

      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
          console.error(err)
        } else {
          setError("Unknown error occurred")
          console.error("Unknown error:", err)
        }
      }
    }
  };

  // Add function to save thumbnail
  const saveThumbnail = async () => {
    if (!canvasRef.current || !thumbnailId) return;

    setSaving(true);
    setError(null);

    try {
      // Get canvas data as base64
      const dataUrl = canvasRef.current.toDataURL('image/png');

      // Save to database and blob
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          thumbnailId: thumbnailId,
          dataUrl: dataUrl,
          settings: {
            text: text,
            preset: presetKey,
            font: fontKey,
          },
          originalFilename: imageSrc?.split('/').pop() || 'thumbnail',
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Save failed');
      }

      const data = await response.json();
      console.log('Thumbnail saved:', data.thumbnail);

      // Show success message or redirect
      alert('Thumbnail saved successfully!');

    } catch (err: any) {
      setError(err.message || 'Failed to save thumbnail');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const drawCompositeImage = () => {
    if (!canvasRef.current || !imageSrc) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = "high"
    ctx.setTransform(1, 0, 0, 1, 0, 0)

    const activePreset = PRESETS[presetKey]
    const bg = new Image()

    // Enable CORS
    bg.crossOrigin = "anonymous"

    bg.onload = () => {
      canvas.width = bg.width
      canvas.height = bg.height
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)
      ctx.save()

      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const baseSize = activePreset.fontSize || 100
      const fontWeight = activePreset.fontWeight || "bold"
      const fontFamily = FONT_OPTIONS.find(f => f.key === fontKey)?.stack || 'Arial, Helvetica, sans-serif'

      ctx.font = `${fontWeight} ${baseSize}px ${fontFamily}`
      const measured = ctx.measureText(text).width
      const targetWidth = canvas.width * 0.9
      const scaled = Math.max(24, Math.floor((baseSize * targetWidth) / Math.max(1, measured)))
      ctx.font = `${fontWeight} ${scaled}px ${fontFamily}`

      ctx.fillStyle = activePreset.color
      ctx.globalAlpha = activePreset.opacity || 1

      const x = canvas.width / 2
      const y = canvas.height / 2

      ctx.translate(x, y)
      ctx.shadowColor = activePreset.shadowColor
      ctx.shadowBlur = Math.floor(scaled * (activePreset.shadowBlurFactor || 0.1))
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      ctx.fillText(text, 0, 0)
      ctx.restore()

      if (processedImageSrc) {
        const fg = new Image()

        // CORS
        fg.crossOrigin = "anonymous"
        fg.onload = () => {
          ctx.drawImage(fg, 0, 0, canvas.width, canvas.height)
        }
        fg.src = processedImageSrc
      }
    }
    bg.src = imageSrc
  }

  useEffect(() => {
    if (imageSrc) setCanvasReady(true)
  }, [imageSrc])

  useEffect(() => {
    if (canvasReady) drawCompositeImage()
  }, [canvasReady, imageSrc, processedImageSrc, text, presetKey, fontKey, drawCompositeImage])

  function downloadImg() {
    if (canvasRef.current) {
      // Save to database first
      saveThumbnail();

      // Then download
      const link = document.createElement("a");
      link.download = "thumbnail.png";
      link.href = canvasRef.current?.toDataURL() ?? "";
      link.click();
    }
  }
  return (
    <section className="w-full flex flex-col items-center justify-center space-y-12 ">
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
                <h3 className="text-lg font-semibold text-black">Processing Image</h3>
                <p className="text-sm text-black">{processingStep || "Please wait..."}</p>
              </div>
              <LoadingSpinner />
            </div>
          </div>
        </div>
      )}

      {imageSrc && !loading && (
        <div className="w-full max-w-4xl space-y-8 animate-fade-in-up">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h3 className="text-2xl font-bold text-white">Preview Ready</h3>
            </div>
            <p className="text-muted">Your thumbnail has been processed and is ready for download</p>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300" />
            <div className="relative rounded-2xl p-6 shadow-xl">
              <canvas ref={canvasRef} className="w-full rounded-xl shadow-lg bg-white" />
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => downloadImg()}
              size="lg"
              className={cn(
                "px-8 py-3 text-base font-bold",
                "bg-white text-black cursor-pointer",
                "shadow-lg hover:shadow-xl hover:text-white hover:bg-gradient-to-br from-orange-400 via-black to-accent",
                "transition-all duration-300 ",
                "group relative overflow-hidden",
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Download className="w-5 h-5 mr-2 relative z-10" />
              <span className="relative z-10">Download Thumbnail</span>
            </Button>
          </div>

          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
                <Palette className="w-4 h-4" />
                <span>Text Styles</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Choose Your Style</h3>
              <p className="text-md text-white tracking-wide">Select a preset to customize your thumbnail text</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
              {Object.entries(PRESETS).map(([key, preset]) => (
                <Button
                  key={key}
                  onClick={() => setPresetKey(key as keyof typeof PRESETS)}
                  className={cn(
                    "group relative overflow-hidden rounded-xl p-4 transition-all duration-300",
                    "border-2 hover:scale-105 hover:shadow-lg",
                    presetKey === key
                      ? "border-primary shadow-md"
                      : "border-border/50 bg-card hover:border-primary/50 hover:bg-primary/5",
                  )}
                >
                  <div className=" flex flex-col items-center space-y-3">
                    <div className="relative">
                      <div
                        className="w-20 h-3 rounded-full shadow-lg "
                        style={{
                          backgroundColor: preset.color || '#ffffff',
                          boxShadow: preset.shadowColor ? `0 0 20px ${preset.shadowColor}` : 'none',
                          opacity: preset.opacity || 1,
                        }}
                      />
                      {presetKey === key && (
                        <div className="absolute -inset-1 rounded-full border-2 border-primary animate-pulse" />
                      )}
                    </div>
                  </div>

                  {presetKey === key && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </Button>
              ))}
            </div>



            {/* Input area */}
            <div className="max-w-md mx-auto">
              {/* text to write  */}
              <label htmlFor="thumbnail-text" className="block text-sm font-medium mb-2 text-white">
                What would you like to write...
              </label>
              <Input
                id="thumbnail-text"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text..."
                className="w-full px-4 py-3 rounded-xl border border-border/50 bg-card text-black font-bold placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
              />

              {/* Font selector */}
              <div className="mt-4">
                <label className="block text-sm font-medium  mb-2 text-white">Font</label>
                <Select value={fontKey} onValueChange={(v) => setFontKey(v as typeof fontKey)}>
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Choose font" />
                  </SelectTrigger>
                  <SelectContent>
                    {FONT_OPTIONS.map((f) => (
                      <SelectItem key={f.key} value={f.key}>{f.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>


        </div>
      )}

      {!imageSrc && (
        <div className="w-full max-w-2xl mx-auto animate-fade-in-up">
          <Dropzone setFile={(files) => setSelectedImage(files?.[0])} />
        </div>
      )}

      {error && (
        <div className="max-w-md mx-auto p-4 bg-destructive/10 border border-destructive/20 rounded-xl animate-fade-in-up">
          <p className="text-sm text-destructive text-center" role="alert">
            {error}
          </p>
        </div>
      )}

      <div>{children}</div>
    </section>
  )
}