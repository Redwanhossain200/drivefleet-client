'use client';

import React from 'react';
import Link from 'next/link';
import CarImage from '@/components/cars/CarImage';
import { motion } from 'framer-motion';
import {
  Users,
  MapPin,
  Fuel,
  Gauge,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function CarCard({ car, index = 0 }) {
  if (!car) return null;

  const isAvailable = car.availabilityStatus === 'Available';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative flex flex-col justify-between h-full bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 card-glow">
      <div className="relative w-full h-52 overflow-hidden bg-slate-100 dark:bg-slate-900">
        <CarImage
          src={car.image}
          alt={car.carName || 'Car'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        <div className="absolute top-3 inset-x-3 flex items-start justify-between gap-2 pointer-events-none">
          <div className="flex items-center gap-1.5 flex-wrap min-w-0">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-900/85 text-white backdrop-blur-md border border-white/20 shadow-sm shrink-0">
              {car.carType || 'Sedan'}
            </span>

            {car.booking_count > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-600/90 text-white backdrop-blur-md flex items-center gap-1 shadow-sm shrink-0">
                <TrendingUp className="w-3 h-3" />
                <span>{car.booking_count} Booked</span>
              </span>
            )}
          </div>

          <span
            className={`shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-sm backdrop-blur-md whitespace-nowrap ${
              isAvailable
                ? 'bg-emerald-500/90 text-white border border-emerald-400/30'
                : 'bg-rose-500/90 text-white border border-rose-400/30'
            }`}>
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isAvailable ? 'bg-white animate-pulse' : 'bg-white'
              }`}
            />
            <span>{car.availabilityStatus || 'Available'}</span>
          </span>
        </div>

        <div className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-white/10 text-white shadow-lg">
          <span className="text-lg font-black tracking-tight text-blue-400">
            {formatCurrency(car.dailyRentPrice || 0)}
          </span>
          <span className="text-xs text-slate-300 font-medium"> / day</span>
        </div>
      </div>

      <div className="p-5 flex flex-col grow justify-between space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
            {car.carName}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="truncate">
              {car.pickupLocation || 'Central City Hub'}
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 line-clamp-2 leading-relaxed">
            {car.description ||
              'High quality, sanitized vehicle offering smooth performance, great fuel efficiency, and utmost comfort.'}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <Users className="w-3.5 h-3.5 text-blue-500" />
            <span className="font-semibold">{car.seatCapacity || 5} Seats</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <Gauge className="w-3.5 h-3.5 text-indigo-500" />
            <span className="font-semibold">{car.transmission || 'Auto'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <Fuel className="w-3.5 h-3.5 text-emerald-500" />
            <span className="font-semibold">{car.fuelType || 'Petrol'}</span>
          </div>
        </div>

        <div className="pt-1">
          <Link
            href={`/cars/${car._id}`}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] shadow-md shadow-blue-500/20 transition-all duration-200">
            <span>View Details</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
