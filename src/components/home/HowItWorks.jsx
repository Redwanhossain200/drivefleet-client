'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  CalendarCheck2,
  KeyRound,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      icon: Search,
      title: 'Find Your Favorite Car',
      description:
        'Filter by category, price, seat capacity, or location to discover your dream EV, SUV, or luxury sedan in seconds.',
      badge: 'Step 1',
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    },
    {
      step: '02',
      icon: CalendarCheck2,
      title: 'Book & Customize Duration',
      description:
        'Select rental dates, toggle chauffeur or self-drive preference, add custom instructions, and get immediate confirmation.',
      badge: 'Step 2',
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      step: '03',
      icon: KeyRound,
      title: 'Unlock & Hit the Highway',
      description:
        'Pick up your sanitized car at your preferred hub or enjoy seamless contactless delivery directly to your door.',
      badge: 'Step 3',
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-linear-to-b from-slate-50 to-white dark:from-slate-900/60 dark:to-slate-950 transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-100/70 dark:bg-blue-950/70">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            Seamless Process
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            How Renting With DriveFleet Works
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Get behind the wheel in 3 effortless steps without long lines,
            paperwork delays, or confusing agreements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-500/40 dark:hover:border-blue-500/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <span className="absolute top-3 right-4 sm:top-4 sm:right-6 text-4xl sm:text-5xl md:text-6xl font-black text-slate-200 dark:text-slate-700/30 select-none">
                  {item.step}
                </span>

                <div className="space-y-4 sm:space-y-5 relative z-10">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl border flex items-center justify-center ${item.color}`}>
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>

                  <div>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {item.badge}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 sm:mt-14 md:mt-16 text-center">
          <Link
            href="/cars"
            className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/25 active:scale-95 transition-all text-sm sm:text-base w-full sm:w-auto">
            <span>Start Your Journey Now</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
