'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

const PromptInput: React.FC<PromptInputProps> = ({
  value,
  onChange,
  placeholder = 'Describe your vision...',
  disabled = false,
  error,
}) => {
  const textareaId = `prompt-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      <Label htmlFor={textareaId}>Prompt</Label>
      <Textarea
        id={textareaId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={4}
        className={error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error ? `${textareaId}-error` : `${textareaId}-description`
        }
      />
      {error && (
        <p
          id={`${textareaId}-error`}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
      {!error && (
        <p
          id={`${textareaId}-description`}
          className="mt-1 text-sm text-gray-500"
        >
          Describe what you want to create or modify in the image
        </p>
      )}
    </div>
  );
};

export default PromptInput;
