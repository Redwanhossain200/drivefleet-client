'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import api from '@/lib/auth-client';
import CarCard from '@/components/cars/CarCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Car,
  RotateCcw,
} from 'lucide-react';

function ExploreCarsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get('search') || '';
  const initialType = searchParams.get('carType') || 'All';
  const initialSort = searchParams.get('sort') || 'newest';

  const [search, setSearch] = useState(initialSearch);
  const [appliedSearch, setAppliedSearch] = useState(initialSearch);
  const [carType, setCarType] = useState(initialType);
  const [sort, setSort] = useState(initialSort);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'SUV', 'Sedan', 'Luxury', 'Electric', 'Hatchback'];

  useEffect(() => {
    let ignore = false;
    async function fetchCars() {
      try {
        const params = new URLSearchParams();
        if (appliedSearch.trim()) params.set('search', appliedSearch.trim());
        if (carType !== 'All') params.set('carType', carType);
        if (sort) params.set('sort', sort);

        const res = await api.get(`/cars?${params.toString()}`);
        if (!ignore) {
          if (Array.isArray(res.data)) {
            setCars(res.data);
          } else {
            setCars([]);
          }
        }
      } catch (error) {
        if (!ignore) {
          console.error('Error fetching cars:', error);
          setCars([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchCars();

    return () => {
      ignore = true;
    };
  }, [carType, sort, appliedSearch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setAppliedSearch(search);
  };

  const handleResetFilters = () => {
    setSearch('');
    setAppliedSearch('');
    setCarType('All');
    setSort('newest');
    setLoading(true);
    router.push('/cars');
  };

  return (
    <div className="py-12 lg:py-16 bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-100/70 dark:bg-blue-950/70">
            <Car className="w-3.5 h-3.5" />
            Complete Collection
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Explore All Fleet Vehicles
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Search and filter across verified SUV, Sedan, EV, and Luxury models.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <form
              onSubmit={handleSearchSubmit}
              className="md:col-span-6 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by car name (e.g. Tesla, BMW, Range Rover)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-24 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm">
                Search
              </button>
            </form>

            <div className="md:col-span-4 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-400 hidden sm:block" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="newest">Sort by: Newest Listed</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Booked / Popular</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <button
                type="button"
                onClick={handleResetFilters}
                className="w-full py-3 px-4 rounded-2xl font-semibold text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-2 shrink-0">
              <Filter className="w-3.5 h-3.5" /> Type:
            </span>
            {categories.map((cat) => {
              const isSelected = carType === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCarType(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                      : 'bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}>
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <span>
            Showing{' '}
            <strong className="text-slate-900 dark:text-white">
              {cars.length}
            </strong>{' '}
            vehicles in fleet
          </span>
        </div>

        {loading ? (
          <div className="py-20">
            <LoadingSpinner text="Searching DriveFleet database..." />
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-20 px-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
              <Car className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              No matching cars found
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              We couldn&apos;t find any vehicles matching your current search
              criteria. Try modifying your keywords or resetting filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              <span>Clear All Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cars.map((car, idx) => (
              <CarCard key={car._id || idx} car={car} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExploreCarsPage() {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen />}>
      <ExploreCarsContent />
    </Suspense>
  );
}
