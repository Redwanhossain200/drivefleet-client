'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
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
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { FcGoogle } from 'react-icons/fc';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  const {
    login,
    googleLogin,
    isAuthenticated,
    loading: authLoading,
  } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [authLoading, isAuthenticated, redirectTo, router]);

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      if (errorParam === 'google-sign-in-failed') {
        toast.error(
          'Google sign-in was cancelled or encountered an error. Please try again.',
        );
      } else {
        toast.error(`Authentication notice: ${errorParam}`);
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      router.push(redirectTo);
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
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/60 dark:bg-slate-950 transition-colors duration-300">
      <Card className="max-w-md w-full p-8 sm:p-10 space-y-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
            <Car className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Sign in to access your DriveFleet bookings and host fleet.
          </p>
        </div>

        <Button
          variant="outline"
          className="w-full font-semibold border-slate-300 dark:border-slate-700 rounded-2xl py-3"
          onClick={handleGoogleSignIn}
          isDisabled={loading}>
          <FcGoogle className="w-5 h-5 mr-1" />
          Continue with Google
        </Button>

        <div className="relative my-4 text-center">
          <Separator className="w-full" />
          <span className="relative px-4 text-xs font-semibold uppercase tracking-wider text-slate-400 bg-white dark:bg-slate-900">
            Or sign in with email
          </span>
        </div>

        <Form onSubmit={handleSubmit} className="space-y-4">
          <TextField name="email" isRequired className="w-full">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Email Address
            </Label>
            <Input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1.5 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm"
            />
          </TextField>

          <TextField name="password" isRequired className="w-full">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Password
            </Label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1.5 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm"
            />
          </TextField>

          <Button
            type="submit"
            className="w-full mt-2 font-bold py-3.5 rounded-2xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25 transition-all"
            isDisabled={loading}>
            {loading ? 'Signing In...' : 'Sign In to DriveFleet'}
          </Button>
        </Form>

        <div className="text-center pt-2 text-xs text-slate-500 dark:text-slate-400">
          Don&apos;t have an account yet?{' '}
          <Link
            href={
              redirectTo && redirectTo !== '/'
                ? `/register?redirect=${encodeURIComponent(redirectTo)}`
                : '/register'
            }
            className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
            Create an Account
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen />}>
      <LoginFormContent />
    </Suspense>
  );
}
