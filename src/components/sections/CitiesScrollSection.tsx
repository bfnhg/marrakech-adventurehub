"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { moroccanCities, City } from "@/data/moroccan-cities";

export const CitiesScrollSection = () => {
  const [activeCity, setActiveCity] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end start"],
  });

  const cityCount = moroccanCities.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const breakpoints = moroccanCities.map((_, i) => i / cityCount);
    const closest = breakpoints.reduce((acc, bp, idx) => {
      return Math.abs(latest - bp) < Math.abs(latest - breakpoints[acc]) ? idx : acc;
    }, 0);
    setActiveCity(closest);
  });

  const [currentGradient, setCurrentGradient] = useState(moroccanCities[0].gradient);

  useEffect(() => {
    setCurrentGradient(moroccanCities[activeCity].gradient);
  }, [activeCity]);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide mb-4">
            🇲🇦 Explore Morocco
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Iconic Moroccan Cities
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Scroll to discover the soul, colors, and stories of Morocco’s most captivating destinations.
          </p>
        </div>

        <motion.div
          animate={{
            backgroundColor: moroccanCities[activeCity].colorTheme,
          }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="relative flex h-[480px] md:h-[620px] rounded-3xl overflow-y-auto p-6 md:p-10 shadow-2xl border border-white/5"
          ref={containerRef}
        >
          {/* Left - City descriptions */}
          <div className="flex-1 max-w-2xl lg:max-w-3xl pr-6 md:pr-12">
            {moroccanCities.map((city: City, index: number) => (
              <div key={city.title} className="mb-24 md:mb-32 last:mb-40">
                <motion.h3
                  animate={{
                    opacity: activeCity === index ? 1 : 0.35,
                    y: activeCity === index ? 0 : 16,
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6"
                >
                  {city.title}
                </motion.h3>
                <motion.p
                  animate={{
                    opacity: activeCity === index ? 1 : 0.45,
                    y: activeCity === index ? 0 : 24,
                  }}
                  transition={{ duration: 0.9, ease: "easeOut", delay: 0.12 }}
                  className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl"
                >
                  {city.description}
                </motion.p>
              </div>
            ))}
            <div className="h-48 md:h-64" />
          </div>

          {/* Right - Sticky visual card (image recommended) */}
          <div
            className={cn(
              "sticky top-12 md:top-16 hidden lg:flex h-[420px] w-[380px] xl:w-[440px] shrink-0 overflow-hidden rounded-2xl shadow-2xl border border-white/10",
              "backdrop-blur-sm transition-all duration-700"
            )}
            style={{ background: currentGradient }}
          >
            {moroccanCities[activeCity].image ? (
              <motion.img
                key={activeCity}
                src={moroccanCities[activeCity].image}
                alt={moroccanCities[activeCity].title}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/80 text-2xl font-semibold">
                {moroccanCities[activeCity].title}
              </div>
            )}

            {/* Optional subtle overlay title */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-2xl font-bold drop-shadow-lg">
                {moroccanCities[activeCity].title}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};