import React from 'react';
import { motion } from 'motion/react';

interface SkeletonLoaderProps {
  variant?: 'home' | 'about' | 'committees' | 'registration' | 'default';
}

export default function SkeletonLoader({ variant = 'default' }: SkeletonLoaderProps) {
  // A top loading indicator bar that animates swiftly at the top of the viewport
  const topProgressBar = (
    <div className="fixed top-0 left-0 right-0 h-1 bg-neutral-900 dark:bg-black z-[9999] overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-secondary to-primary"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
      />
    </div>
  );

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const shimmer = {
    animate: {
      backgroundPosition: ['200% 0', '-200% 0'],
      transition: {
        repeat: Infinity,
        duration: 1.8,
        ease: "linear",
      }
    }
  };

  const shimmerStyle = "relative overflow-hidden bg-gradient-to-r from-surface-container-low via-surface-container-highest to-surface-container-low bg-[length:400%_100%]";

  if (variant === 'committees') {
    return (
      <motion.div 
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="pt-24 md:pt-40 pb-20 px-6 max-w-7xl mx-auto w-full min-h-screen"
      >
        {topProgressBar}
        {/* Header Skeleton */}
        <div className="mb-16 md:mb-24 flex flex-col items-start gap-6">
          <div className={`h-6 w-32 rounded-full ${shimmerStyle}`} />
          <div className={`h-16 md:h-24 w-3/4 md:w-1/2 rounded-2xl ${shimmerStyle}`} />
          <div className={`h-6 w-full md:w-2/3 rounded-xl ${shimmerStyle}`} />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 w-full">
          {/* Card 1 Large */}
          <div className="col-span-1 md:col-span-8 h-[380px] rounded-xl border border-outline-variant/10 p-8 flex flex-col justify-between bg-surface-container-low/30 backdrop-blur-md">
            <div>
              <div className="flex justify-between mb-8">
                <div className={`w-14 h-14 rounded-2xl ${shimmerStyle}`} />
                <div className={`w-28 h-6 rounded-full ${shimmerStyle}`} />
              </div>
              <div className={`h-10 w-2/3 rounded-lg mb-4 ${shimmerStyle}`} />
              <div className={`h-6 w-1/3 rounded mb-8 ${shimmerStyle}`} />
              <div className={`h-4 w-full rounded mb-2 ${shimmerStyle}`} />
              <div className={`h-4 w-5/6 rounded ${shimmerStyle}`} />
            </div>
            <div className="flex gap-4">
              <div className={`h-10 w-24 rounded-full ${shimmerStyle}`} />
              <div className={`h-10 w-32 rounded-full ${shimmerStyle}`} />
            </div>
          </div>

          {/* Card 2 Small */}
          <div className="col-span-1 md:col-span-4 h-[380px] rounded-xl border border-outline-variant/10 p-8 flex flex-col justify-between bg-surface-container-low/30 backdrop-blur-md">
            <div>
              <div className={`w-14 h-14 rounded-2xl mb-8 ${shimmerStyle}`} />
              <div className={`h-10 w-5/6 rounded-lg mb-6 ${shimmerStyle}`} />
              <div className={`h-4 w-full rounded mb-2 ${shimmerStyle}`} />
              <div className={`h-4 w-4/5 rounded ${shimmerStyle}`} />
            </div>
            <div className={`h-10 w-28 rounded-full ${shimmerStyle}`} />
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === 'about') {
    return (
      <motion.div 
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="pt-24 md:pt-40 pb-20 px-6 max-w-7xl mx-auto w-full min-h-screen"
      >
        {topProgressBar}
        <div className="flex flex-col gap-12">
          {/* Hero text skeleton */}
          <div className="max-w-4xl space-y-4">
            <div className={`h-6 w-40 rounded-full ${shimmerStyle}`} />
            <div className={`h-12 md:h-20 w-full rounded-2xl ${shimmerStyle}`} />
            <div className={`h-12 md:h-20 w-5/6 rounded-2xl ${shimmerStyle}`} />
          </div>

          {/* Bio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <div className="space-y-4">
              <div className={`h-6 w-1/3 rounded ${shimmerStyle}`} />
              <div className={`h-4 w-full rounded ${shimmerStyle}`} />
              <div className={`h-4 w-full rounded ${shimmerStyle}`} />
              <div className={`h-4 w-5/6 rounded ${shimmerStyle}`} />
            </div>
            <div className={`h-[350px] rounded-2xl ${shimmerStyle}`} />
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === 'registration') {
    return (
      <motion.div 
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="pt-24 md:pt-40 pb-20 px-6 max-w-4xl mx-auto w-full min-h-screen"
      >
        {topProgressBar}
        <div className="space-y-8">
          <div className="text-center space-y-4 max-w-lg mx-auto">
            <div className={`h-12 w-3/4 rounded-xl mx-auto ${shimmerStyle}`} />
            <div className={`h-5 w-5/6 rounded-lg mx-auto ${shimmerStyle}`} />
          </div>

          {/* Registration Form Box */}
          <div className="glass-card rounded-2xl p-8 border border-outline-variant/10 bg-surface-container-low/30 backdrop-blur-md space-y-6">
            <div className="flex justify-between items-center pb-6 border-b border-outline-variant/10">
              <div className={`h-5 w-24 rounded ${shimmerStyle}`} />
              <div className="flex gap-2">
                <div className={`h-2 w-8 rounded-full ${shimmerStyle}`} />
                <div className={`h-2 w-8 rounded-full ${shimmerStyle}`} />
                <div className={`h-2 w-8 rounded-full ${shimmerStyle}`} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className={`h-4 w-20 rounded ${shimmerStyle}`} />
                <div className={`h-12 w-full rounded-lg ${shimmerStyle}`} />
              </div>
              <div className="space-y-2">
                <div className={`h-4 w-24 rounded ${shimmerStyle}`} />
                <div className={`h-12 w-full rounded-lg ${shimmerStyle}`} />
              </div>
            </div>

            <div className="space-y-2">
              <div className={`h-4 w-28 rounded ${shimmerStyle}`} />
              <div className={`h-12 w-full rounded-lg ${shimmerStyle}`} />
            </div>

            <div className="flex justify-between pt-4">
              <div className={`h-12 w-28 rounded-xl ${shimmerStyle}`} />
              <div className={`h-12 w-36 rounded-xl ${shimmerStyle}`} />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default elegant fallback template
  return (
    <motion.div 
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 bg-background/80 backdrop-blur-xl z-50 flex flex-col justify-center items-center gap-6"
    >
      {topProgressBar}
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Outer pulsating orbit ring */}
        <motion.div 
          className="absolute inset-0 rounded-full border-2 border-primary/25 border-t-primary"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        />
        {/* Inner ambient glowing core */}
        <motion.div 
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-secondary opacity-85 shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.5)]"
          animate={{ scale: [0.95, 1.15, 0.95] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-xs font-mono uppercase tracking-[0.25em] text-on-surface-variant"
      >
        Initializing Chamber...
      </motion.p>
    </motion.div>
  );
}
