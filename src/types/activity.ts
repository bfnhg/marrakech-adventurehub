export interface Activity {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  price: number;
  currency: string;
  duration: string;
  durationMinutes: number;
  rating: number;
  reviewCount: number;
  image: string;
  highlights: string[];
  included: string[];
  maxGroupSize: number;
  languages: string[];
}

export interface Review {
  id: number;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  activityId: string;
  tripAdvisorLink: string;
}

export interface ReservationFormData {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  numberOfPeople: number;
  message: string;
  activityId: string;
  activityTitle: string;
}

export type FilterCategory = 'all' | string;
export type PriceRange = 'all' | 'budget' | 'mid' | 'premium';
export type DurationFilter = 'all' | 'short' | 'half-day' | 'full-day' | 'multi-day';
