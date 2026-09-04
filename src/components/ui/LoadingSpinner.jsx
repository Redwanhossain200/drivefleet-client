'use client';

import React from 'react';
import { Car } from 'lucide-react';

export default function LoadingSpinner({
  text = 'Loading DriveFleet...',
  fullScreen = false,
}) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-blue-500/20 border-t-blue-600 animate-spin" />

        <div className="absolute flex items-center justify-center">
          <Car className="w-6 h-6 text-blue-600 dark:text-blue-400 animate-bounce" />
        </div>
      </div>
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400 animate-pulse tracking-wide">
        {text}
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center w-full">
        {content}
      </div>
    );
  }

  return content;
}
