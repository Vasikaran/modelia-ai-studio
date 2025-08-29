'use client';

import React, { useCallback, useState } from 'react';
import { cn } from '@/lib/utils';
import { validateFile } from '@/utils/validation';
import type { UploadedImage } from '@/types';

interface ImageUploadProps {
  onImageUpload: (image: UploadedImage) => void;
  onError: (error: string) => void;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  onError,
  className,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const processFile = useCallback(async (file: File) => {
    setIsLoading(true);
    
    try {
      // Validate file
      const validation = validateFile(file);
      if (!validation.isValid) {
        onError(validation.error!);
        return;
      }

      // Create data URL
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Get image dimensions
      const dimensions = await new Promise<{ width: number; height: number }>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.onerror = reject;
        img.src = dataUrl;
      });

      const uploadedImage: UploadedImage = {
        file,
        dataUrl,
        originalSize: file.size,
        dimensions,
      };

      onImageUpload(uploadedImage);
    } catch {
      onError('Failed to process image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [onImageUpload, onError]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  return (
    <div
      className={cn(
        'relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition-colors hover:bg-gray-100',
        isDragOver && 'border-blue-500 bg-blue-50',
        isLoading && 'cursor-not-allowed opacity-50',
        className
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        onChange={handleFileInput}
        disabled={isLoading}
        className="absolute inset-0 cursor-pointer opacity-0"
        aria-label="Upload image file"
      />
      
      {isLoading ? (
        <div className="flex flex-col items-center">
          <svg
            className="h-8 w-8 animate-spin text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-600">Processing image...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <svg
            className="h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="mt-2 text-lg font-medium text-gray-900">
            Drop your image here
          </p>
          <p className="mt-1 text-sm text-gray-600">
            or click to browse files
          </p>
          <p className="mt-1 text-xs text-gray-500">
            PNG, JPG up to 10MB
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
