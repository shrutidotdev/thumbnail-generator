"use server"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import { auth } from "@clerk/nextjs/server"
import { ensureUserExists } from "@/lib/db/user"
import OutOfCredits from "@/app/components/OutOfCredits"


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

  if (credits === 0) {
    return <OutOfCredits />
  }

  return (
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
            {/* Template Images Section (compact) */}
            <section className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto">
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
                <div className="origin-top transform scale-[0.75] md:scale-[0.85]">
                  <StyleDecorative
                    image={Image2.src || "/placeholder.svg"}
                  />
                </div>
                <div className="origin-top transform scale-[0.75] md:scale-[0.85]">
                  <StyleDecorative
                    image={Image2.src || "/placeholder.svg"}
                  />
                </div>
                <div className="origin-top transform scale-[0.75] md:scale-[0.85]">
                  <StyleDecorative
                    image={Image2.src || "/placeholder.svg"}
                  />
                </div>


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
