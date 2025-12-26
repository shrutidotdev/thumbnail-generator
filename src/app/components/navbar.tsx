"use client"

import Link from "next/link"
import { ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-br from-orange-400/95 via-black/95 to-black/95 backdrop-blur-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-md"
            aria-label="POV ThumbnailGen Home"
          >
            <ImageIcon className="w-8 h-8 text-white" aria-hidden="true" />
            <span className="text-xl font-bold text-white">POV ThumbnailGen</span>
          </Link>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <SignedOut>
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  aria-label="Sign in to your account"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button
                  size="sm"
                  className="bg-white text-black hover:bg-white/90 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  aria-label="Create a new account"
                >
                  Sign Up
                </Button>
              </Link>
            </SignedOut>

            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonPopoverCard: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  }
                }}
              />
            </SignedIn>
          </div>
        </div>
      </nav>
    </header>
  )
}

