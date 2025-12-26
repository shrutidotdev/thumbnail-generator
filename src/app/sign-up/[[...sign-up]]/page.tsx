import { SignUp } from '@clerk/nextjs'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <SignUp 
        forceRedirectUrl="/home"
        signInUrl="/sign-in"
      />
    </div>
  )
}