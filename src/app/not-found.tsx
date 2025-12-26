import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ImageIcon, Home } from "lucide-react"

export const dynamic = 'force-dynamic'

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-400 via-black to-black flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <ImageIcon className="w-12 h-12 text-white" aria-hidden="true" />
            <h1 className="text-6xl sm:text-8xl font-black text-white">404</h1>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Page Not Found
          </h2>
          <p className="text-lg text-white/80 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="Go back to home page"
            >
              <Home className="w-5 h-5 mr-2" aria-hidden="true" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

