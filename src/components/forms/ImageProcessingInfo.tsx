"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  formatFileSize,
  formatDimensions,
  getCompressionRatio,
} from "@/utils/validation";
import { MAX_IMAGE_DIMENSION } from "@/lib/constants";
import type { UploadedImage } from "@/types";

interface ImageProcessingInfoProps {
  uploadedImage: UploadedImage;
}

const ImageProcessingInfo: React.FC<ImageProcessingInfoProps> = ({
  uploadedImage,
}) => {
  const compressionRatio = getCompressionRatio(
    uploadedImage.originalSize,
    uploadedImage.processedSize
  );
  const sizeDifference =
    uploadedImage.originalSize - uploadedImage.processedSize;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center justify-between">
          Image Processing Details
          <Badge variant={uploadedImage.wasProcessed ? "default" : "secondary"}>
            {uploadedImage.wasProcessed ? "Processed" : "Original"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Dimensions Comparison */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <h4 className="font-medium text-foreground mb-1">Current</h4>
            <p>
              {formatDimensions(
                uploadedImage.dimensions.width,
                uploadedImage.dimensions.height
              )}
            </p>
            <p className="text-muted-foreground">
              {formatFileSize(uploadedImage.processedSize)}
            </p>
          </div>

          {uploadedImage.wasProcessed && (
            <div>
              <h4 className="font-medium text-foreground mb-1">Original</h4>
              <p>
                {formatDimensions(
                  uploadedImage.originalDimensions.width,
                  uploadedImage.originalDimensions.height
                )}
              </p>
              <p className="text-muted-foreground">
                {formatFileSize(uploadedImage.originalSize)}
              </p>
            </div>
          )}
        </div>

        {/* Processing Stats */}
        {uploadedImage.wasProcessed && (
          <div className="space-y-2 pt-2 border-t">
            <div className="flex justify-between text-xs">
              <span>Size reduction:</span>
              <span className="text-green-600 dark:text-green-400 font-medium">
                {formatFileSize(sizeDifference)} ({compressionRatio.toFixed(1)}
                %)
              </span>
            </div>

            <div className="flex justify-between text-xs">
              <span>Max dimension limit:</span>
              <span className="text-muted-foreground">
                {MAX_IMAGE_DIMENSION}px
              </span>
            </div>

            <div className="bg-green-50 dark:bg-green-950 p-2 rounded">
              <p className="text-green-800 dark:text-green-200 text-xs">
                ✓ Image optimized for AI processing while maintaining quality
              </p>
            </div>
          </div>
        )}

        {/* No Processing Info */}
        {!uploadedImage.wasProcessed && (
          <div className="bg-blue-50 dark:bg-blue-950 p-2 rounded">
            <p className="text-blue-800 dark:text-blue-200 text-xs">
              ℹ️ Image is already within optimal dimensions (
              {MAX_IMAGE_DIMENSION}px max)
            </p>
          </div>
        )}

        {/* File Info */}
        <div className="text-xs text-muted-foreground pt-2 border-t">
          <p>Format: {uploadedImage.file.type}</p>
          <p>File name: {uploadedImage.file.name}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageProcessingInfo;
