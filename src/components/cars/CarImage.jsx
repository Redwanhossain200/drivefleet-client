'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const DEFAULT_FALLBACK =
  'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80';

export default function CarImage({
  src,
  alt = 'Car Image',
  fill = false,
  width,
  height,
  sizes,
  priority = false,
  className = '',
  fallbackSrc = DEFAULT_FALLBACK,
}) {
  const [hasError, setHasError] = useState(false);
  const [prevSrc, setPrevSrc] = useState(src);

  if (src !== prevSrc) {
    setPrevSrc(src);
    setHasError(false);
  }

  let cleanSrc = typeof src === 'string' ? src.trim() : '';
  if (
    cleanSrc &&
    !cleanSrc.startsWith('http://') &&
    !cleanSrc.startsWith('https://') &&
    !cleanSrc.startsWith('/') &&
    !cleanSrc.startsWith('data:') &&
    !cleanSrc.startsWith('blob:')
  ) {
    if (cleanSrc.startsWith('//')) {
      cleanSrc = `https:${cleanSrc}`;
    } else if (cleanSrc.includes('.')) {
      cleanSrc = `https://${cleanSrc}`;
    }
  }

  const isValidUrl =
    cleanSrc !== '' &&
    (cleanSrc.startsWith('http://') ||
      cleanSrc.startsWith('https://') ||
      cleanSrc.startsWith('/') ||
      cleanSrc.startsWith('data:') ||
      cleanSrc.startsWith('blob:'));

  const finalSrc = !isValidUrl || hasError ? fallbackSrc : cleanSrc;

  return (
    <Image
      src={finalSrc}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      sizes={sizes}
      priority={priority}
      unoptimized
      onError={() => {
        if (!hasError) {
          setHasError(true);
        }
      }}
      className={className}
    />
  );
}
