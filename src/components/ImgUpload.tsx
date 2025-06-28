import { IKContext, IKUpload } from 'imagekitio-react';
import { useRef } from 'react';
import { toast } from 'react-toastify';

interface ImageKitResponse {
  filePath: string;
}

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

interface ImgUploadProps {
  setProgress: (progress: number) => void;
  setData: (data: string) => void;
  children: React.ReactNode;
  type: string;
}
const ImgUpload = ({ setProgress, setData, children, type }: ImgUploadProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const handleImageUploadError = () => {
    toast.error('Image upload failed');
  };

  const handleImageUploadSuccess = (res: ImageKitResponse) => {
    setData(res?.filePath);
    toast.success('Image uploaded successfully');
  };

  const handleImageUploadProgress = (progress: { loaded: number; total: number }) => {
    setProgress(Math.round((progress.loaded / progress.total) * 100));
  };
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
      <div className="cursor-pointer" onClick={() => ref.current && ref.current.click()}>
        {children}
      </div>
    </IKContext>
  );
};

export default ImgUpload;
