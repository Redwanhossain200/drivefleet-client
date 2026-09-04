'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const sliderCars = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 6,
    image:
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1920&q=80',
  },
];

const FALLBACK_HERO_IMAGE = sliderCars[0].image;

export default function HeroBanner() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % sliderCars.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? sliderCars.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % sliderCars.length);
  };

  const handleQuickSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set('search', searchTerm.trim());
    if (selectedType !== 'All') params.set('carType', selectedType);
    router.push(`/cars?${params.toString()}`);
  };

  const currentCar = sliderCars[currentIdx];

  return (
    <section
      className="relative h-auto min-h-137.5 md:min-h-162.5 lg:min-h-180 xl:min-h-screen w-full overflow-hidden bg-slate-950 text-white flex flex-col justify-between py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="absolute inset-0 w-full h-full z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCar.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full">
            <Image
              src={currentCar.image}
              alt="Car Banner"
              fill
              priority
              unoptimized
              onError={(event) => {
                if (event.currentTarget.src !== FALLBACK_HERO_IMAGE) {
                  event.currentTarget.src = FALLBACK_HERO_IMAGE;
                }
              }}
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/75 to-slate-950/50" />
            <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-[2px]" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full my-auto space-y-6 pt-4">
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-blue-300 bg-blue-950/80 border border-blue-800 backdrop-blur-md shadow-sm">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400" />
            <span>Next-Generation Car Rental Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.2] sm:leading-[1.15] drop-shadow-lg">
            Find, Book & Drive{' '}
            <span className="bg-linear-to-r from-blue-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
              Your Perfect Car
            </span>{' '}
            in Minutes
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs sm:text-sm md:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow">
            Explore our premium fleet of SUVs, luxury sedans, and electric
            vehicles with transparent pricing, instant booking, and zero hidden
            costs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
            <Link
              href="/cars"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-xl shadow-blue-600/40 transition-all duration-200 flex items-center justify-center gap-2 group text-sm sm:text-base">
              <span>Explore Cars</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/add-car"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold border border-white/20 bg-slate-900/60 backdrop-blur-md text-white hover:bg-slate-900/90 transition-all duration-200 text-center text-sm sm:text-base">
              List Your Car
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-3 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl max-w-4xl mx-auto relative z-20">
          <form
            onSubmit={handleQuickSearch}
            className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by car name (e.g. Tesla, BMW)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                <option value="All">All Vehicle Types</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Luxury">Luxury</option>
                <option value="Electric">Electric</option>
                <option value="Hatchback">Hatchback</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full py-2.5 sm:py-3 px-6 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-md shadow-blue-500/30 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm">
                <Search className="w-4 h-4" />
                <span>Search Fleet</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 space-y-4">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95">
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {sliderCars.map((car, idx) => (
              <button
                key={car.id}
                onClick={() => setCurrentIdx(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIdx === idx
                    ? 'w-8 sm:w-10 bg-blue-500 shadow-md shadow-blue-500/50'
                    : 'w-2 sm:w-2.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95">
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto border-t border-white/10 pt-4 text-center">
          <div className="space-y-0.5">
            <p className="text-lg sm:text-xl md:text-2xl font-black text-white">
              500+
            </p>
            <p className="text-[10px] sm:text-xs text-slate-400 font-medium">
              Verified Vehicles
            </p>
          </div>
          <div className="space-y-0.5">
            <p className="text-lg sm:text-xl md:text-2xl font-black text-white">
              25k+
            </p>
            <p className="text-[10px] sm:text-xs text-slate-400 font-medium">
              Happy Drivers
            </p>
          </div>
          <div className="space-y-0.5">
            <p className="text-lg sm:text-xl md:text-2xl font-black text-white">
              99.8%
            </p>
            <p className="text-[10px] sm:text-xs text-slate-400 font-medium">
              On-Time Handover
            </p>
          </div>
          <div className="space-y-0.5">
            <p className="text-lg sm:text-xl md:text-2xl font-black text-white">
              4.9 / 5
            </p>
            <p className="text-[10px] sm:text-xs text-slate-400 font-medium">
              Customer Rating
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
