'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const gradients = [
  'from-blue-600 to-indigo-600',
  'from-emerald-600 to-teal-600',
  'from-violet-600 to-purple-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
  'from-cyan-600 to-blue-600',
];

function getGradient(seed = '') {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
}

export default function UserAvatar({ user, size = 'md', className = '' }) {
  const [hasError, setHasError] = useState(false);
  const rawSrc = user?.image || user?.photoURL || '';
  const [prevSrc, setPrevSrc] = useState(rawSrc);

  if (rawSrc !== prevSrc) {
    setPrevSrc(rawSrc);
    setHasError(false);
  }

  const name = user?.name || user?.email || 'User';
  const initial = (name.trim().charAt(0) || 'U').toUpperCase();
  const gradient = getGradient(name);

  const sizeMap = {
    sm: { dimension: 32, class: 'w-8 h-8 text-xs' },
    md: { dimension: 40, class: 'w-10 h-10 text-sm' },
    lg: { dimension: 56, class: 'w-14 h-14 text-xl' },
  };

  const selectedSize = sizeMap[size] || sizeMap.md;

  const isValidUrl =
    typeof rawSrc === 'string' &&
    (rawSrc.startsWith('http://') ||
      rawSrc.startsWith('https://') ||
      rawSrc.startsWith('/') ||
      rawSrc.startsWith('data:'));

  if (!isValidUrl || hasError) {
    return (
      <div
        className={`${selectedSize.class} rounded-full bg-linear-to-tr ${gradient} text-white font-black flex items-center justify-center shadow-inner border border-white/20 select-none shrink-0 ${className}`}
        title={name}
        aria-label={name}>
        <span>{initial}</span>
      </div>
    );
  }

  return (
    <Image
      src={rawSrc}
      alt={name}
      width={selectedSize.dimension}
      height={selectedSize.dimension}
      unoptimized
      onError={() => setHasError(true)}
      className={`${selectedSize.class} rounded-full object-cover border border-blue-500/30 select-none shrink-0 ${className}`}
    />
  );
}
