'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CarImage from '@/components/cars/CarImage';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import api from '@/lib/auth-client';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  CalendarCheck,
  Calendar,
  Clock,
  UserCheck,
  Trash2,
  ArrowRight,
  FileText,
} from 'lucide-react';

function MyBookingsContent() {
  const { user } = useAuth();
  const userEmail = user?.email;
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function fetchMyBookings() {
      try {
        const emailQuery = userEmail
          ? `?email=${encodeURIComponent(userEmail)}`
          : '';
        const res = await api.get(`/my-bookings${emailQuery}`);
        if (!ignore) {
          if (Array.isArray(res.data)) {
            setBookings(res.data);
          } else {
            setBookings([]);
          }
        }
      } catch (error) {
        if (!ignore) {
          console.error('Error fetching bookings:', error);
          toast.error('Failed to load your bookings');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchMyBookings();

    return () => {
      ignore = true;
    };
  }, [userEmail]);

  const handleCancelBooking = (booking) => {
    Swal.fire({
      title: 'Cancel this reservation?',
      text: `Are you sure you want to cancel your booking for ${booking.carName}? 100% refund will be processed to your account.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Cancel Reservation',
      cancelButtonText: 'Keep Booking',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await api.delete(`/bookings/${booking._id}`);
          if (res.data?.success || res.status === 200) {
            Swal.fire(
              'Cancelled!',
              'Your booking has been cancelled.',
              'success',
            );
            setBookings((prev) => prev.filter((b) => b._id !== booking._id));
          } else {
            toast.error(res.data?.message || 'Cancellation failed');
          }
        } catch (err) {
          console.error('Cancel booking error:', err);
          toast.error(
            err.response?.data?.message || 'Failed to cancel booking',
          );
        }
      }
    });
  };

  return (
    <div className="py-12 lg:py-16 bg-slate-50/60 dark:bg-slate-950 transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/70 mb-2">
              <CalendarCheck className="w-3.5 h-3.5" />
              Active Itineraries
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              My Rental Bookings
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Review and manage all your reserved vehicles, itineraries, and
              chauffeur services.
            </p>
          </div>

          <Link
            href="/cars"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25 transition-all shrink-0">
            <span>Book Another Car</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="py-20">
            <LoadingSpinner text="Loading your reserved itineraries..." />
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 px-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto">
              <CalendarCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              No bookings yet
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              You haven&apos;t reserved any vehicles yet. Explore our luxury and
              daily commuter fleet to start your trip.
            </p>
            <Link
              href="/cars"
              className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors">
              <span>Explore Fleet</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:border-emerald-500/40 transition-all card-glow flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="relative w-full sm:w-44 h-32 rounded-2xl overflow-hidden bg-slate-900 shrink-0">
                    <CarImage
                      src={b.carImage}
                      alt={b.carName || 'Vehicle'}
                      fill
                      sizes="(max-width: 640px) 100vw, 176px"
                      className="object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-900/85 text-white backdrop-blur-md">
                      {b.carType || 'Sedan'}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {b.carName}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-300/40">
                        {b.status || 'Confirmed'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-blue-500" />
                        Booked: {formatDate(b.bookingDate)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-indigo-500" />
                        Duration: {b.rentalDays || 1} Day(s)
                      </span>
                      <span className="flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                        Driver:{' '}
                        {b.driverNeeded === 'Yes'
                          ? 'Chauffeur Included'
                          : 'Self-Drive'}
                      </span>
                    </div>

                    {b.specialNote &&
                      b.specialNote !== 'No special requirements.' && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl">
                          <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span>Note: {b.specialNote}</span>
                        </p>
                      )}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800 gap-3">
                  <div className="text-left sm:text-right">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                      Total Paid
                    </span>
                    <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
                      {formatCurrency(b.totalPrice)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCancelBooking(b)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 hover:bg-red-100 dark:hover:bg-red-900/60 transition-colors flex items-center gap-1.5">
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Cancel Booking</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MyBookingsPage() {
  return <MyBookingsContent />;
}
