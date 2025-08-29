"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatFileSize,
  formatDimensions,
  getCompressionRatio,
} from "@/utils/validation";
import type { UploadedImage, StyleOption } from "@/types";

interface LivePreviewProps {
  uploadedImage: UploadedImage | null;
  prompt: string;
  selectedStyle: StyleOption;
  className?: string;
}

const LivePreview: React.FC<LivePreviewProps> = ({
  uploadedImage,
  prompt,
  selectedStyle,
  className,
}) => {
  return (
    <div className={`space-y-4 ${className || ""}`}>
      <h3 className="text-lg font-medium text-foreground">Live Preview</h3>

      {/* Image Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Image</CardTitle>
        </CardHeader>
        <CardContent>
          {uploadedImage ? (
            <div className="space-y-3">
              <div className="relative aspect-video overflow-hidden rounded-md bg-gray-100">
                <Image
                  src={uploadedImage.dataUrl}
                  alt="Uploaded preview"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Image Details */}
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="font-medium">Current:</span>
                    <p>
                      {formatDimensions(
                        uploadedImage.dimensions.width,
                        uploadedImage.dimensions.height
                      )}
                    </p>
                    <p>{formatFileSize(uploadedImage.processedSize)}</p>
                  </div>

                  {uploadedImage.wasProcessed && (
                    <div>
                      <span className="font-medium">Original:</span>
                      <p>
                        {formatDimensions(
                          uploadedImage.originalDimensions.width,
                          uploadedImage.originalDimensions.height
                        )}
                      </p>
                      <p>{formatFileSize(uploadedImage.originalSize)}</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-1">
                  <span>Format: {uploadedImage.file.type}</span>
                  {uploadedImage.wasProcessed && (
                    <span className="text-green-600 text-xs">
                      ↓{" "}
                      {getCompressionRatio(
                        uploadedImage.originalSize,
                        uploadedImage.processedSize
                      ).toFixed(1)}
                      % smaller
                    </span>
                  )}
                </div>

                {uploadedImage.wasProcessed && (
                  <div className="bg-blue-50 dark:bg-blue-950 p-2 rounded text-xs">
                    <p className="text-blue-800 dark:text-blue-200">
                      ✓ Image was automatically resized for optimal processing
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex h-32 items-center justify-center rounded-md border-2 border-dashed border-border bg-muted">
              <p className="text-sm text-muted-foreground">No image uploaded</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Prompt Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Prompt</CardTitle>
        </CardHeader>
        <CardContent>
          {prompt ? (
            <p className="text-sm text-foreground">{prompt}</p>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No prompt entered
            </p>
          )}
        </CardContent>
      </Card>

      {/* Style Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Style</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              {selectedStyle}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Generation Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Status:</span>
              <span
                className={
                  uploadedImage && prompt
                    ? "text-green-600 dark:text-green-400"
                    : "text-amber-600 dark:text-amber-400"
                }
              >
                {uploadedImage && prompt
                  ? "Ready to generate"
                  : "Missing requirements"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Image:</span>
              <span>{uploadedImage ? "✓" : "✗"}</span>
            </div>
            <div className="flex justify-between">
              <span>Prompt:</span>
              <span>{prompt ? "✓" : "✗"}</span>
            </div>
            <div className="flex justify-between">
              <span>Style:</span>
              <span>✓</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LivePreview;
