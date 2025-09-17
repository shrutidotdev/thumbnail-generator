"use client";

import { Dropzone } from "./dropzone";

export const ThumbnailCreator = () => {
  const setSelectedImage = (files?: File[]) => {
    // handle the array of files here
  };

  return (
    // <CHANGE> Enhanced responsive layout with better spacing and alignment
    <section className="w-full flex items-center justify-center py-8 sm:py-12 lg:py-16">
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <Dropzone setFile={setSelectedImage} />
        </div>
      </div>
    </section>
  );
};
