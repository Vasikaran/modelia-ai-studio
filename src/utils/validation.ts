import {
  ACCEPTED_FILE_TYPES,
  MAX_FILE_SIZE,
  MAX_IMAGE_DIMENSION,
} from "@/lib/constants";

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface FileValidationOptions {
  checkDimensions?: boolean;
  maxDimension?: number;
  minDimension?: number;
}

export const validateFile = (
  file: File,
  options: FileValidationOptions = {}
): ValidationResult => {
  // Check file type
  if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: "Please upload a PNG or JPG image.",
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `File size must be less than ${formatFileSize(MAX_FILE_SIZE)}.`,
    };
  }

  // Check for empty file
  if (file.size === 0) {
    return {
      isValid: false,
      error: "File appears to be empty.",
    };
  }

  // Future use for options
  if (options.checkDimensions) {
    // This will be used when we validate dimensions after processing
  }

  return { isValid: true };
};

export const validateImageDimensions = (
  width: number,
  height: number,
  options: FileValidationOptions = {}
): ValidationResult => {
  const maxDim = options.maxDimension || MAX_IMAGE_DIMENSION;
  const minDim = options.minDimension || 1;

  if (width < minDim || height < minDim) {
    return {
      isValid: false,
      error: `Image dimensions must be at least ${minDim}x${minDim} pixels.`,
    };
  }

  if (width > maxDim * 2 || height > maxDim * 2) {
    return {
      isValid: false,
      error: `Image dimensions are too large. Maximum supported: ${
        maxDim * 2
      }x${maxDim * 2} pixels.`,
    };
  }

  return { isValid: true };
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const formatDimensions = (width: number, height: number): string => {
  return `${width} × ${height} pixels`;
};

export const getCompressionRatio = (
  originalSize: number,
  processedSize: number
): number => {
  if (originalSize === 0) return 0;
  return ((originalSize - processedSize) / originalSize) * 100;
};
