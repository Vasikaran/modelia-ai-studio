import { MAX_IMAGE_DIMENSION } from "@/lib/constants";

export interface ImageProcessingResult {
  dataUrl: string;
  originalSize: number;
  processedSize: number;
  dimensions: {
    width: number;
    height: number;
  };
  originalDimensions: {
    width: number;
    height: number;
  };
  wasProcessed: boolean;
}

/**
 * Process an image file by resizing it if necessary and converting to data URL
 */
export const processImage = async (
  file: File
): Promise<ImageProcessingResult> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Canvas context not available"));
      return;
    }

    img.onload = () => {
      const originalWidth = img.width;
      const originalHeight = img.height;

      // Calculate new dimensions
      const {
        width: newWidth,
        height: newHeight,
        needsResize,
      } = calculateNewDimensions(
        originalWidth,
        originalHeight,
        MAX_IMAGE_DIMENSION
      );

      // Set canvas dimensions
      canvas.width = newWidth;
      canvas.height = newHeight;

      // Draw and resize image
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      // Convert to data URL
      const processedDataUrl = canvas.toDataURL(file.type, 0.9);

      // Calculate processed size (approximate)
      const processedSize = Math.round((processedDataUrl.length * 3) / 4);

      resolve({
        dataUrl: processedDataUrl,
        originalSize: file.size,
        processedSize,
        dimensions: {
          width: newWidth,
          height: newHeight,
        },
        originalDimensions: {
          width: originalWidth,
          height: originalHeight,
        },
        wasProcessed: needsResize,
      });

      // Cleanup object URL
      URL.revokeObjectURL(img.src);
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
      URL.revokeObjectURL(img.src);
    };

    // Create object URL to load the image
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Calculate new dimensions for image resizing while maintaining aspect ratio
 */
export const calculateNewDimensions = (
  originalWidth: number,
  originalHeight: number,
  maxDimension: number
): { width: number; height: number; needsResize: boolean } => {
  // If image is already within limits, return original dimensions
  if (originalWidth <= maxDimension && originalHeight <= maxDimension) {
    return {
      width: originalWidth,
      height: originalHeight,
      needsResize: false,
    };
  }

  // Calculate aspect ratio
  const aspectRatio = originalWidth / originalHeight;

  let newWidth: number;
  let newHeight: number;

  if (originalWidth > originalHeight) {
    // Landscape orientation
    newWidth = maxDimension;
    newHeight = Math.round(maxDimension / aspectRatio);
  } else {
    // Portrait orientation
    newHeight = maxDimension;
    newWidth = Math.round(maxDimension * aspectRatio);
  }

  return {
    width: newWidth,
    height: newHeight,
    needsResize: true,
  };
};

/**
 * Get image dimensions from a file without processing
 */
export const getImageDimensions = (
  file: File
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
      URL.revokeObjectURL(img.src);
    };

    img.onerror = () => {
      reject(new Error("Failed to load image for dimension checking"));
      URL.revokeObjectURL(img.src);
    };

    img.src = URL.createObjectURL(file);
  });
};

/**
 * Convert file to data URL without processing
 */
export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
};
