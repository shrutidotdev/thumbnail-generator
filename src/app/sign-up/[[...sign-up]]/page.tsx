import { SignUp } from '@clerk/nextjs'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-400 via-black to-black">
      <SignUp 
        forceRedirectUrl="/home"
        signInUrl="/sign-in"
      />
    </div>
  )
}