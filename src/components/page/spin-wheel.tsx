
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Zap, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

type SpinWheelProps = {
  onGenerate: () => void;
  loading: boolean;
  disabled?: boolean;
};

const sparks = Array.from({ length: 12 });

const sparksContainerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const sparkVariants = {
  initial: {
    x: 0,
    y: 0,
    scale: 0,
    opacity: 0,
  },
  animate: (i: number) => ({
    x: Math.cos((i / sparks.length) * 2 * Math.PI) * 120,
    y: Math.sin((i / sparks.length) * 2 * Math.PI) * 120,
    scale: [0.5, 1, 0.5],
    opacity: [0, 1, 0],
    transition: {
      duration: 1.2,
      ease: 'circOut',
      repeat: Infinity,
      repeatDelay: 1.3,
      delay: Math.random() * 0.5,
    },
  }),
};

export function SpinWheel({ onGenerate, loading, disabled = false }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpin = () => {
    if (loading || isSpinning || disabled) return;
    setIsSpinning(true);
    onGenerate();
  };
  
  useEffect(() => {
    if (!loading && isSpinning) {
      setIsSpinning(false);
    }
  }, [loading, isSpinning]);

  return (
    <div className="relative flex flex-col items-center justify-center group">
      <div className="relative w-64 h-64 md:w-72 md:h-72">
        <AnimatePresence>
            {(isSpinning || loading) && !disabled && (
                <motion.div
                    variants={sparksContainerVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0 flex items-center justify-center"
                >
                    {sparks.map((_, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={sparkVariants}
                            className="absolute"
                        >
                            <Zap className="w-6 h-6 text-primary" fill="currentColor" style={{filter: 'drop-shadow(0 0 5px currentColor)'}} />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
        
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/60 to-primary/20 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>

        <motion.div
          className="relative w-full h-full rounded-full"
          animate={{ rotate: (isSpinning || loading) && !disabled ? 360 * 3 + (Math.random() * 360) : 0 }}
          transition={{
            duration: 2.5,
            ease: 'circOut',
          }}
        >
           <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]"></div>
        </motion.div>

        <button
          onClick={handleSpin}
          disabled={loading || isSpinning || disabled}
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "w-32 h-32 md:w-36 md:h-36",
            "rounded-full bg-background border-[6px] border-background",
            "flex flex-col items-center justify-center text-center",
            "font-semibold text-lg text-foreground",
            "transition-all duration-300 transform",
            "shadow-lg hover:shadow-primary/40",
            "disabled:opacity-70 disabled:cursor-not-allowed",
            "hover:scale-105 active:scale-95",
            disabled && "hover:shadow-lg !scale-100"
          )}
        >
          <AnimatePresence mode="wait">
            {loading || isSpinning ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center"
              >
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="text-sm mt-2">Generating...</span>
              </motion.div>
            ) : disabled ? (
              <motion.div
                key="disabled"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center"
              >
                <Lock className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm mt-2 text-muted-foreground">Limit Reached</span>
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center"
              >
                <Zap className="h-8 w-8 text-primary" />
                <span className="mt-1">Spin</span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
