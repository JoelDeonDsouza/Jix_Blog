/**
 * @author: Joel Deon Dsouza
 * @description: A reusable ImageKit wrapper component that handles lazy loading, image optimization, and transformation for responsive and performant image rendering.
 * @version: 1.0.1
 * @date: 2025-06-29
 */

import { Image } from '@imagekit/react';
import type { ImageTagProps } from '../types';

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
