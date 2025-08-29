export interface UploadedImage {
  file: File;
  dataUrl: string;
  originalSize: number;
  processedSize?: number;
  dimensions: {
    width: number;
    height: number;
  };
}

export interface GenerationRequest {
  imageDataUrl: string;
  prompt: string;
  style: StyleOption;
}

export interface GenerationResponse {
  id: string;
  imageUrl: string;
  prompt: string;
  style: StyleOption;
  createdAt: string;
}

export interface GenerationError {
  message: string;
  retryCount?: number;
}

export type StyleOption = 'Editorial' | 'Streetwear' | 'Vintage';

export interface GenerationHistory {
  id: string;
  imageUrl: string;
  prompt: string;
  style: StyleOption;
  createdAt: string;
}

export type GenerationStatus = 'idle' | 'loading' | 'success' | 'error';

export interface AppState {
  uploadedImage: UploadedImage | null;
  prompt: string;
  selectedStyle: StyleOption;
  generationStatus: GenerationStatus;
  currentGeneration: GenerationResponse | null;
  error: GenerationError | null;
  history: GenerationHistory[];
}
