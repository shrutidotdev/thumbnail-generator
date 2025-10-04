import { ThumbnailCreator } from "../../components/thumbnail-creator"
import Divider from "../../components/divider"
import { StyleDecorative } from "../../components/style-decorative"
import { ImageIcon } from "lucide-react"
import RecentThumbnail from "@/app/components/Recent-thumbnail"
import WelcomePage from "@/app/components/welcomepage"

export default function HomeThumbnailGenerator() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-400 to-black rounded-3xl ">
      <div className="container  mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20 lg:space-y-24">
          {/* Header Section */}
          {/* <header className="text-center space-y-6 animate-fade-in-up">
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
          </header> */}

          <WelcomePage />

          {/* Main Content Area */}
          <main className="bg-black/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
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
                <StyleDecorative image="/thumbnail.png" />
                <StyleDecorative image="/thumbnail2.png" />
                <StyleDecorative image="/thumbnail4.png" />
                <StyleDecorative image="/thumbnail5.png" />
                <StyleDecorative image="/thumbnail3.png" />
                <StyleDecorative image="/thumbnail1.png" />

              </div>
            </section>

            {/* Elegant Divider */}
            <div className="px-8 sm:px-12 lg:px-16">
              <Divider />
            </div>

            {/* Thumbnail Creator Section */}
            <section className="p-8 sm:p-12 lg:p-16">
              {/* <div className="text-center mb-12 space-y-4">
                <div className="inline-flex items-center space-x-2 bg-primary/10 text-white px-4 py-2 rounded-full text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  <span>AI Processing</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white text-balance">Upload & Transform</h2>
                <p className="text-white text-lg max-w-2xl mx-auto leading-relaxed text-pretty">
                  Drop your image below and watch our AI remove the background and create the perfect thumbnail
                </p>
              </div> */}

              <ThumbnailCreator>
                <RecentThumbnail />
              </ThumbnailCreator>
            </section>
          </main>
          </div>
        </div>
      </div >
    )
}

