import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-400 via-black to-black">
      <SignIn 
        forceRedirectUrl="/home"
        signUpUrl="/sign-up"
      />
    </div>
  )
}