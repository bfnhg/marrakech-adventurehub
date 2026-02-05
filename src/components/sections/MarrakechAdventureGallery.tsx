"use client";

import { ParallaxScroll } from "@/components/ui/parallax-scroll"; // ton chemin

export function MarrakechAdventureGallery() {
  return (
    <section className="w-full min-h-screen py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background to-muted/20">
      {/* Titre */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-amber-900 dark:text-amber-100 tracking-tight">
          Adventures & Moments in Magical Marrakech
        </h2>
        <p className="mt-4 text-center text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">
          Explorez les souks vibrants, les couchers de soleil dorés, les aventures palpitantes et les riads cachés qui rendent Marrakech inoubliable.
        </p>
      </div>

      {/* Galerie avec scroll garanti */}
      <div className="w-full overflow-y-auto overscroll-contain">
        <ParallaxScroll
          images={marrakechImages}
          className="
            min-h-[100px] md:min-h-[1000px] lg:min-h-[1200px]   /* ← clé : hauteur minimale suffisante pour forcer le scroll */
            w-full px-2 sm:px-4 md:px-6 lg:px-10
           pb-6 md:pb-10 lg:pb-12         /* espace en bas pour voir la fin */
          "
        />
      </div>
    </section>
  );
}

// Tes images (inchangées)
const marrakechImages = [
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/7e/75/fc/caption.jpg?w=1200&h=-1&s=1",
  "https://stayhere.ma/wp-content/uploads/2023/08/ce3715552d.webp",
  "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/07/8f/38/2d.jpg",
  "https://explore-live.s3.eu-west-1.amazonaws.com/medialibraries/explore/blog-images/2020%2001%20january/87887.jpg",
  "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/09/11/48/a4.jpg",
  "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/10/6f/62/04.jpg",
  "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/13/a3/08/8f.jpg",
  "https://media.tacdn.com/media/attractions-splice-spp-674x446/12/45/78/f3.jpg",
  "https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/52/f4/e8.jpg",
  "https://www.marrakech-desert-trips.com/wp-content/uploads/2023/12/Marrakech-balloon-ride.jpg",
  "https://www.blondieinmorocco.com/wp-content/uploads/2025/07/Jemaa-el-fna-square-medina-marrakech-food-stands.jpg",
  "https://i0.wp.com/www.toonsarah-travels.blog/wp-content/uploads/2021/12/31-Marrakech-Sept-2016-Jemaa-el-Fnaa.jpg?fit=2451%2C1380&ssl=1",
  "https://www.marrakech-desert-trips.com/wp-content/uploads/2023/07/quad-biking-Marrakech-1.jpg",
  "https://images.squarespace-cdn.com/content/v1/5b3fe49df8370a3a890259e8/a10193e9-3ef6-4eaa-81c4-d71a7378a4e7/riad-be-marrakech-hotel.jpg",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/f8/78/0b/patio.jpg?w=900&h=500&s=1",
];