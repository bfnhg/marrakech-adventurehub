import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { ActivityCard } from '@/components/cards/ActivityCard';
import { ActivityFilters } from '@/components/filters/ActivityFilters';
import { ReservationModal } from '@/components/forms/ReservationModal';
import { SEOHead } from '@/components/seo/SEOHead';
import { Activity, FilterCategory, PriceRange, DurationFilter } from '@/types/activity';
import activitiesData from '@/data/activities.json';

export default function ExcursionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [selectedPrice, setSelectedPrice] = useState<PriceRange>('all');
  const [selectedDuration, setSelectedDuration] = useState<DurationFilter>('all');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const excursions = activitiesData.excursions as Activity[];
  const categories = [...new Set(excursions.map((a) => a.category))];

  const filteredExcursions = useMemo(() => {
    return excursions.filter((excursion) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          excursion.title.toLowerCase().includes(query) ||
          excursion.shortDescription.toLowerCase().includes(query) ||
          excursion.category.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && excursion.category !== selectedCategory) {
        return false;
      }

      // Price filter
      if (selectedPrice !== 'all') {
        if (selectedPrice === 'budget' && excursion.price >= 50) return false;
        if (selectedPrice === 'mid' && (excursion.price < 50 || excursion.price > 100)) return false;
        if (selectedPrice === 'premium' && excursion.price <= 100) return false;
      }

      // Duration filter
      if (selectedDuration !== 'all') {
        const minutes = excursion.durationMinutes;
        if (selectedDuration === 'short' && minutes >= 180) return false;
        if (selectedDuration === 'half-day' && (minutes < 180 || minutes > 360)) return false;
        if (selectedDuration === 'full-day' && (minutes < 360 || minutes > 720)) return false;
        if (selectedDuration === 'multi-day' && minutes <= 720) return false;
      }

      return true;
    });
  }, [excursions, searchQuery, selectedCategory, selectedPrice, selectedDuration]);

  const handleBookNow = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  return (
    <>
      <SEOHead
        title="Excursions from Marrakech"
        description="Explore beyond Marrakech with our day trips and multi-day excursions. Visit the Sahara Desert, Ouzoud Waterfalls, Essaouira, and the Atlas Mountains."
        canonicalUrl="https://marrakech-tours.com/excursions"
      />

      <Navbar />

      <main className="pt-24">
        {/* Header */}
        <section className="bg-gradient-to-b from-palm/5 to-background section-padding">
          <div className="container-tourism">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-palm/10 text-palm text-sm font-medium mb-4">
                🗺️ Excursions
              </span>
              <h1 className="heading-display mb-4">Day Trips & Excursions</h1>
              <p className="text-body-lg text-muted-foreground">
                Venture beyond Marrakech and discover Morocco's stunning landscapes. 
                From the Sahara Desert to coastal Essaouira, adventure awaits.
              </p>
            </motion.div>

            <ActivityFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedPrice={selectedPrice}
              onPriceChange={setSelectedPrice}
              selectedDuration={selectedDuration}
              onDurationChange={setSelectedDuration}
              categories={categories}
            />
          </div>
        </section>

        {/* Excursions Grid */}
        <section className="section-padding bg-background">
          <div className="container-tourism">
            {filteredExcursions.length > 0 ? (
              <>
                <p className="text-muted-foreground mb-6">
                  Showing {filteredExcursions.length} {filteredExcursions.length === 1 ? 'excursion' : 'excursions'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredExcursions.map((excursion, index) => (
                    <ActivityCard
                      key={excursion.id}
                      activity={excursion}
                      index={index}
                      type="excursion"
                      onBookNow={handleBookNow}
                    />
                  ))}
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-4xl mb-4">🔍</p>
                <h3 className="font-serif text-xl font-semibold mb-2">No excursions found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search terms.
                </p>
              </motion.div>
            )}
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
}
