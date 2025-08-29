"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STYLE_OPTIONS } from "@/lib/constants";
import type { StyleOption } from "@/types";

interface StyleSelectorProps {
  value: StyleOption;
  onChange: (value: StyleOption) => void;
  disabled?: boolean;
  error?: string;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({
  value,
  onChange,
  disabled = false,
  error,
}) => {
  return (
    <div className="w-full">
      <Label htmlFor="style-select">Style</Label>
      <Select
        value={value}
        onValueChange={(value) => onChange(value as StyleOption)}
        disabled={disabled}
      >
        <SelectTrigger
          id="style-select"
          className={
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : ""
          }
        >
          <SelectValue placeholder="Select a style" />
        </SelectTrigger>
        <SelectContent>
          {STYLE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
      {!error && (
        <p className="mt-1 text-sm text-muted-foreground">
          Choose the style that best fits your vision
        </p>
      )}
    </div>
  );
};

export default StyleSelector;
