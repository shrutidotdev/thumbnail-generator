// app/page.tsx
"use server"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { auth } from "@clerk/nextjs/server"
import { Badge } from "@/components/ui/badge"
import { ensureUserExists } from "@/lib/db/user"
import { CreditCard, Sparkles } from "lucide-react"

import Image1 from "../../../../public/pov.jpg"
import Image2 from "../../../../public/thumbnail-preview-template.jpg"
import { ThumbnailCreator } from "@/app/components/thumbnail-creator"
import Divider from "@/app/components/divider"
import { StyleDecorative } from "@/app/components/style-decorative"

export default async function HomeThumbnailGenerator() {

  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const user = await ensureUserExists()
  const credits = user?.credits ?? 0

  return credits === 0 ? (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md mx-auto">

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6 pt-8 px-6 sm:px-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full shadow-lg">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
            </div>
            <Badge
              variant="secondary"
              className="mx-auto bg-red-50 text-red-700 border-red-200 px-4 py-2 text-sm font-medium"
            >
              {credits} credits remaining
            </Badge>
          </CardHeader>

          <CardContent className="text-center space-y-6 px-6 sm:px-8 pb-8">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-balance">You're out of credits!</h2>
              <p className="text-gray-600 text-base leading-relaxed max-w-sm mx-auto">
                Buy more credits to continue generating amazing thumbnails.
              </p>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
              size="lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Buy Credits
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12 lg:space-y-16">
          {/* Header Section */}
          <header className="text-center space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
                Hi there
              </h1>
              <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Want to create a thumbnail?
              </h2>

            </div>
          </header>


          {/* Main Content Area */}
          <main className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Template Images Section */}
            <section className="p-6 sm:p-8 lg:p-12 bg-gradient-to-br from-gray-50 to-white">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 max-w-5xl mx-auto">
                {/* <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                  <Image
                    src={Image1 || "/placeholder.svg"}
                    alt="Thumbnail Preview Template 1"
                    className="w-full h-auto object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div> */}
                {/* 
                <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"> */}
                <StyleDecorative
                  image={Image2.src || "/placeholder.svg"}
                />
                <StyleDecorative
                  image={Image1.src || "/placeholder.svg"}
                />
                <StyleDecorative
                  image={Image2.src || "/placeholder.svg"}
                />

                <StyleDecorative
                  image={Image1.src || "/placeholder.svg"}
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div> */}
              </div>
            </section>

            {/* Divider */}
            <Divider />

            {/* Thumbnail Creator Section */}
            <section className="p-6 sm:p-8 lg:p-12">
              <div className="text-center mb-8 sm:mb-12">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Upload Your Image</h3>
                <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                  Drop your image below and we'll help you create the perfect thumbnail
                </p>
              </div>

              <ThumbnailCreator />
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
