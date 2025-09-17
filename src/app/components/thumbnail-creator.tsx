"use client";

import { CornerDownLeft } from "lucide-react";
import { Dropzone } from "./dropzone";

export const ThumbnailCreator = () => {
  const setSelectedImage = (file?: File) => {
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">File Upload Demo</h1>
          <p className="text-gray-600">Click or drag files to test the dropzone component</p>
        </div>
       <Dropzone setFile={setSelectedImage} />

      </div>
    </main>
  );
};