'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card, Button, Form, Input, Label, TextField } from '@heroui/react';
import api from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { PlusCircle } from 'lucide-react';

function AddCarForm() {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    carName: '',
    dailyRentPrice: '',
    carType: 'SUV',
    image: '',
    seatCapacity: 5,
    pickupLocation: '',
    description: '',
    availabilityStatus: 'Available',
    transmission: 'Automatic',
    fuelType: 'Petrol',
  });
  const [loading, setLoading] = useState(false);

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
        ownerName: user?.name || 'Car Host',
      };

      const res = await api.post('/cars', payload);
      if (res.data?.success || res.status === 201) {
        toast.success('Car listed successfully!');
        router.push('/my-cars');
      } else {
        toast.error(res.data?.message || 'Failed to add car');
      }
    } catch (error) {
      console.error('Error adding car:', error);
      toast.error(
        error.response?.data?.message ||
          'An error occurred while creating listing',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 lg:py-16 bg-slate-50/60 dark:bg-slate-950 transition-colors duration-300 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400">
            <PlusCircle className="w-3.5 h-3.5" />
            Host Management
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            List a New Vehicle
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Earn income by listing your verified car on the DriveFleet global
            rental network.
          </p>
        </div>

        <Card className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
          <Form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <TextField name="carName" isRequired className="w-full">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Car Name & Model
                </Label>
                <Input
                  type="text"
                  placeholder="e.g. 2024 Mercedes-Benz C300"
                  value={formData.carName}
                  onChange={handleChange}
                  className="w-full mt-1.5 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm"
                />
              </TextField>

              <TextField name="dailyRentPrice" isRequired className="w-full">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Daily Rent Price (USD)
                </Label>
                <Input
                  type="number"
                  min="10"
                  max="5000"
                  placeholder="e.g. 95"
                  value={formData.dailyRentPrice}
                  onChange={handleChange}
                  className="w-full mt-1.5 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm"
                />
              </TextField>

              <div className="w-full flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Car Type / Category *
                </label>
                <select
                  name="carType"
                  value={formData.carType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm font-semibold">
                  <option value="SUV">SUV (Sport Utility Vehicle)</option>
                  <option value="Sedan">Sedan (Executive & Compact)</option>
                  <option value="Luxury">Luxury / Sports Car</option>
                  <option value="Electric">Electric Vehicle (EV)</option>
                  <option value="Hatchback">Hatchback / City Car</option>
                </select>
              </div>

              <div className="w-full flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Availability Status *
                </label>
                <select
                  name="availabilityStatus"
                  value={formData.availabilityStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm font-semibold">
                  <option value="Available">Available for Rent</option>
                  <option value="Unavailable">Temporarily Unavailable</option>
                  <option value="In Maintenance">In Maintenance</option>
                </select>
              </div>

              <TextField name="seatCapacity" isRequired className="w-full">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Seat Capacity
                </Label>
                <Input
                  type="number"
                  min="2"
                  max="12"
                  value={formData.seatCapacity}
                  onChange={handleChange}
                  className="w-full mt-1.5 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm"
                />
              </TextField>

              <TextField name="pickupLocation" isRequired className="w-full">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Pickup Location / Station
                </Label>
                <Input
                  type="text"
                  placeholder="e.g. Airport Terminal 1, Los Angeles"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  className="w-full mt-1.5 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm"
                />
              </TextField>

              <div className="w-full flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Transmission *
                </label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm font-semibold">
                  <option value="Automatic">Automatic Transmission</option>
                  <option value="Manual">Manual Transmission</option>
                </select>
              </div>

              <div className="w-full flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Fuel / Power Source *
                </label>
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm font-semibold">
                  <option value="Petrol">Petrol / Gasoline</option>
                  <option value="Electric">Pure Electric (EV)</option>
                  <option value="Hybrid">Plug-in Hybrid</option>
                  <option value="Diesel">Diesel</option>
                </select>
              </div>
            </div>

            <TextField name="image" isRequired className="w-full">
              <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                High-Definition Car Image URL
              </Label>
              <Input
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                value={formData.image}
                onChange={handleChange}
                className="w-full mt-1.5 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm"
              />
            </TextField>

            <div className="w-full flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Vehicle Overview & Description *
              </label>
              <textarea
                name="description"
                rows={4}
                required
                placeholder="Describe your vehicle's features, driving dynamics, cleanliness, and amenities..."
                value={formData.description}
                onChange={handleChange}
                className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button
                type="submit"
                className="w-full font-bold py-4 rounded-2xl text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/25 transition-all text-base"
                isDisabled={loading}>
                {loading ? 'Publishing...' : 'Publish Vehicle Listing'}
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default function AddCarPage() {
  return <AddCarForm />;
}
