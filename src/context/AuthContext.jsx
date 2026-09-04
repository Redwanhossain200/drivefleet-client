'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  authClient,
  signIn,
  signUp,
  signOut,
  getSession,
} from '@/lib/auth-client';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateActiveUser = (userData) => {
    if (userData) {
      const avatar = userData.image || userData.photoURL || '';
      setUser({
        ...userData,
        image: avatar,
        photoURL: avatar,
      });
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const sessionRes = await getSession();
        if (sessionRes?.data?.user) {
          updateActiveUser(sessionRes.data.user);
        } else {
          updateActiveUser(null);
        }
      } catch {
        updateActiveUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      if (!email || !password) {
        toast.error('Please enter both email and password');
        setLoading(false);
        return { success: false, error: 'Missing credentials' };
      }

      const res = await signIn.email({
        email,
        password,
      });

      if (res?.data?.user) {
        const loggedUser = res.data.user;
        updateActiveUser(loggedUser);
        toast.success(`Welcome back, ${loggedUser.name || 'Driver'}!`);
        return { success: true, user: loggedUser };
      } else if (res?.error) {
        const errMsg = res.error.message || 'Invalid email or password.';
        toast.error(errMsg);
        return { success: false, error: errMsg };
      } else {
        toast.error(
          'Unable to sign in. Please verify your email and password.',
        );
        return { success: false, error: 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      const errMsg = error.message || 'Login failed. Please try again.';
      toast.error(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ name, email, photoURL, password }) => {
    setLoading(true);
    try {
      if (!password || password.length < 6) {
        toast.error('Password must be at least 6 characters long.');
        setLoading(false);
        return {
          success: false,
          error: 'Password must be at least 6 characters long.',
        };
      }
      if (!/[A-Z]/.test(password)) {
        toast.error(
          'Password must contain at least one uppercase letter (A-Z).',
        );
        setLoading(false);
        return {
          success: false,
          error: 'Password must contain at least one uppercase letter.',
        };
      }
      if (!/[a-z]/.test(password)) {
        toast.error(
          'Password must contain at least one lowercase letter (a-z).',
        );
        setLoading(false);
        return {
          success: false,
          error: 'Password must contain at least one lowercase letter.',
        };
      }

      const avatar =
        photoURL && photoURL.trim() !== ''
          ? photoURL
          : `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name || email)}`;

      const res = await signUp.email({
        email,
        password,
        name,
        image: avatar,
      });

      if (res?.data?.user) {
        const newUser = res.data.user;
        try {
          await signOut();
        } catch {}
        updateActiveUser(null);
        toast.success(
          'Registration successful! Please log in to your account.',
        );
        return { success: true, user: newUser };
      } else if (res?.error) {
        const errMsg =
          res.error.message || 'Registration failed. Email may already exist.';
        toast.error(errMsg);
        return { success: false, error: errMsg };
      } else {
        toast.error('Registration could not be completed.');
        return { success: false, error: 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errMsg = error.message || 'Registration failed.';
      toast.error(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async (destination = '/') => {
    setLoading(true);
    try {
      const origin = window.location.origin;
      const callbackURL =
        destination && destination.startsWith('http')
          ? destination
          : new URL(destination || '/', origin).toString();

      const res = await signIn.social({
        provider: 'google',
        callbackURL,
        errorCallbackURL: `${origin}/login?error=google-sign-in-failed`,
      });

      if (res?.data?.url) {
        window.location.href = res.data.url;
        return { success: true };
      } else if (res?.error) {
        toast.error(res.error.message || 'Google sign-in failed.');
        setLoading(false);
        return { success: false, error: res.error.message };
      } else {
        return { success: true };
      }
    } catch (error) {
      console.error('Google Login error:', error);
      toast.error(error?.message || 'Google login encountered an issue.');
      setLoading(false);
      return { success: false, error: error?.message };
    }
  };

  const logout = async () => {
    try {
      await signOut();
    } catch (soErr) {
      console.warn('Sign out notice:', soErr.message);
    } finally {
      updateActiveUser(null);
      toast.success('You have been logged out.');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        googleLogin,
        logout,
        isAuthenticated: !!user,
        authClient,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
