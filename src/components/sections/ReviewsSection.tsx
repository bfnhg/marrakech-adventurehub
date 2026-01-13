import { motion } from 'framer-motion';
import { Star, ExternalLink, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import activitiesData from '@/data/activities.json';

export function ReviewsSection() {
  const reviews = activitiesData.reviews;

  return (
    <section className="section-padding bg-cream moroccan-pattern">
      <div className="container-tourism">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold-light text-sm font-medium mb-4">
            ⭐ Traveler Reviews
          </span>
          <h2 className="heading-section mb-4">What Our Guests Say</h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from real travelers. See why thousands choose us for their Marrakech adventures.
          </p>
        </motion.div>

        {/* TripAdvisor Widget Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-background rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-palm/10 flex items-center justify-center">
              <span className="text-3xl">🦉</span>
            </div>
            <div>
              <p className="font-semibold text-lg">Excellent on TripAdvisor</p>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">Based on 1,200+ reviews</span>
              </div>
            </div>
          </div>
          <a
            href="https://tripadvisor.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-palm font-medium hover:underline"
          >
            Read all reviews
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {reviews.map((review, index) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background rounded-2xl p-6 relative"
            >
              <Quote className="absolute top-4 right-4 w-10 h-10 text-primary/10" />
              
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? 'fill-gold text-gold' : 'text-muted'}`}
                  />
                ))}
              </div>

              <h4 className="font-semibold mb-2">{review.title}</h4>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {review.content}
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{review.author}</p>
                  <p className="text-xs text-muted-foreground">{review.location}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(review.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button variant="default" size="lg" asChild>
            <Link to="/reviews">Read All Reviews</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
