import React, { useState, ImgHTMLAttributes } from 'react';
import { getAvatarUrl } from '@/lib/utils';

interface SafeImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'onError'> {
  src?: string;
  fallbackSrc?: string;
  avatarName?: string;
  avatarSize?: number;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  fallbackSrc = '/placeholder.svg',
  avatarName,
  avatarSize = 256,
  alt = '',
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Determinar qual src usar
  const getImageSrc = () => {
    if (hasError) {
      return fallbackSrc;
    }
    
    if (src) {
      return src;
    }
    
    if (avatarName) {
      return getAvatarUrl(avatarName, avatarSize);
    }
    
    return fallbackSrc;
  };

  return (
    <div className="relative">
      <img
        src={getImageSrc()}
        alt={alt}
        className={className}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
      
      {/* Loading placeholder */}
      {isLoading && (
        <div className={`absolute inset-0 bg-gray-800 animate-pulse ${className}`} />
      )}
    </div>
  );
}; 