import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Button } from '@/components/ui/button'

import { AuthWelcome } from './utils/auth-welcome'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Thumbnail Generator | AI Thumbnail Generator',
  description: 'Generate thumbnails for your videos with AI',
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <header className='flex justify-end items-center p-4 '>
            
            <AuthWelcome />
            <div className="flex items-center  justify-center ">
              <SignedOut>
                <SignInButton>
                  <Button  className="text-white hover:bg-white/10 hover:text-white transition-all duration-300">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button  className="text-white hover:bg-white/10 hover:text-white transition-all duration-300">
                    Sign Up
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>

          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}