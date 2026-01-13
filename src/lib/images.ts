import heroMarrakech from '@/assets/hero-marrakech.jpg';
import activityQuad from '@/assets/activity-quad.jpg';
import activityHammam from '@/assets/activity-hammam.jpg';
import activityBalloon from '@/assets/activity-balloon.jpg';
import activityCooking from '@/assets/activity-cooking.jpg';
import excursionDesert from '@/assets/excursion-desert.jpg';
import excursionOuzoud from '@/assets/excursion-ouzoud.jpg';
import excursionEssaouira from '@/assets/excursion-essaouira.jpg';
import excursionAtlas from '@/assets/excursion-atlas.jpg';

export const images: Record<string, string> = {
  'hero-marrakech': heroMarrakech,
  'activity-quad': activityQuad,
  'activity-hammam': activityHammam,
  'activity-balloon': activityBalloon,
  'activity-cooking': activityCooking,
  'excursion-desert': excursionDesert,
  'excursion-ouzoud': excursionOuzoud,
  'excursion-essaouira': excursionEssaouira,
  'excursion-atlas': excursionAtlas,
};

export const getImage = (key: string): string => {
  return images[key] || '';
};
