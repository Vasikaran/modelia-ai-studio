"use client";

import React, { useState } from "react";
import {
  ImageUpload,
  PromptInput,
  StyleSelector,
  LivePreview,
  ImageProcessingInfo,
} from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { UploadedImage, StyleOption } from "@/types";

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(
    null
  );
  const [prompt, setPrompt] = useState<string>("");
  const [selectedStyle, setSelectedStyle] = useState<StyleOption>("Editorial");
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (image: UploadedImage) => {
    setUploadedImage(image);
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleGenerate = () => {
    if (!uploadedImage) {
      setError("Please upload an image first");
      return;
    }
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setError(null);
    // TODO: Implement generation logic in Phase 4
    console.log("Generate with:", { uploadedImage, prompt, selectedStyle });
  };

  const isReadyToGenerate = uploadedImage && prompt.trim();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          AI-Powered Fashion Studio
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Upload your fashion images and transform them with AI-generated styles
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUpload
              onImageUpload={handleImageUpload}
              onError={handleError}
            />
          </CardContent>
        </Card>

        {/* Settings Section */}
        <Card>
          <CardHeader>
            <CardTitle>Style & Prompt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              placeholder="Describe your vision..."
            />
            <StyleSelector value={selectedStyle} onChange={setSelectedStyle} />
            <Button
              onClick={handleGenerate}
              disabled={!isReadyToGenerate}
              className="w-full"
              size="lg"
            >
              Generate
            </Button>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card>
          <CardContent className="p-6">
            <LivePreview
              uploadedImage={uploadedImage}
              prompt={prompt}
              selectedStyle={selectedStyle}
            />
          </CardContent>
        </Card>
      </div>

      {/* Image Processing Details - Only show when image is uploaded */}
      {uploadedImage && <ImageProcessingInfo uploadedImage={uploadedImage} />}

      {/* History Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Generations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            Your last 5 generations will appear here
          </p>
          {/* TODO: History component will go here in Phase 5 */}
          <div className="flex h-32 items-center justify-center rounded-md border-2 border-dashed border-border bg-muted">
            <p className="text-sm text-muted-foreground">No generations yet</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
