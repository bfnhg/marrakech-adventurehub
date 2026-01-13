import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThreeDMarquee } from '@/components/ui/3d-marquee';
import { images } from '@/lib/images';

export function Hero() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/activities?search=${encodeURIComponent(searchQuery)}`);
  };

  const marqueeImages = [
    images['activity-quad'],
    images['excursion-desert'],
    images['activity-hammam'],
    images['excursion-atlas'],
    images['activity-balloon'],
    images['excursion-essaouira'],
    images['activity-cooking'],
    images['excursion-ouzoud'],
    images['activity-quad'],
    images['excursion-desert'],
    images['activity-hammam'],
    images['excursion-atlas'],
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-night via-night/95 to-background">
      {/* Moroccan Pattern Overlay */}
      <div className="absolute inset-0 moroccan-pattern opacity-10" />

      {/* 3D Marquee Grid - Background */}
      <div className="absolute inset-0">
        <ThreeDMarquee images={marqueeImages} className="h-full" />
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-night to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-night to-transparent" />
          <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-night to-transparent" />
        </div>
      </div>

      {/* Centered Search Bar */}
      <motion.form
        onSubmit={handleSearch}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative z-20 bg-background/95 backdrop-blur-md rounded-2xl p-2 shadow-elevated w-full max-w-2xl mx-4"
      >
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <Button type="submit" variant="hero" size="lg" className="sm:w-auto">
            Explore Now
          </Button>
        </div>
      </motion.form>
    </section>
  );
}
