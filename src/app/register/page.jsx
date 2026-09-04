'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  Card,
  Button,
  Form,
  Input,
  Label,
  TextField,
  Separator,
} from '@heroui/react';
import { Car } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { FcGoogle } from 'react-icons/fc';

function RegisterFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';
  const {
    register,
    googleLogin,
    isAuthenticated,
    loading: authLoading,
  } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [authLoading, isAuthenticated, redirectTo, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      password.length < 6 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password)
    ) {
      toast.error(
        'Password must contain at least 6 characters with uppercase and lowercase letters.',
      );
      return;
    }

    setLoading(true);
    const result = await register({ name, email, photoURL, password });
    setLoading(false);

    if (result.success) {
      router.push('/login');
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const result = await googleLogin(redirectTo);
    if (!result?.success) {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/60 dark:bg-slate-950 transition-colors duration-300">
      <Card className="max-w-md w-full p-8 sm:p-10 space-y-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
            <Car className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Create an Account
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Join DriveFleet to rent verified luxury cars or list your vehicles.
          </p>
        </div>

        <Button
          variant="outline"
          className="w-full font-semibold border-slate-300 dark:border-slate-700 rounded-2xl py-3"
          onClick={handleGoogleSignIn}
          isDisabled={loading}>
          <FcGoogle className="w-5 h-5 mr-1" />
          Sign up with Google
        </Button>

        <div className="relative my-4 text-center">
          <Separator className="w-full" />
          <span className="relative px-4 text-xs font-semibold uppercase tracking-wider text-slate-400 bg-white dark:bg-slate-900">
            Or register with email
          </span>
        </div>

        <Form onSubmit={handleSubmit} className="space-y-4">
          <TextField name="name" isRequired className="w-full">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Full Name
            </Label>
            <Input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1.5 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm"
            />
          </TextField>

          <TextField name="email" isRequired className="w-full">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Email Address
            </Label>
            <Input
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1.5 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm"
            />
          </TextField>

          <TextField name="photoURL" className="w-full">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Profile Photo URL{' '}
              <span className="text-xs text-slate-400 font-normal lowercase">
                (optional)
              </span>
            </Label>
            <Input
              type="text"
              placeholder="https://images.unsplash.com/... (optional)"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full mt-1.5 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm"
            />
          </TextField>

          <TextField name="password" isRequired className="w-full">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Password
            </Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1.5 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm"
            />
          </TextField>

          <Button
            type="submit"
            className="w-full mt-2 font-bold py-3.5 rounded-2xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25 transition-all"
            isDisabled={loading}>
            {loading ? 'Registering...' : 'Complete Registration'}
          </Button>
        </Form>

        <div className="text-center pt-2 text-xs text-slate-500 dark:text-slate-400">
          Already have an account?{' '}
          <Link
            href={
              redirectTo && redirectTo !== '/'
                ? `/login?redirect=${encodeURIComponent(redirectTo)}`
                : '/login'
            }
            className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
            Sign In Here
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen />}>
      <RegisterFormContent />
    </Suspense>
  );
}
