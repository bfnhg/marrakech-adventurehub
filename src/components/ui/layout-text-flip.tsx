"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type LayoutTextFlipProps = {
  text: string;
  words: string[];
  duration?: number;
  onChange?: (index: number) => void;
};

export const LayoutTextFlip = ({
  text,
  words,
  duration = 3200,
  onChange,
}: LayoutTextFlipProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % words.length;
        onChange?.(next);
        return next;
      });
    }, duration);

    return () => clearInterval(interval);
  }, [duration, words.length, onChange]);

  return (
    <div className="relative flex flex-col items-center text-center gap-6">
      {/* Soft glow background */}
      <div className="absolute -top-24 h-64 w-64 rounded-full 
                      bg-primary/20 blur-[120px]" />

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="text-4xl md:text-6xl font-semibold
                   text-neutral-900 dark:text-white"
      >
        {text}
      </motion.h2>

      {/* Animated luxury word */}
      <div className="relative h-[72px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -40, filter: "blur(12px)" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="
              absolute inset-0
              text-4xl md:text-6xl font-bold
              bg-gradient-to-r from-primary to-purple-500
              bg-clip-text text-transparent
            "
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};
