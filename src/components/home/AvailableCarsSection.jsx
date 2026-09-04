'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/auth-client';
import CarCard from '@/components/cars/CarCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { ArrowRight, Sparkles, RefreshCw } from 'lucide-react';

export default function AvailableCarsSection() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function fetchAvailableCars() {
      try {
        const res = await api.get('/available-cars');
        if (!ignore) {
          if (Array.isArray(res.data)) {
            setCars(res.data);
          } else {
            setCars([]);
          }
        }
      } catch (err) {
        if (!ignore) {
          console.error('Error fetching available cars:', err);
          setError(
            'Unable to load available cars. Please ensure the server is running.',
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchAvailableCars();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-slate-50/50 dark:bg-slate-900/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 md:mb-12 gap-4">
          <div className="space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-100/70 dark:bg-blue-950/70">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              Featured Fleet
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              Available Cars Ready for the Road
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Browse our top-rated, certified vehicles available for immediate
              rental with transparent daily pricing and door-to-door delivery
              options.
            </p>
          </div>

          <Link
            href="/cars"
            className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200/60 dark:border-blue-800/60 transition-all shrink-0 group w-full sm:w-auto">
            <span>Explore All Vehicles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="py-12 sm:py-16">
            <LoadingSpinner text="Retrieving available vehicles from fleet database..." />
          </div>
        ) : error ? (
          <div className="text-center py-8 sm:py-12 px-4 sm:px-6 rounded-2xl sm:rounded-3xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 max-w-2xl mx-auto">
            <p className="text-rose-600 dark:text-rose-400 text-xs sm:text-sm font-semibold">
              {error}
            </p>
            <button
              onClick={fetchAvailableCars}
              className="mt-4 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold inline-flex items-center gap-2 hover:bg-rose-700 active:scale-95 transition-all">
              <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Retry</span>
            </button>
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-12 sm:py-16 px-4 sm:px-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 max-w-2xl mx-auto">
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-medium">
              No available cars found in the database currently.
            </p>
            <Link
              href="/add-car"
              className="mt-4 inline-block px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 active:scale-95 transition-all">
              Add the First Car Listing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {cars.map((car, idx) => (
              <CarCard key={car._id || idx} car={car} index={idx} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
