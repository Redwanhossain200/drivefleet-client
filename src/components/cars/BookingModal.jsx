'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button, Form, Input, Label, TextField } from '@heroui/react';
import api from '@/lib/auth-client';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { formatCurrency } from '@/lib/utils';
import { Car, MapPin, X } from 'lucide-react';

export default function BookingModal({
  car,
  isOpen,
  onClose,
  onBookingSuccess,
}) {
  const { user, isAuthenticated } = useAuth();
  const [rentalDays, setRentalDays] = useState(1);
  const [driverNeeded, setDriverNeeded] = useState('No');
  const [specialNote, setSpecialNote] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !car) return null;

  const dailyPrice = car.dailyRentPrice || 0;
  const driverFeePerDay = 25;
  const driverTotal = driverNeeded === 'Yes' ? driverFeePerDay * rentalDays : 0;
  const baseTotal = dailyPrice * rentalDays;
  const totalPrice = baseTotal + driverTotal;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated || !user) {
      toast.error('Please log in first to book a vehicle.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        carId: car._id,
        dailyRentPrice: dailyPrice,
        rentalDays: Number(rentalDays),
        driverNeeded,
        specialNote:
          specialNote.trim() || 'Standard booking without special notes.',
        totalPrice,
        userEmail: user.email,
        userName: user.name || 'Valued Customer',
      };

      const res = await api.post('/bookings', payload);

      if (res.data?.success) {
        Swal.fire({
          icon: 'success',
          title: 'Booking Confirmed!',
          html: `
            <div style="text-align: left; font-size: 14px; line-height: 1.6;">
              <p><strong>Vehicle:</strong> ${car.carName}</p>
              <p><strong>Duration:</strong> ${rentalDays} Day(s)</p>
              <p><strong>Driver:</strong> ${driverNeeded === 'Yes' ? 'Chauffeur Included' : 'Self-Drive'}</p>
              <p><strong>Total Price:</strong> <span style="color: #2563eb; font-weight: bold;">${formatCurrency(totalPrice)}</span></p>
              <p style="margin-top: 8px; font-size: 12px; color: #64748b;">A confirmation email has been logged to ${user.email}.</p>
            </div>
          `,
          confirmButtonColor: '#2563eb',
          confirmButtonText: 'View My Bookings',
        }).then(() => {
          if (onBookingSuccess) onBookingSuccess();
          onClose();
        });
      } else {
        toast.error(res.data?.message || 'Failed to complete booking');
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      const msg =
        error.response?.data?.message || 'An error occurred while booking.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-6 my-auto text-slate-900 dark:text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close">
          <X className="w-4 h-4" />
        </button>

        <div className="mb-3.5 pr-6">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 mb-1.5">
            <Car className="w-3 h-3" />
            Reserve Vehicle
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Book {car.carName}
          </h2>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-blue-500" />
            <span>Pickup at: {car.pickupLocation || 'Main Hub'}</span>
          </div>
        </div>

        <Form onSubmit={handleSubmit} className="space-y-3">
          <TextField name="rentalDays" isRequired className="w-full">
            <Label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              Rental Duration (Days) *
            </Label>
            <Input
              type="number"
              min="1"
              max="30"
              value={rentalDays}
              onChange={(e) =>
                setRentalDays(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">
              Daily Rate: {formatCurrency(dailyPrice)} / day
            </span>
          </TextField>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
              Chauffeur / Driver Needed?
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={driverNeeded === 'No' ? 'solid' : 'outline'}
                className={`w-full py-1.5 rounded-xl font-semibold text-xs ${
                  driverNeeded === 'No'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
                onClick={() => setDriverNeeded('No')}>
                No (Self-Drive)
              </Button>
              <Button
                type="button"
                variant={driverNeeded === 'Yes' ? 'solid' : 'outline'}
                className={`w-full py-1.5 rounded-xl font-semibold text-xs ${
                  driverNeeded === 'Yes'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
                onClick={() => setDriverNeeded('Yes')}>
                Yes (+$25/day)
              </Button>
            </div>
          </div>

          <div className="w-full flex flex-col">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              Special Instructions / Notes (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Baby seat required, airport pickup at 10:00 AM..."
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Vehicle Rate ({rentalDays} days)</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {formatCurrency(baseTotal)}
              </span>
            </div>
            {driverNeeded === 'Yes' && (
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Chauffeur Fee ($25 x {rentalDays} d)</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {formatCurrency(driverTotal)}
                </span>
              </div>
            )}
            <div className="border-t border-slate-200 dark:border-slate-700/80 pt-1.5 flex justify-between items-center text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              <span>Total Amount</span>
              <span className="text-base sm:text-lg text-blue-600 dark:text-blue-400">
                {formatCurrency(totalPrice)}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2.5">
            <Button
              variant="outline"
              onClick={onClose}
              isDisabled={loading}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25"
              isDisabled={loading}>
              {loading ? 'Confirming...' : 'Confirm & Book Now'}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
