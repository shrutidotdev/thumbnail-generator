'use client'

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

export const ClerkUI = () => {
  return (
    <nav className="flex gap-4" aria-label="Authentication">
      <SignedOut>
        <SignInButton>
          <Button 
            aria-label="Sign in to your account"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Sign In
          </Button>
        </SignInButton>
        <SignUpButton>
          <Button 
            variant="outline"
            aria-label="Create a new account"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Sign Up
          </Button>
        </SignUpButton>
      </SignedOut>

      <SignedIn>
        <UserButton 
          appearance={{
            elements: {
              userButtonPopoverCard: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            }
          }}
        />
      </SignedIn>
    </nav>
  )
}
