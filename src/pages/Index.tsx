import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Hero } from '@/components/sections/Hero';
import { ActivityCard } from '@/components/cards/ActivityCard';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { ReservationModal } from '@/components/forms/ReservationModal';
import { SEOHead, generateOrganizationSchema } from '@/components/seo/SEOHead';
import { Button } from '@/components/ui/button';
import { Activity } from '@/types/activity';
import { ActivitiesScrollSection } from '@/components/sections/ActivitiesScrollSection';
import { ArrowRight, Shield, Clock, Star, HeartHandshake } from 'lucide-react';
import activitiesData from '@/data/activities.json';
import { CitiesScrollSection } from '@/components/sections/CitiesScrollSection';
import { M } from 'vitest/dist/chunks/reporters.d.BFLkQcL6.js';
import { MarrakechAdventureGallery } from '@/components/sections/MarrakechAdventureGallery';

const Index = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  const activities = activitiesData.activities as Activity[];
  const excursions = activitiesData.excursions as Activity[];

  const handleBookNow = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  const features = [
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'All our experiences are vetted for safety and quality.',
    },
    {
      icon: Clock,
      title: 'Flexible Booking',
      description: 'Free cancellation up to 24 hours before the activity.',
    },
    {
      icon: Star,
      title: 'Expert Guides',
      description: 'Local guides with years of experience and knowledge.',
    },
    {
      icon: HeartHandshake,
      title: 'Best Price Guarantee',
      description: "Find a lower price? We'll match it.",
    },
  ];

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY === 0) {
        setShowNavbar(true); // en haut : visible
      } else {
        setShowNavbar(currentY < lastScrollY.current); // true si on remonte, false si on descend
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <SEOHead
        title="Activities & Excursions in Marrakech"
        description="Discover the magic of Marrakech with our curated activities and excursions. From desert adventures to authentic cultural experiences. Book your unforgettable Morocco trip today!"
        canonicalUrl="https://marrakech-tours.com"
        structuredData={generateOrganizationSchema()}
      />

      

      <div className={`fixed top-0 left-0 w-full z-50 h-24 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
        <Navbar />
      </div>
      <main className="relative pt-24">
        {/* Hero Section */}
        <Hero />
          {/* 🔥 Aceternity Container Scroll Animation */}
     

{/* <CitiesScrollSection /> */}
<MarrakechAdventureGallery />
        {/* Features Section */}
        {/* <LayoutTextFlipDemo /> */}
        <section className="section-padding bg-background">
          <div className="container-tourism">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section className="section-padding bg-muted/50">
          <div className="container-tourism">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
            >
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                   Popular Activities
                </span>
                <h2 className="heading-section">Unforgettable Experiences</h2>
              </div>
              <Button variant="ghost" className="self-start md:self-auto" asChild>
                <Link to="/activities">
                  View All Activities
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {activities.slice(0, 4).map((activity, index) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  index={index}
                  type="activity"
                  onBookNow={handleBookNow}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Excursions Section */}
        <section className="section-padding bg-background">
          <div className="container-tourism">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
            >
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-palm/10 text-palm text-sm font-medium mb-4">
               Day Trips & Excursions
                </span>
                <h2 className="heading-section">Explore Beyond Marrakech</h2>
              </div>
              <Button variant="ghost" className="self-start md:self-auto" asChild>
                <Link to="/excursions">
                  View All Excursions
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {excursions.slice(0, 4).map((excursion, index) => (
                <ActivityCard
                  key={excursion.id}
                  activity={excursion}
                  index={index}
                  type="excursion"
                  onBookNow={handleBookNow}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <ReviewsSection />

        {/* CTA Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-terracotta-dark to-night" />
          <div className="absolute inset-0 moroccan-pattern opacity-10" />
          
          <div className="container-tourism relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-section text-primary-foreground mb-4">
                Ready for Your Adventure?
              </h2>
              <p className="text-body-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
                Book your Marrakech experience today and create memories that last a lifetime.
                Our team is ready to help you plan the perfect trip.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="gold" size="xl" asChild>
                  <Link to="/activities">Browse Activities</Link>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activity={selectedActivity}
      />
    </>
  );
};

export default Index;
