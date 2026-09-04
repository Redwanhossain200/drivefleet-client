'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CarImage from '@/components/cars/CarImage';
import { useAuth } from '@/context/AuthContext';
import EditCarModal from '@/components/cars/EditCarModal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import api from '@/lib/auth-client';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { formatCurrency } from '@/lib/utils';
import {
  Car,
  Edit,
  Trash2,
  PlusCircle,
  MapPin,
  TrendingUp,
  Users,
  Eye,
} from 'lucide-react';

function MyCarsContent() {
  const { user } = useAuth();
  const userEmail = user?.email;
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let ignore = false;
    async function fetchMyCars() {
      try {
        const emailQuery = userEmail
          ? `?email=${encodeURIComponent(userEmail)}`
          : '';
        const res = await api.get(`/my-cars${emailQuery}`);
        if (!ignore) {
          if (Array.isArray(res.data)) {
            setCars(res.data);
          } else {
            setCars([]);
          }
        }
      } catch (error) {
        if (!ignore) {
          console.error('Error fetching my cars:', error);
          toast.error('Failed to load your added cars');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchMyCars();

    return () => {
      ignore = true;
    };
  }, [userEmail, refreshKey]);

  const handleEditClick = (car) => {
    setSelectedCar(car);
    setIsEditOpen(true);
  };

  const handleDelete = (car) => {
    Swal.fire({
      title: `Delete ${car.carName}?`,
      text: 'Are you sure you want to delete this car listing? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Delete Listing',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await api.delete(`/cars/${car._id}`);
          if (res.data?.success || res.status === 200) {
            Swal.fire(
              'Deleted!',
              'The car listing has been removed.',
              'success',
            );
            setCars((prev) => prev.filter((item) => item._id !== car._id));
          } else {
            toast.error(res.data?.message || 'Failed to delete car');
          }
        } catch (err) {
          console.error('Delete error:', err);
          toast.error(
            err.response?.data?.message || 'Failed to delete car listing',
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-100/70 dark:bg-purple-950/70 mb-2">
              <Car className="w-3.5 h-3.5" />
              Host Fleet
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              My Listed Cars
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Manage, update details, or remove vehicles you currently have
              listed.
            </p>
          </div>

          <Link
            href="/add-car"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25 transition-all shrink-0">
            <PlusCircle className="w-4 h-4" />
            <span>Add Another Car</span>
          </Link>
        </div>

        {loading ? (
          <div className="py-20">
            <LoadingSpinner text="Fetching your listed vehicles..." />
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-20 px-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center mx-auto">
              <Car className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              You haven&apos;t listed any cars yet
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Start earning by listing your personal or rental vehicle on
              DriveFleet today.
            </p>
            <Link
              href="/add-car"
              className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors">
              <PlusCircle className="w-4 h-4" />
              <span>Add Your First Car</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div
                key={car._id}
                className="flex flex-col justify-between bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden hover:border-purple-500/40 transition-all card-glow">
                <div className="relative w-full h-48 bg-slate-900">
                  <CarImage
                    src={car.image}
                    alt={car.carName || 'Vehicle'}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-slate-900/85 text-white backdrop-blur-md">
                      {car.carType}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-md ${
                        car.availabilityStatus === 'Available'
                          ? 'bg-emerald-600/90'
                          : 'bg-rose-600/90'
                      }`}>
                      {car.availabilityStatus}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-slate-900/85 text-blue-400 font-bold text-sm backdrop-blur-md">
                    {formatCurrency(car.dailyRentPrice)} / day
                  </div>
                </div>

                <div className="p-6 grow space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">
                      {car.carName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" />
                      <span>{car.pickupLocation}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      <Users className="w-3.5 h-3.5 text-blue-500" />
                      <span>{car.seatCapacity} Seats</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{car.booking_count || 0} Bookings</span>
                    </div>
                  </div>

                  <div className="pt-2 grid grid-cols-3 gap-2">
                    <Link
                      href={`/cars/${car._id}`}
                      className="py-2.5 px-3 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors flex items-center justify-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </Link>

                    <button
                      onClick={() => handleEditClick(car)}
                      className="py-2.5 px-3 rounded-xl text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors flex items-center justify-center gap-1">
                      <Edit className="w-3.5 h-3.5" />
                      <span>Update</span>
                    </button>

                    <button
                      onClick={() => handleDelete(car)}
                      className="py-2.5 px-3 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 hover:bg-red-100 dark:hover:bg-red-900/60 transition-colors flex items-center justify-center gap-1">
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isEditOpen && selectedCar && (
        <EditCarModal
          car={selectedCar}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onUpdateSuccess={() => {
            setLoading(true);
            setRefreshKey((k) => k + 1);
          }}
        />
      )}
    </div>
  );
}

export default function MyCarsPage() {
  return <MyCarsContent />;
}
