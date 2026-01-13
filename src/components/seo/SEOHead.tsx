import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  structuredData?: object;
}

export function SEOHead({
  title,
  description,
  canonicalUrl,
  ogImage = '/og-image.jpg',
  ogType = 'website',
  structuredData,
}: SEOHeadProps) {
  const siteTitle = 'Marrakech Tours - Activities & Excursions';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  useEffect(() => {
    // Set document title
    document.title = fullTitle;

    // Set meta tags
    const setMetaTag = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    setMetaTag('description', description);

    // Open Graph
    setMetaTag('og:title', fullTitle, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:image', ogImage, true);
    if (canonicalUrl) {
      setMetaTag('og:url', canonicalUrl, true);
    }

    // Twitter Card
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', fullTitle);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage);

    // Canonical URL
    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonicalUrl);
    }

    // Structured Data
    if (structuredData) {
      let script = document.querySelector('#structured-data') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.id = 'structured-data';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
  }, [fullTitle, description, canonicalUrl, ogImage, ogType, structuredData]);

  return null;
}

// Structured data generators
export function generateTouristAttractionSchema(activity: {
  title: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: activity.title,
    description: activity.description,
    image: activity.image,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: activity.rating,
      reviewCount: activity.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Marrakech',
      addressCountry: 'MA',
    },
  };
}

export function generateProductSchema(activity: {
  title: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: activity.title,
    description: activity.description,
    image: activity.image,
    offers: {
      '@type': 'Offer',
      price: activity.price,
      priceCurrency: activity.currency,
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: activity.rating,
      reviewCount: activity.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Marrakech Tours',
    description: 'Premium tourism agency offering activities and excursions in Marrakech, Morocco',
    url: 'https://marrakech-tours.com',
    logo: 'https://marrakech-tours.com/logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rue Mohammed V, Gueliz',
      addressLocality: 'Marrakech',
      postalCode: '40000',
      addressCountry: 'MA',
    },
    telephone: '+212600000000',
    email: 'info@marrakech-tours.com',
    sameAs: [
      'https://instagram.com/marrakech-tours',
      'https://facebook.com/marrakech-tours',
    ],
  };
}
