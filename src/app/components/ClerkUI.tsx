'use client'

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

export function ClerkUI() {
  return (
    <div className="flex gap-4">
      <SignedOut>
        <SignInButton>
          <Button>Sign In</Button>
        </SignInButton>
        <SignUpButton>
          <Button variant="outline">Sign Up</Button>
        </SignUpButton>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}
