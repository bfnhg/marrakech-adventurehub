import { motion } from 'framer-motion';
import { Clock, Users, Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Activity } from '@/types/activity';
import { getImage } from '@/lib/images';

interface ActivityCardProps {
  activity: Activity;
  index: number;
  type: 'activity' | 'excursion';
  onBookNow: (activity: Activity) => void;
}

export function ActivityCard({ activity, index, type, onBookNow }: ActivityCardProps) {
  const detailPath = type === 'activity' 
    ? `/activities/${activity.slug}` 
    : `/excursions/${activity.slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card-tourism group flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={getImage(activity.image)}
          alt={activity.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/60 to-transparent" />
        
        {/* Category Badge */}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
          {activity.category}
        </span>

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-background/90 backdrop-blur-sm">
          <Star className="w-3.5 h-3.5 fill-gold text-gold" />
          <span className="text-xs font-semibold">{activity.rating}</span>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 right-4 text-right">
          <p className="text-primary-foreground text-sm opacity-80">From</p>
          <p className="text-primary-foreground font-bold text-2xl">
            €{activity.price}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-serif text-xl font-semibold mb-2 line-clamp-2">
          {activity.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
          {activity.shortDescription}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 mb-5 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-primary" />
            <span>{activity.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-primary" />
            <span>Max {activity.maxGroupSize}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Marrakech</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button 
            variant="default" 
            className="flex-1"
            onClick={() => onBookNow(activity)}
          >
            Book Now
          </Button>
          <Button variant="secondary" asChild>
            <Link to={detailPath}>Details</Link>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
