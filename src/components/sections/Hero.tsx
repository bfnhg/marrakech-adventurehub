import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
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

  // Get all activity and excursion images for the marquee
  const marqueeImages = [
    images['activity-quad'],
    images['excursion-desert'],
    images['activity-hammam'],
    images['excursion-atlas'],
    images['activity-balloon'],
    images['excursion-essaouira'],
    images['activity-cooking'],
    images['excursion-ouzoud'],
    // Duplicate for more variety in the grid
    images['activity-quad'],
    images['excursion-desert'],
    images['activity-hammam'],
    images['excursion-atlas'],
  ];

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-b from-night via-night/95 to-background">
      {/* Moroccan Pattern Overlay */}
      <div className="absolute inset-0 moroccan-pattern opacity-10" />

      {/* Top Content */}
      <div className="relative z-10 container-tourism text-center pt-32 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-sm font-medium mb-6 text-primary-foreground"
          >
            ✨ #1 Rated Tours in Marrakech
          </motion.span>

          <h1 className="heading-display mb-6 text-primary-foreground">
            Discover the Magic of{' '}
            <span className="text-gold">Marrakech</span>
          </h1>

          <p className="text-body-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Unforgettable adventures await. From thrilling desert excursions to authentic cultural experiences, 
            we curate the finest activities in Morocco's red city.
          </p>

          {/* Search Bar */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-background/95 backdrop-blur-md rounded-2xl p-2 shadow-elevated max-w-3xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-2">
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
              <Button type="submit" variant="hero" size="lg" className="md:w-auto">
                Explore Now
              </Button>
            </div>
          </motion.form>
        </motion.div>
      </div>

      {/* 3D Marquee Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="relative flex-1 mt-8"
      >
        <ThreeDMarquee images={marqueeImages} className="h-[500px] md:h-[550px]" />
        
        {/* Gradient overlays for smooth edges */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-night to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-night to-transparent" />
          <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-night to-transparent" />
        </div>
      </motion.div>

      {/* Quick Stats - Now at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 pb-12 pt-4"
      >
        <div className="container-tourism flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-gold" />
            </div>
            <div className="text-left">
              <p className="font-bold text-2xl text-foreground">50+</p>
              <p className="text-sm text-muted-foreground">Unique Experiences</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-gold" />
            </div>
            <div className="text-left">
              <p className="font-bold text-2xl text-foreground">10K+</p>
              <p className="text-sm text-muted-foreground">Happy Travelers</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-gold" />
            </div>
            <div className="text-left">
              <p className="font-bold text-2xl text-foreground">5+</p>
              <p className="text-sm text-muted-foreground">Years Experience</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
