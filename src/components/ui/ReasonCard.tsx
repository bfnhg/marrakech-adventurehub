"use client";
import { motion } from "framer-motion";

type ReasonCardProps = {
  data: {
    word: string;
    title: string;
    description: string;
    icon: string;
  };
};

export const ReasonCard = ({ data }: ReasonCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.94 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="
        relative mx-auto mt-20 max-w-2xl
        rounded-3xl
        border border-white/20 dark:border-white/10
        bg-white/70 dark:bg-neutral-900/60
        backdrop-blur-xl
        p-10 text-center
        shadow-[0_40px_120px_rgba(0,0,0,0.15)]
      "
    >
      {/* Inner glow */}
      <div className="absolute inset-0 rounded-3xl 
                      bg-gradient-to-br from-primary/10 to-transparent
                      pointer-events-none" />

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-6xl mb-6"
      >
        {data.icon}
      </motion.div>

      <h3 className="text-3xl font-semibold text-neutral-900 dark:text-white">
        {data.title}
      </h3>

      <p className="mt-4 text-lg leading-relaxed
                    text-neutral-700 dark:text-neutral-300">
        {data.description}
      </p>
    </motion.div>
  );
};
