import { Button } from "@/components/ui/button"
import { ImageIcon, Sparkles, Zap, ArrowRight, Check } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-400 via-black to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 scroll-smooth">
        <div className="max-w-7xl mx-auto">
          {/* Header with Auth Buttons */}
          <header className="flex justify-between items-center py-6 mb-8">
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-8 h-8 text-white" />
              <span className="text-xl font-bold text-white">POV ThumbnailGen</span>
            </div>
            {/* <div className="flex items-center space-x-3">
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm" className="bg-white text-black hover:bg-white/90 transition-all duration-300">
                  Sign Up
                </Button>
              </Link>
            </div> */}
          </header>

          {/* Hero Section */}
          <section id="hero" className="text-center space-y-8 py-20 animate-fade-in-up">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-orange-500/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold border border-orange-400/30">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Thumbnail Generator</span>
              </div>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight text-balance leading-[0.9] text-white">
                Create Perfect
                <br />
                <span className="bg-gradient-to-r from-orange-400 to-orange-200 bg-clip-text text-transparent">
                  POV Thumbnails
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto text-pretty leading-relaxed font-medium">
                Transform your images into professional POV-style thumbnails with AI-powered background removal and
                stunning templates
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-black hover:bg-white/90 text-lg px-10 py-6 font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-2xl"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/signin">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 text-lg px-10 py-6 font-bold rounded-xl bg-transparent transition-all duration-300 hover:scale-105"
                >
                  Sign In to Continue
                </Button>
              </Link>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-20">
            <div className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-400/20 overflow-hidden">
              <div className="p-12 sm:p-16 lg:p-20">
                <div className="text-center mb-16">
                  <div className="inline-flex items-center space-x-2 bg-orange-500/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 border border-orange-400/30">
                    <ImageIcon className="w-4 h-4" />
                    <span>Powerful Features</span>
                  </div>
                  <h2 className="text-5xl sm:text-6xl font-black text-white mb-6 text-balance">
                    Professional POV Thumbnails
                  </h2>
                  <p className="text-white/80 text-xl max-w-3xl mx-auto text-pretty leading-relaxed">
                    Everything you need to create stunning POV-style thumbnails that drive engagement
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  <div className="text-center space-y-6 p-8 rounded-2xl border border-orange-400/20 bg-black/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-500 hover:border-orange-400/40">
                    <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto">
                      <Zap className="w-8 h-8 text-orange-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">AI Background Removal</h3>
                    <p className="text-white/70 text-lg leading-relaxed">
                      Automatically remove backgrounds with precision using advanced AI technology
                    </p>
                  </div>

                  <div className="text-center space-y-6 p-8 rounded-2xl border border-orange-400/20 bg-black/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-500 delay-100 hover:border-orange-400/40">
                    <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto">
                      <ImageIcon className="w-8 h-8 text-orange-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">POV Style Templates</h3>
                    <p className="text-white/70 text-lg leading-relaxed">
                      Choose from professionally designed POV-style thumbnail templates
                    </p>
                  </div>

                  <div className="text-center space-y-6 p-8 rounded-2xl border border-orange-400/20 bg-black/backdrop-blur-sm transform hover:scale-105 transition-all duration-500 delay-200 hover:border-orange-400/40">
                    <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto">
                      <Sparkles className="w-8 h-8 text-orange-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Instant Results</h3>
                    <p className="text-white/70 text-lg leading-relaxed">
                      Generate professional thumbnails in seconds, ready for your content
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section id="benefits" className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-5xl sm:text-6xl font-black text-white mb-6 text-balance">
                Why Choose Our Generator?
              </h2>
              <p className="text-white/80 text-xl max-w-3xl mx-auto text-pretty leading-relaxed">
                Join thousands of creators who trust our AI-powered platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                "Lightning-fast AI processing",
                "Professional-grade results",
                "No design experience needed",
                "Unlimited downloads",
                "Commercial usage rights",
                "24/7 customer support",
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-6 rounded-xl bg-black backdrop-blur-sm border border-orange-400"
                >
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-white font-bold" />
                  </div>
                  <span className="text-white text-lg font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom CTA Section */}
          <section id="cta" className="py-20 text-center">
            <div className="bg-gradient-to-r from-orange-500 to-orange-400/20 backdrop-blur-xl rounded-3xl p-12 sm:p-16 border border-orange-400/30">
              <div className="space-y-8">
                <div className="inline-flex items-center space-x-2 bg-orange-500/30 text-white px-6 py-3 rounded-full text-sm font-semibold">
                  <Zap className="w-4 h-4" />
                  <span>Ready to Start?</span>
                </div>
                <h2 className="text-5xl sm:text-6xl font-black text-white text-balance">
                  Start Creating Amazing
                  <br />
                  Thumbnails Today
                </h2>
                <p className="text-white/90 text-xl max-w-2xl mx-auto leading-relaxed text-pretty">
                  Join thousands of creators who use our AI-powered tool to make professional POV-style thumbnails that
                  get clicks
                </p>
                <div className="pt-6">
                  <Link href="/signup">
                    <Button
                      size="lg"
                      className="bg-white text-black hover:bg-white/90 text-xl px-12 py-6 font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-2xl"
                    >
                      Start Creating Now
                      <ArrowRight className="w-6 h-6 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 text-center">
            <div className="flex items-center justify-center space-x-2 text-white/60">
              <ImageIcon className="w-5 h-5" />
              <span className="text-sm">© 2025 POV ThumbnailGen. All rights reserved.</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
