'use client';

import React, { useEffect, useState } from 'react';
import CarImage from '@/components/cars/CarImage';

import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/auth-client';
import { useAuth } from '@/context/AuthContext';
import BookingModal from '@/components/cars/BookingModal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { formatCurrency } from '@/lib/utils';
import {
  Car,
  MapPin,
  Users,
  Gauge,
  Fuel,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Share2,
  TrendingUp,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function CarDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    let ignore = false;

    async function fetchCarDetails() {
      try {
        const res = await api.get(`/cars/${id}`);
        if (!ignore) {
          if (res.data) {
            setCar(res.data);
          } else {
            setError('Vehicle not found.');
          }
        }
      } catch (err) {
        if (!ignore) {
          console.error('Error fetching car:', err);
          setError('Failed to load vehicle details.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchCarDetails();

    return () => {
      ignore = true;
    };
  }, [id]);

  const handleBookNow = () => {
    if (!isAuthenticated) {
      toast.error('Please log in first to book this car.');
      router.push(`/login?redirect=/cars/${id}`);
      return;
    }
    setIsModalOpen(true);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Car link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <LoadingSpinner fullScreen text="Loading vehicle specifications..." />
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mb-4">
          <Car className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Vehicle Not Found
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-sm">
          The vehicle you are looking for may have been removed or is
          temporarily unavailable.
        </p>
        <button
          onClick={() => router.push('/cars')}
          className="mt-6 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore Cars</span>
        </button>
      </div>
    );
  }

  const isAvailable = car.availabilityStatus === 'Available';

  return (
    <div className="py-10 lg:py-16 bg-slate-50/60 dark:bg-slate-950 transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm"
              title="Share Car">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-8 space-y-8">
            <div className="relative w-full h-80 sm:h-112.5 rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-900">
              <CarImage
                src={car.image}
                alt={car.carName || 'Vehicle'}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover object-center"
              />

              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900/85 text-white backdrop-blur-md border border-white/20 shadow-md">
                  {car.carType || 'Sedan'}
                </span>
                {car.booking_count > 0 && (
                  <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-600/90 text-white backdrop-blur-md flex items-center gap-1.5 shadow-md">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {car.booking_count} Verified Bookings
                  </span>
                )}
              </div>

              <div className="absolute top-4 right-4">
                <span
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md backdrop-blur-md ${
                    isAvailable
                      ? 'bg-emerald-500/90 text-white border border-emerald-400/30'
                      : 'bg-rose-500/90 text-white border border-rose-400/30'
                  }`}>
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  {car.availabilityStatus || 'Available'}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Gauge className="w-5 h-5 text-blue-600" />
                Technical Specifications & Highlights
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center space-y-1">
                  <Users className="w-5 h-5 text-blue-500 mx-auto" />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Capacity
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {car.seatCapacity || 5} Passengers
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center space-y-1">
                  <Gauge className="w-5 h-5 text-indigo-500 mx-auto" />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Transmission
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {car.transmission || 'Automatic'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center space-y-1">
                  <Fuel className="w-5 h-5 text-emerald-500 mx-auto" />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Fuel System
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {car.fuelType || 'Petrol'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center space-y-1">
                  <ShieldCheck className="w-5 h-5 text-purple-500 mx-auto" />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Insurance
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    Full CDW
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  About This Vehicle
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {car.description ||
                    'Experience unmatched performance, luxury interior acoustics, and exceptional fuel efficiency. Each vehicle in our fleet is fully inspected and sanitized before pickup.'}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Included Features & Amenities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(
                    car.features || [
                      'Climate Control Air Conditioning',
                      'Apple CarPlay & Android Auto',
                      '360 Degree Parking Camera',
                      'Cruise Control & Lane Assist',
                      'GPS Navigation System',
                      'Clean Interior & Full Tank Guarantee',
                    ]
                  ).map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {car.carType}
                </span>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white mt-1">
                  {car.carName}
                </h1>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-2">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span>{car.pickupLocation || 'Central City Hub'}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Daily Rate
                  </span>
                  <span className="text-3xl font-black text-blue-600 dark:text-blue-400">
                    {formatCurrency(car.dailyRentPrice || 0)}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {' '}
                    / day
                  </span>
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-950/80 px-2.5 py-1 rounded-full">
                  Best Price
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  {car.ownerName ? car.ownerName.charAt(0).toUpperCase() : 'H'}
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Hosted by
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {car.ownerName || 'DriveFleet Certified Host'}
                  </p>
                </div>
              </div>

              <div>
                <button
                  onClick={handleBookNow}
                  disabled={!isAvailable}
                  className={`w-full py-4 px-6 rounded-2xl font-black text-base shadow-xl transition-all duration-200 flex items-center justify-center gap-2 ${
                    isAvailable
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25 active:scale-[0.98]'
                      : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}>
                  <Sparkles className="w-5 h-5" />
                  <span>
                    {isAvailable
                      ? 'Book This Vehicle Now'
                      : 'Currently Unavailable'}
                  </span>
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-2.5">
                  Instant Confirmation • Free 24h Cancellation Guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <BookingModal
          car={car}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onBookingSuccess={() => {
            router.push('/my-bookings');
          }}
        />
      )}
    </div>
  );
}
