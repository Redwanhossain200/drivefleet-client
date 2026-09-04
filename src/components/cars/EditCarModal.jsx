'use client';

import React, { useState } from 'react';
import { Button, Form, Input, Label, TextField } from '@heroui/react';
import api from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { Edit, X } from 'lucide-react';

export default function EditCarModal({
  car,
  isOpen,
  onClose,
  onUpdateSuccess,
}) {
  const [prevCar, setPrevCar] = useState(car);
  const [formData, setFormData] = useState({
    carName: car?.carName || '',
    dailyRentPrice: car?.dailyRentPrice || '',
    carType: car?.carType || 'SUV',
    image: car?.image || '',
    seatCapacity: car?.seatCapacity || 5,
    pickupLocation: car?.pickupLocation || '',
    description: car?.description || '',
    availabilityStatus: car?.availabilityStatus || 'Available',
    transmission: car?.transmission || 'Automatic',
    fuelType: car?.fuelType || 'Petrol',
  });
  const [loading, setLoading] = useState(false);

  if (car !== prevCar) {
    setPrevCar(car);
    if (car) {
      setFormData({
        carName: car.carName || '',
        dailyRentPrice: car.dailyRentPrice || '',
        carType: car.carType || 'SUV',
        image: car.image || '',
        seatCapacity: car.seatCapacity || 5,
        pickupLocation: car.pickupLocation || '',
        description: car.description || '',
        availabilityStatus: car.availabilityStatus || 'Available',
        transmission: car.transmission || 'Automatic',
        fuelType: car.fuelType || 'Petrol',
      });
    }
  }

  if (!isOpen || !car) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        carName: formData.carName.trim(),
        image: formData.image.trim(),
        pickupLocation: formData.pickupLocation.trim(),
        description: formData.description.trim(),
        dailyRentPrice: Number(formData.dailyRentPrice),
        seatCapacity: Number(formData.seatCapacity),
      };

      const res = await api.put(`/cars/${car._id}`, payload);

      if (res.data?.success || res.status === 200) {
        toast.success('Car details updated successfully!');
        if (onUpdateSuccess) onUpdateSuccess();
        onClose();
      } else {
        toast.error(res.data?.message || 'Failed to update vehicle');
      }
    } catch (error) {
      console.error('Update car error:', error);
      toast.error(error.response?.data?.message || 'Error updating vehicle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-6 my-auto text-slate-900 dark:text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close">
          <X className="w-4 h-4" />
        </button>

        <div className="mb-4 pr-6">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 mb-1.5">
            <Edit className="w-3 h-3" />
            Update Vehicle
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Edit {car.carName}
          </h2>
        </div>

        <Form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TextField name="carName" isRequired className="w-full">
              <Label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                Car Name & Model *
              </Label>
              <Input
                type="text"
                value={formData.carName}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </TextField>

            <TextField name="dailyRentPrice" isRequired className="w-full">
              <Label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                Daily Rent Price ($) *
              </Label>
              <Input
                type="number"
                min="10"
                max="5000"
                value={formData.dailyRentPrice}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </TextField>

            <div className="w-full flex flex-col">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                Car Type
              </label>
              <select
                name="carType"
                value={formData.carType}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Luxury">Luxury</option>
                <option value="Electric">Electric</option>
                <option value="Hatchback">Hatchback</option>
              </select>
            </div>

            <div className="w-full flex flex-col">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                Availability Status
              </label>
              <select
                name="availabilityStatus"
                value={formData.availabilityStatus}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
                <option value="In Maintenance">In Maintenance</option>
              </select>
            </div>

            <TextField name="seatCapacity" isRequired className="w-full">
              <Label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                Seat Capacity *
              </Label>
              <Input
                type="number"
                min="2"
                max="12"
                value={formData.seatCapacity}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </TextField>

            <TextField name="pickupLocation" isRequired className="w-full">
              <Label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                Pickup Location *
              </Label>
              <Input
                type="text"
                value={formData.pickupLocation}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </TextField>
          </div>

          <TextField name="image" isRequired className="w-full">
            <Label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              Image URL *
            </Label>
            <Input
              type="url"
              value={formData.image}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </TextField>

          <div className="w-full flex flex-col">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              Description *
            </label>
            <textarea
              name="description"
              rows={2}
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            />
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
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
