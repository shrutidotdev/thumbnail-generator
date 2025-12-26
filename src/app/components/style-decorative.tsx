"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

export const StyleDecorative = ({
    image
}: {
    image: string;
}) => {
    const [isSelected, setIsSelected] = useState(false);
    const [mouseOver, setMouseOver] = useState(false);

    const handleClick = useCallback(() => {
        setIsSelected(!isSelected);
    }, [isSelected]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    }, [handleClick]);

    return (
        <div
            onMouseEnter={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label="Select thumbnail template"
            aria-pressed={isSelected}
            className="relative w-fit cursor-pointer transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
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
                alt={`Thumbnail template preview ${image.split('/').pop()?.split('.')[0] || ''}`}
                className="min-w-52 rounded-xl object-cover"
                priority={false}
                loading="lazy"
                width={600}
                height={600}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
            />
        </div>
    );
};