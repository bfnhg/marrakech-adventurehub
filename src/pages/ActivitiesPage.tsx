import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { ActivityCard } from '@/components/cards/ActivityCard';
import { ActivityFilters } from '@/components/filters/ActivityFilters';
import { ReservationModal } from '@/components/forms/ReservationModal';
import { SEOHead } from '@/components/seo/SEOHead';
import { Activity, FilterCategory, PriceRange, DurationFilter } from '@/types/activity';
import activitiesData from '@/data/activities.json';

export default function ActivitiesPage() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [selectedPrice, setSelectedPrice] = useState<PriceRange>('all');
  const [selectedDuration, setSelectedDuration] = useState<DurationFilter>('all');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activities = activitiesData.activities as Activity[];
  const categories = [...new Set(activities.map((a) => a.category))];

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          activity.title.toLowerCase().includes(query) ||
          activity.shortDescription.toLowerCase().includes(query) ||
          activity.category.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && activity.category !== selectedCategory) {
        return false;
      }

      // Price filter
      if (selectedPrice !== 'all') {
        if (selectedPrice === 'budget' && activity.price >= 50) return false;
        if (selectedPrice === 'mid' && (activity.price < 50 || activity.price > 100)) return false;
        if (selectedPrice === 'premium' && activity.price <= 100) return false;
      }

      // Duration filter
      if (selectedDuration !== 'all') {
        const minutes = activity.durationMinutes;
        if (selectedDuration === 'short' && minutes >= 180) return false;
        if (selectedDuration === 'half-day' && (minutes < 180 || minutes > 360)) return false;
        if (selectedDuration === 'full-day' && (minutes < 360 || minutes > 720)) return false;
        if (selectedDuration === 'multi-day' && minutes <= 720) return false;
      }

      return true;
    });
  }, [activities, searchQuery, selectedCategory, selectedPrice, selectedDuration]);

  const handleBookNow = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  return (
    <>
      <SEOHead
        title="Activities in Marrakech"
        description="Explore our curated selection of activities in Marrakech. From quad biking adventures to traditional hammam experiences and cooking classes."
        canonicalUrl="https://marrakech-tours.com/activities"
      />

      <Navbar />

      <main className="pt-24">
        {/* Header */}
        <section className="bg-gradient-to-b from-primary/5 to-background section-padding">
          <div className="container-tourism">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                🎯 Activities
              </span>
              <h1 className="heading-display mb-4">Marrakech Activities</h1>
              <p className="text-body-lg text-muted-foreground">
                Discover authentic experiences in the Red City. From adrenaline-pumping adventures 
                to relaxing wellness retreats, we have something for everyone.
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

        {/* Activities Grid */}
        <section className="section-padding bg-background">
          <div className="container-tourism">
            {filteredActivities.length > 0 ? (
              <>
                <p className="text-muted-foreground mb-6">
                  Showing {filteredActivities.length} {filteredActivities.length === 1 ? 'activity' : 'activities'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredActivities.map((activity, index) => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      index={index}
                      type="activity"
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
                <h3 className="font-serif text-xl font-semibold mb-2">No activities found</h3>
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
