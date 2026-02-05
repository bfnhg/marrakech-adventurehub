"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -220]);

  const third = Math.ceil(images.length / 3);
  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <section className="section-padding bg-background">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-foreground">
        Adventures & Moments in Magical Marrakech
      </h2>

      <div
        className={cn(
          "h-[40rem] md:h-[50rem] w-full overflow-y-auto rounded-2xl",
          "bg-gradient-to-b from-background via-muted/10 to-background",
"dark:from-[#0b111c] dark:via-[#20293c]/40 dark:to-[#20293c]", // deep dark mode gradient
          "border border-border/20 dark:border-neutral-800/50",
          "scrollbar-thin scrollbar-thumb-muted-foreground/40 scrollbar-track-transparent",
          "dark:scrollbar-thumb-nesutral-700/60 dark:scrollbar-track-[#0a0a0c]",
          className
        )}
        ref={gridRef}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-6xl mx-auto gap-8 md:gap-12 py-20 md:py-40 px-6 md:px-10">
          {[firstPart, secondPart, thirdPart].map((part, colIndex) => (
            <div key={colIndex} className="grid gap-10 md:gap-12">
              {part.map((el, idx) => (
                <motion.div
                  key={`${colIndex}-${idx}`}
                  style={{ y: [translateFirst, translateSecond, translateThird][colIndex] }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: idx * 0.08 }}
                  className={cn(
                    "overflow-hidden rounded-xl border border-border/30 shadow-lg",
                    "dark:border-neutral-800 dark:shadow-black/60",
                    "ring-1 ring-offset-2 ring-offset-background dark:ring-offset-[#0a0a0c]" // respects your ring-offset-background
                  )}
                >
                  <img
                    src={el}
                    alt="Marrakech adventure"
                    className={cn(
                      "h-80 w-full object-cover transition-all duration-700",
                      "hover:scale-105 hover:brightness-110 hover:shadow-2xl",
                      "dark:brightness-85 dark:hover:brightness-105" // subtle dim + hover pop in dark mode
                    )}
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};