import { Image } from '@imagekit/react';

interface ImageTagProps {
  src: string;
  className?: string;
  alt?: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
}

const ImageTag = ({ src, className, alt, width, height }: ImageTagProps) => {
  return (
    <Image
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      liqip={{ active: true, quality: 20 }}
      width={width}
      height={height}
      transformation={[
        {
          width: width,
          height: height,
        },
      ]}
    />
  );
};

export default ImageTag;
