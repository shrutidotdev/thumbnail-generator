"use client";

import Image from "next/image";
import { useState } from "react";

export const StyleDecorative = ({
    image
}: {
    image: string;
}) => {
    const [isSelected, setIsSelected] = useState(false);
    const [mouseOver, setMouseOver] = useState(false);

    const handleClick = () => {
        setIsSelected(!isSelected);
    };

    return (
        <div
            onMouseEnter={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
            onClick={handleClick}
            className="relative w-fit cursor-pointer transition-all hover:scale-105"
        >
            {(mouseOver || isSelected) && (
                <>
                    <div className="absolute -right-6 -top-4 h-4 w-4 -rotate-45 border-t border-black"></div>
                    <div className="absolute -right-3 -top-6 h-4 w-4 rotate-[-75deg] border-t border-black"></div>
                    <div className="absolute -right-7 -top-0 h-4 w-4 rotate-[-20deg] border-t border-black"></div>
                    <div className="absolute -bottom-6 -left-4 h-4 w-4 -rotate-45 border-t border-black"></div>
                    <div className="absolute -bottom-3 -left-6 h-4 w-4 rotate-[-20deg] border-t border-black"></div>
                    <div className="absolute -bottom-7 -left-0 h-4 w-4 rotate-[-75deg] border-t border-yellow-500"></div>
                </>
            )}
            <Image
                src={image || "/placeholder.svg"}
                alt="Thumbnail Preview Template 2"
                className="min-w-52 rounded-xl"
                priority
                width={600}
                height={600}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
            />
        </div>
    );
};