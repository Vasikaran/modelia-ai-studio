'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatFileSize } from '@/utils/validation';
import type { UploadedImage, StyleOption } from '@/types';

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
    <div className={`space-y-4 ${className || ''}`}>
      <h3 className="text-lg font-medium text-gray-900">Live Preview</h3>
      
      {/* Image Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Image</CardTitle>
        </CardHeader>
        <CardContent>
          {uploadedImage ? (
            <div className="space-y-2">
              <div className="relative aspect-video overflow-hidden rounded-md bg-gray-100">
                <Image
                  src={uploadedImage.dataUrl}
                  alt="Uploaded preview"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="text-xs text-gray-500">
                <p>
                  {uploadedImage.dimensions.width} × {uploadedImage.dimensions.height} pixels
                </p>
                <p>Size: {formatFileSize(uploadedImage.originalSize)}</p>
                <p>Format: {uploadedImage.file.type}</p>
              </div>
            </div>
          ) : (
            <div className="flex h-32 items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50">
              <p className="text-sm text-gray-500">No image uploaded</p>
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
            <p className="text-sm text-gray-900">{prompt}</p>
          ) : (
            <p className="text-sm text-gray-500 italic">No prompt entered</p>
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
          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Status:</span>
              <span className={uploadedImage && prompt ? 'text-green-600' : 'text-amber-600'}>
                {uploadedImage && prompt ? 'Ready to generate' : 'Missing requirements'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Image:</span>
              <span>{uploadedImage ? '✓' : '✗'}</span>
            </div>
            <div className="flex justify-between">
              <span>Prompt:</span>
              <span>{prompt ? '✓' : '✗'}</span>
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
