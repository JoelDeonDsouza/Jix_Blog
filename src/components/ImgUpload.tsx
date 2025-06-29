/**
 * @author: Joel Deon Dsouza
 * @description: Image upload component using ImageKit's React SDK that manages upload progress, success, and error handling while providing a customizable trigger UI for file selection.
 * @version: 1.0.1
 * @date: 2025-06-29
 */

import { IKContext, IKUpload } from 'imagekitio-react';
import { useImageUpload } from '../hooks/useImageUpload';

interface ImgUploadProps {
  setProgress: (progress: number) => void;
  setData: (data: string) => void;
  children: React.ReactNode;
  type: string;
}

const ImgUpload = ({ setProgress, setData, children, type }: ImgUploadProps) => {
  const {
    ref,
    authenticator,
    handleImageUploadError,
    handleImageUploadSuccess,
    handleImageUploadProgress,
    triggerUpload,
  } = useImageUpload({
    onSuccess: setData,
    onProgress: setProgress,
  });

  return (
    <IKContext
      publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <IKUpload
        useUniqueFileName
        onError={handleImageUploadError}
        onSuccess={handleImageUploadSuccess}
        onUploadProgress={handleImageUploadProgress}
        className="hidden"
        ref={ref}
        accept={`${type}/*`}
      />
      <div className="cursor-pointer" onClick={triggerUpload}>
        {children}
      </div>
    </IKContext>
  );
};

export default ImgUpload;
