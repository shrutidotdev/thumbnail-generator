// "use server"

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function RecentThumbnail() {
    return (
        <section className="w-full p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-black via-orange-500/90 to-accent/20 rounded-3xl shadow-2xl border border-border/50 overflow-hidden">
            <div className="flex flex-col items-center justify-center space-y-4 p-4 ">
                <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mb-10">
                    Recent thumbnail edits...
                </h1>


                <div className="h-fit max-w-full overflow-x-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  mx-auto">
                    <div className="flex flex-col gap-2 justify-evenly place-items-start ">
                        <Image src="/thumbnail-preview-template.jpg" alt="Recent Thumbnail" width={500} height={300} className="rounded-md" />
                        <p className="leading-7 text-muted backdrop-blur-3xl p-1 [&:not(:first-child)]:mt-6 mt-6 border-l-2 pl-3 italic">
                            From{" "}
                            {new Date().toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}
                        </p>

                        <Button className="">Download</Button>
                    </div>
                  
                     <div className="flex flex-col gap-2 justify-evenly place-items-start ">
                         <Image src="/creative-thumbnail-layout.jpg" alt="Recent Thumbnail" width={500} height={300} className="rounded-md" />
                        <p className="leading-7 text-muted backdrop-blur-3xl p-1 [&:not(:first-child)]:mt-6 mt-6 border-l-2 pl-3 italic">
                            From{" "}
                            {new Date().toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}
                        </p>

                        <Button className="">Download</Button>
                    </div>
                   <div className="flex flex-col gap-2 justify-evenly place-items-start ">
                        <Image src="/thumbnail-preview-template.jpg" alt="Recent Thumbnail" width={500} height={300} className="rounded-md" />
                        <p className="leading-7 text-muted backdrop-blur-3xl p-1 [&:not(:first-child)]:mt-6 mt-6 border-l-2 pl-3 italic">
                            From{" "}
                            {new Date().toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}
                        </p>

                        <Button className="">Download</Button>
                    </div>

                </div>
            </div>
        </section>
    )
}
