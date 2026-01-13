import { motion } from 'framer-motion';
import { Star, ExternalLink, Quote, ThumbsUp } from 'lucide-react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { SEOHead } from '@/components/seo/SEOHead';
import activitiesData from '@/data/activities.json';

export default function ReviewsPage() {
  const reviews = activitiesData.reviews;

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Marrakech Tours',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.9,
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.map((review) => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
      },
      author: {
        '@type': 'Person',
        name: review.author,
      },
      reviewBody: review.content,
    })),
  };

  return (
    <>
      <SEOHead
        title="Customer Reviews"
        description="Read authentic reviews from travelers who experienced our Marrakech tours and activities. See why we're rated 5 stars on TripAdvisor."
        canonicalUrl="https://marrakech-tours.com/reviews"
        structuredData={reviewSchema}
      />

      <Navbar />

      <main className="pt-24">
        {/* Header */}
        <section className="bg-gradient-to-b from-gold/5 to-background section-padding">
          <div className="container-tourism text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold-light text-sm font-medium mb-4">
                ⭐ Reviews
              </span>
              <h1 className="heading-display mb-4">What Our Guests Say</h1>
              <p className="text-body-lg text-muted-foreground mb-8">
                Real experiences from real travelers. Join thousands of satisfied 
                adventurers who've explored Marrakech with us.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
                <div>
                  <p className="font-serif text-4xl font-bold text-primary">4.9</p>
                  <div className="flex justify-center gap-0.5 my-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
                <div>
                  <p className="font-serif text-4xl font-bold text-primary">1,200+</p>
                  <p className="text-sm text-muted-foreground mt-2">Total Reviews</p>
                </div>
                <div>
                  <p className="font-serif text-4xl font-bold text-primary">98%</p>
                  <p className="text-sm text-muted-foreground mt-2">Recommend Us</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* TripAdvisor Banner */}
        <section className="bg-palm py-8">
          <div className="container-tourism">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                  <span className="text-3xl">🦉</span>
                </div>
                <div className="text-primary-foreground">
                  <p className="font-semibold text-lg">Excellent on TripAdvisor</p>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                      ))}
                    </div>
                    <span className="text-sm opacity-80">Certificate of Excellence 2024</span>
                  </div>
                </div>
              </div>
              <a
                href="https://tripadvisor.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 px-6 py-3 rounded-xl text-primary-foreground font-medium transition-colors"
              >
                Read on TripAdvisor
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="section-padding">
          <div className="container-tourism">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...reviews, ...reviews, ...reviews].map((review, index) => (
                <motion.article
                  key={`${review.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 6) * 0.1 }}
                  className="bg-card rounded-2xl p-6 relative shadow-card"
                >
                  <Quote className="absolute top-4 right-4 w-10 h-10 text-primary/10" />

                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'fill-gold text-gold' : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>

                  <h3 className="font-semibold mb-2">{review.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {review.content}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="font-medium text-sm">{review.author}</p>
                      <p className="text-xs text-muted-foreground">{review.location}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ThumbsUp className="w-3 h-3" />
                      <span>Helpful</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
