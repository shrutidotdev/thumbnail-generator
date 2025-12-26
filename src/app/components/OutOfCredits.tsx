"use server"

import { ensureUserExists } from "@/lib/db/user"
import { auth } from "@clerk/nextjs/server"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const OutOfCredits = async () => {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }
  
    const user = await ensureUserExists();
    const credits = user?.credits ?? 0;

    if (credits > 0) {
        return null;
    }

    return (
        <div 
            className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8"
            role="alert"
            aria-live="polite"
        >
          <div className="w-full max-w-md mx-auto">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6 pt-8 px-6 sm:px-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full shadow-lg">
                    <CreditCard className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="mx-auto bg-red-50 text-red-700 border-red-200 px-4 py-2 text-sm font-medium"
                  aria-label={`${credits} credits remaining`}
                >
                  {credits} credits remaining
                </Badge>
              </CardHeader>
    
              <CardContent className="text-center space-y-6 px-6 sm:px-8 pb-8">
                <div className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-balance">
                    You&apos;re out of credits!
                  </h2>
                  <p className="text-gray-600 text-base leading-relaxed max-w-sm mx-auto">
                    Buy more credits to continue generating amazing thumbnails.
                  </p>
                </div>
    
                <Button
                  className="w-full bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  size="lg"
                  aria-label="Buy more credits"
                  tabIndex={0}
                >
                  <Sparkles className="w-5 h-5 mr-2" aria-hidden="true" />
                  Buy Credits
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
    );
};

export default OutOfCredits;
