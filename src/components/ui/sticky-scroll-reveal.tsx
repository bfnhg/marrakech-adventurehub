"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ContentItem {
  title: string;
  description: string;
  content?: React.ReactNode;
}

interface StickyScrollProps {
  content: ContentItem[];
  contentClassName?: string;
}

export const StickyScroll = ({
  content,
  contentClassName,
}: StickyScrollProps) => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end start"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const breakpoints = content.map((_, i) => i / cardLength);
    const closestIndex = breakpoints.reduce((acc, bp, idx) => {
      return Math.abs(latest - bp) < Math.abs(latest - breakpoints[acc]) ? idx : acc;
    }, 0);
    setActiveCard(closestIndex);
  });

  const backgroundColors = ["#0f172a", "#000000", "#171717"];
  const linearGradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)",
    "linear-gradient(to bottom right, #ec4899, #6366f1)",
    "linear-gradient(to bottom right, #f97316, #eab308)",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0]);

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="relative flex h-[30rem] md:h-[40rem] justify-center gap-10 overflow-y-auto rounded-2xl p-6 md:p-10 shadow-xl"
      ref={containerRef}
    >
      {/* Left - Content */}
      <div className="flex-1 max-w-2xl">
        {content.map((item, index) => (
          <div key={item.title + index} className="my-20 md:my-28">
            <motion.h2
              animate={{
                opacity: activeCard === index ? 1 : 0.3,
                y: activeCard === index ? 0 : 12,
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-2xl md:text-3xl font-bold text-white tracking-tight"
            >
              {item.title}
            </motion.h2>
            <motion.p
              animate={{
                opacity: activeCard === index ? 1 : 0.4,
                y: activeCard === index ? 0 : 16,
              }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="mt-6 text-base md:text-lg text-slate-300 max-w-xl leading-relaxed"
            >
              {item.description}
            </motion.p>
          </div>
        ))}
        <div className="h-40 md:h-60" />
      </div>

      {/* Right - Sticky visual */}
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-10 hidden h-64 w-80 md:h-96 md:w-96 shrink-0 overflow-hidden rounded-2xl shadow-2xl lg:flex items-center justify-center",
          contentClassName
        )}
      >
        {content[activeCard]?.content ?? (
          <div className="text-white text-xl font-medium opacity-70">
            {content[activeCard]?.title}
          </div>
        )}
      </div>
    </motion.div>
  );
};