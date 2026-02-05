// components/sections/FeaturesSection.tsx
"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Shield, Clock, Star, HeartHandshake } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Types
type Feature = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

const features: Feature[] = [
  { icon: Shield, title: "Safe & Secure", description: "All our experiences are vetted for safety and quality." },
  { icon: Clock, title: "Flexible Booking", description: "Free cancellation up to 24 hours before the activity." },
  { icon: Star, title: "Expert Guides", description: "Local guides with years of experience and knowledge." },
  { icon: HeartHandshake, title: "Best Price Guarantee", description: "Find a lower price? We'll match it." },
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-background">
      <div className="container-tourism mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            What Makes Us Different
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const Icon = feature.icon;
  const ref = useRef<HTMLDivElement>(null);

  // Valeurs pour le tilt (suivi souris)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring pour un mouvement doux/physique
  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), springConfig);

  // Shine / gloss (suivi souris)
  const shineOpacity = useTransform(y, [-100, 100], [0.3, 0]);
  const shineX = useTransform(x, [-100, 100], ["-100%", "200%"]);
  const shineY = useTransform(y, [-100, 100], ["-100%", "200%"]);

  // Scale + élévation au hover
  const scale = useSpring(useTransform(y, [-100, 100], [1.02, 1.05]), springConfig);
  const zIndex = useTransform(y, [-100, 100], [10, 20]);

  useEffect(() => {
    if (!ref.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    ref.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ref.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      style={{ perspective: 1000, scale, zIndex }}
      className="relative group h-full"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative h-full rounded-2xl overflow-hidden border bg-gradient-to-br from-card to-card/90",
          "shadow-xl shadow-black/10 dark:shadow-black/40",
          "transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-primary/25"
        )}
      >
        {/* Shine overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100"
          style={{
            opacity: shineOpacity,
            backgroundPosition: useTransform([shineX, shineY], ([x, y]) => `${x} ${y}`),
          }}
        />

        <CardContent className="relative z-10 flex flex-col items-center text-center p-8 h-full transform-gpu">
          {/* Icône avec profondeur */}
          <motion.div
            className="relative mb-6"
            style={{ translateZ: 40 }} // profondeur Z
          >
            <div className="absolute inset-0 rounded-full bg-primary/5 blur-xl scale-150 opacity-0 group-hover:opacity-70 transition-opacity duration-700" />
            <div className="relative z-10 w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Icon className="w-10 h-10 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
            </div>
          </motion.div>

          {/* Titre + texte avec léger parallax Z */}
          <motion.h3
            className="text-xl font-semibold mb-3"
            style={{ translateZ: 20 }}
          >
            {feature.title}
          </motion.h3>
          <motion.p
            className="text-muted-foreground text-sm leading-relaxed"
            style={{ translateZ: 10 }}
          >
            {feature.description}
          </motion.p>
        </CardContent>
      </motion.div>
    </motion.div>
  );
}