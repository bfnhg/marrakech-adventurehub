"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export const ContainerScroll = ({
  titleComponent,
  children,
  className,
}: {
  titleComponent?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const translateY = useTransform(scrollYProgress, [0, 0.5], [80, 0]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center py-32"
    >
      <motion.div
        style={{
          rotateX,
          scale,
          y: translateY,
        }}
        className={cn(
          "relative w-full max-w-7xl rounded-[32px] bg-background shadow-2xl border border-border p-6 md:p-10 perspective-[1000px]",
          className
        )}
      >
        {titleComponent && (
          <div className="mb-10 text-center">{titleComponent}</div>
        )}
        {children}
      </motion.div>
    </div>
  );
};
