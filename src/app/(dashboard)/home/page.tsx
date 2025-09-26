"use client"

import { ThumbnailCreator } from "../../components/thumbnail-creator"
import Divider from "../../components/divider"
import { StyleDecorative } from "../../components/style-decorative"
import { Sparkles, Zap, ImageIcon } from "lucide-react"
import RecentThumbnail from "@/app/components/Recent-thumbnail"

export default function HomeThumbnailGenerator() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-400 via-black to-accent rounded-3xl">
      <div className="container bg-gradient-to-tl from-orange-400 via-black to-accent/5 mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20 lg:space-y-24">
          {/* Header Section */}
          <header className="text-center space-y-6 animate-fade-in-up">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-white px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered</span>
              </div>
              <h1 className="scroll-m-20 text-center text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-tight text-white">
                Create Perfect
                <br />
                <span className="text-white">Thumbnails</span>
              </h1>
              <p className="text-xl sm:text-2xl text-muted max-w-2xl mx-auto text-pretty leading-relaxed">
                Transform your images into professional thumbnails with AI-powered background removal
              </p>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="bg-black backdrop-blur-sm rounded-3xl shadow-2xl border border-border/50 overflow-hidden">
            {/* Template Gallery Section */}
            <section className="p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-accent/30 via-background to-accent/20">
              <div className="text-center mb-12">
                <div className="inline-flex items-center space-x-2 bg-card/80 backdrop-blur-sm text-foreground px-4 py-2 rounded-full text-sm font-medium mb-4 border border-border/50">
                  <ImageIcon className="w-4 h-4" />
                  <span>Template Gallery</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
                  Professional Templates
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                  Get inspired by our collection of professionally designed thumbnail templates
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="transform hover:scale-105 transition-all duration-500">
                  <StyleDecorative image="/creative-thumbnail-layout.jpg" />                </div>
                <div className="transform hover:scale-105 transition-all duration-500 delay-100">
                  <StyleDecorative image="/thumbnail-preview-template.jpg" />
                </div>
                <div className="transform hover:scale-105 transition-all duration-500 delay-200">
                  <StyleDecorative image="/creative-thumbnail-layout.jpg" />
                </div>
              </div>
            </section>

            {/* Elegant Divider */}
            <div className="px-8 sm:px-12 lg:px-16">
              <Divider />
            </div>

            {/* Thumbnail Creator Section */}
            <section className="p-8 sm:p-12 lg:p-16">
              <div className="text-center mb-12 space-y-4">
                <div className="inline-flex items-center space-x-2 bg-primary/10 text-white px-4 py-2 rounded-full text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  <span>AI Processing</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white text-balance">Upload & Transform</h2>
                <p className="text-white text-lg max-w-2xl mx-auto leading-relaxed text-pretty">
                  Drop your image below and watch our AI remove the background and create the perfect thumbnail
                </p>
              </div>

              <ThumbnailCreator>
                <RecentThumbnail />
              </ThumbnailCreator>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
