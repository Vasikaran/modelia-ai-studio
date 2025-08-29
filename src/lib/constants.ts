import type { StyleOption } from "@/types";

export const STYLE_OPTIONS: Array<{ value: StyleOption; label: string }> = [
  { value: "Editorial", label: "Editorial" },
  { value: "Streetwear", label: "Streetwear" },
  { value: "Vintage", label: "Vintage" },
];

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_IMAGE_DIMENSION = 1920;
export const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
export const MAX_HISTORY_ITEMS = 5;
export const MAX_RETRY_ATTEMPTS = 3;

export const API_ENDPOINTS = {
  generate: "/api/generate",
} as const;
