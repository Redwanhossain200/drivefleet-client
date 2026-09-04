'use client';

import React from 'react';
import Link from 'next/link';
import { Car, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-slate-50/60 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-lg w-full text-center space-y-6 p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
        <div className="relative inline-flex items-center justify-center">
          <span className="text-8xl sm:text-9xl font-black tracking-tighter text-blue-500/15 dark:text-blue-500/10 select-none">
            404
          </span>
          <div className="absolute flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-600 text-white shadow-xl shadow-blue-500/30 animate-bounce">
            <Car className="w-10 h-10" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Lost on the Highway?
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
            The page you are navigating towards does not exist or may have been
            relocated. Let&apos;s get you back on track!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2">
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/cars"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-sm border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
            <Search className="w-4 h-4" />
            <span>Explore Cars</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
