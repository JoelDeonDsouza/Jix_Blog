/**
 * @author: Joel Deon Dsouza
 * @description: Custom React hook to manage image uploads with ImageKit.
 * Provides upload authentication, progress tracking, success/error handlers,
 * and exposes a ref to trigger the file input programmatically.
 * Integrates toast notifications for upload status feedback.
 * @version: 1.0.1
 * @date: 2025-06-29
 */

import { useRef } from 'react';
import { toast } from 'react-toastify';
import type { ImageKitResponse, UploadProgress } from '../types';

// IMAGEKIT authenticator function to get the upload authentication details //
const authenticator = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}blogs/upload-auth`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }
    const data = await response.json();
    const { signature, expire, token, publicKey } = data;
    return { signature, expire, token, publicKey };
  } catch (error) {
    console.error('Authentication error:', error);
    throw new Error('Authentication request failed');
  }
};

interface UseImageUploadProps {
  onSuccess?: (filePath: string) => void;
  onProgress?: (progress: number) => void;
  onError?: (error: Error) => void;
}

export const useImageUpload = ({ onSuccess, onProgress, onError }: UseImageUploadProps = {}) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleImageUploadError = (error: Error) => {
    toast.error('Image upload failed');
    onError?.(error);
  };

  const handleImageUploadSuccess = (res: ImageKitResponse) => {
    toast.success('Image uploaded successfully');
    onSuccess?.(res.filePath);
  };

  const handleImageUploadProgress = (progress: UploadProgress) => {
    const progressPercentage = Math.round((progress.loaded / progress.total) * 100);
    onProgress?.(progressPercentage);
  };

  const triggerUpload = () => {
    ref.current?.click();
  };

  return {
    ref,
    authenticator,
    handleImageUploadError,
    handleImageUploadSuccess,
    handleImageUploadProgress,
    triggerUpload,
  };
};
