import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Clock, Users, Star, MapPin, Check, Calendar, 
  Globe, ArrowLeft, Share2, Heart 
} from 'lucide-react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { ReservationModal } from '@/components/forms/ReservationModal';
import { SEOHead, generateProductSchema } from '@/components/seo/SEOHead';
import { Button } from '@/components/ui/button';
import { Activity } from '@/types/activity';
import { getImage } from '@/lib/images';
import activitiesData from '@/data/activities.json';

interface ActivityDetailPageProps {
  type: 'activity' | 'excursion';
}

export default function ActivityDetailPage({ type }: ActivityDetailPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const items = type === 'activity' 
    ? activitiesData.activities 
    : activitiesData.excursions;
  
  const activity = items.find((a) => a.slug === slug) as Activity | undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!activity) {
    return (
      <>
        <Navbar />
        <main className="pt-24 section-padding">
          <div className="container-tourism text-center">
            <p className="text-4xl mb-4">😕</p>
            <h1 className="heading-section mb-4">Activity Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The activity you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to={type === 'activity' ? '/activities' : '/excursions'}>
                Browse {type === 'activity' ? 'Activities' : 'Excursions'}
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: activity.title,
        text: activity.shortDescription,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <SEOHead
        title={activity.title}
        description={activity.shortDescription}
        canonicalUrl={`https://marrakech-tours.com/${type === 'activity' ? 'activities' : 'excursions'}/${activity.slug}`}
        ogImage={getImage(activity.image)}
        ogType="product"
        structuredData={generateProductSchema({
          title: activity.title,
          description: activity.fullDescription,
          image: getImage(activity.image),
          price: activity.price,
          currency: activity.currency,
          rating: activity.rating,
          reviewCount: activity.reviewCount,
        })}
      />

      <Navbar />

      <main className="pt-20">
        {/* Hero Image */}
        <section className="relative h-[50vh] md:h-[60vh]">
          <img
            src={getImage(activity.image)}
            alt={activity.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/20 to-transparent" />
          
          {/* Navigation */}
          <div className="absolute top-4 left-4 right-4 flex justify-between">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate(-1)}
              className="bg-background/80 backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="icon"
                onClick={handleShare}
                className="bg-background/80 backdrop-blur-sm"
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
                className="bg-background/80 backdrop-blur-sm"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-destructive text-destructive' : ''}`} />
              </Button>
            </div>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="container-tourism">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium mb-4">
                  {activity.category}
                </span>
                <h1 className="heading-display text-primary-foreground mb-4">
                  {activity.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-primary-foreground/80">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-gold text-gold" />
                    <span className="font-semibold">{activity.rating}</span>
                    <span className="text-sm">({activity.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-5 h-5" />
                    <span>{activity.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-5 h-5" />
                    <span>Marrakech</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding">
          <div className="container-tourism">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-10">
                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="font-serif text-2xl font-semibold mb-4">About This Experience</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {activity.fullDescription}
                  </p>
                </motion.div>

                {/* Highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="font-serif text-2xl font-semibold mb-4">Highlights</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activity.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-palm/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-palm" />
                        </div>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* What's Included */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="font-serif text-2xl font-semibold mb-4">What's Included</h2>
                  <ul className="space-y-3">
                    {activity.included.map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Additional Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="font-serif text-2xl font-semibold mb-4">Additional Information</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted rounded-xl p-4">
                      <Clock className="w-6 h-6 text-primary mb-2" />
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-semibold">{activity.duration}</p>
                    </div>
                    <div className="bg-muted rounded-xl p-4">
                      <Users className="w-6 h-6 text-primary mb-2" />
                      <p className="text-sm text-muted-foreground">Group Size</p>
                      <p className="font-semibold">Max {activity.maxGroupSize}</p>
                    </div>
                    <div className="bg-muted rounded-xl p-4">
                      <Globe className="w-6 h-6 text-primary mb-2" />
                      <p className="text-sm text-muted-foreground">Languages</p>
                      <p className="font-semibold">{activity.languages.length} available</p>
                    </div>
                    <div className="bg-muted rounded-xl p-4">
                      <Calendar className="w-6 h-6 text-primary mb-2" />
                      <p className="text-sm text-muted-foreground">Availability</p>
                      <p className="font-semibold">Daily</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Booking Card */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="sticky top-24 bg-card rounded-2xl p-6 shadow-elevated"
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">From</p>
                      <p className="font-serif text-3xl font-bold text-primary">
                        €{activity.price}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">per person</p>
                  </div>

                  <div className="flex items-center gap-1 mb-6">
                    <Star className="w-4 h-4 fill-gold text-gold" />
                    <span className="font-semibold">{activity.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({activity.reviewCount} reviews)
                    </span>
                  </div>

                  <Button
                    variant="hero"
                    size="xl"
                    className="w-full mb-4"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Book Now
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Free cancellation up to 24 hours before
                  </p>

                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-sm font-medium mb-3">Available Languages</p>
                    <div className="flex flex-wrap gap-2">
                      {activity.languages.map((lang) => (
                        <span
                          key={lang}
                          className="px-3 py-1 rounded-full bg-muted text-xs font-medium"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activity={activity}
      />
    </>
  );
}
