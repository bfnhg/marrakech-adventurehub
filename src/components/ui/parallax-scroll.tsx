// components/ui/parallax-scroll.tsx
"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const gridRef = useRef<any>(null);
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) setColumns(1);
      else if (window.innerWidth < 1024) setColumns(2);
      else setColumns(3);
    };
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const { scrollYProgress } = useScroll();

  const third = Math.ceil(images.length / 3);
  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className={cn("w-full items-start overflow-y-auto", className)} ref={gridRef}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-6 px-4 py-20 md:grid-cols-2 lg:grid-cols-3">
        <div className="grid gap-6">
          {firstPart.map((el, idx) => (
            <motion.div style={{ y: translateFirst }} key={"grid-1" + idx}>
              <img
                src={el}
                className="h-full w-full object-cover object-center rounded-lg !m-0 !p-0"
                height="600"
                width="600"
                alt="marrakech gallery"
                loading="lazy"
                draggable={false}
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-6">
          {secondPart.map((el, idx) => (
            <motion.div style={{ y: translateSecond }} key={"grid-2" + idx}>
              <img
                src={el}
                className="h-full w-full object-cover object-center rounded-lg !m-0 !p-0"
                height="600"
                width="600"
                alt="marrakech gallery"
                loading="lazy"
                draggable={false}
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-6">
          {thirdPart.map((el, idx) => (
            <motion.div style={{ y: translateThird }} key={"grid-3" + idx}>
              <img
                src={el}
                className="h-full w-full object-cover object-center rounded-lg !m-0 !p-0"
                height="600"
                width="600"
                alt="marrakech gallery"
                loading="lazy"
                draggable={false}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};