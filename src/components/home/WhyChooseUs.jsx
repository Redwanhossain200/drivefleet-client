'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  CreditCard,
  Clock,
  Headphones,
  Award,
  Sparkles,
} from 'lucide-react';

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Full Insurance Included',
      description:
        'Every vehicle in our platform is protected by comprehensive multi-risk coverage with zero surprise liabilities.',
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    },
    {
      icon: CreditCard,
      title: 'Zero Hidden Charges',
      description:
        'Transparent daily rental prices with clear tax rates. What you see is exactly what you pay at checkout.',
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      icon: Clock,
      title: 'Instant Keyless Booking',
      description:
        'Reserve and confirm in seconds with digital authentication, fast paperless verification, and immediate voucher.',
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    },
    {
      icon: Headphones,
      title: '24/7 Roadside Assistance',
      description:
        'Our dedicated roadside rescue team and customer concierge are always on standby anywhere your trip takes you.',
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    },
    {
      icon: Award,
      title: '150-Point Inspection',
      description:
        'Every car undergoes rigorous mechanical, battery, fluid, and tire safety checks before every single dispatch.',
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
    },
    {
      icon: Sparkles,
      title: 'Sanitized & Spotless Clean',
      description:
        'Hospital-grade interior sterilization, fresh air treatment, and exterior shine guaranteed for your family.',
      color: 'text-pink-500 bg-pink-500/10 border-pink-500/20',
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-100/70 dark:bg-blue-950/70">
            <Award className="w-3.5 h-3.5" />
            Why Choose DriveFleet
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Engineered for Effortless, Safe & Luxurious Travel
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            We bridge the gap between premium luxury convenience and affordable
            self-drive rentals with industry-leading vehicle reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-8 rounded-3xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-300 card-glow flex flex-col justify-between">
                <div className="space-y-4">
                  <div
                    className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${item.color}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
