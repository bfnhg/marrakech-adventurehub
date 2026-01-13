"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ThreeDMarqueeProps {
  images: string[];
  className?: string;
}

export function ThreeDMarquee({ images, className }: ThreeDMarqueeProps) {
  // Split images into 4 rows
  const chunkSize = Math.ceil(images.length / 4);
  const rows = [
    images.slice(0, chunkSize),
    images.slice(chunkSize, chunkSize * 2),
    images.slice(chunkSize * 2, chunkSize * 3),
    images.slice(chunkSize * 3),
  ];

  return (
    <div
      className={cn(
        "mx-auto block h-[600px] overflow-hidden rounded-2xl [perspective:800px] [transform-style:preserve-3d]",
        className
      )}
    >
      <div
        className="flex flex-col gap-4 [transform:rotateX(25deg)_rotateY(-10deg)_rotateZ(10deg)_scale(1.2)]"
        style={{
          transformOrigin: "center center",
        }}
      >
        {rows.map((row, rowIndex) => (
          <motion.div
            key={rowIndex}
            className="flex gap-4"
            initial={{ x: rowIndex % 2 === 0 ? "0%" : "-50%" }}
            animate={{ x: rowIndex % 2 === 0 ? "-50%" : "0%" }}
            transition={{
              duration: 30 + rowIndex * 5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          >
            {/* Double the row for seamless loop */}
            {[...row, ...row, ...row].map((image, imgIndex) => (
              <div
                key={`${rowIndex}-${imgIndex}`}
                className="group relative h-32 w-48 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl md:h-40 md:w-60"
              >
                <img
                  src={image}
                  alt={`Activity ${imgIndex + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
