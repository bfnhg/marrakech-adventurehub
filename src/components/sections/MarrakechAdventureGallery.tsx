"use client";
import { ParallaxScroll } from "../ui/parallax-scroll"; // Adjust path as needed

export function MarrakechAdventureGallery() {
  return (
    <div className="py-16 bg-gradient-to-b">
      {/* <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-amber-900">
        Adventures & Moments in Magical Marrakech
      </h2> */}
      
      <ParallaxScroll images={marrakechImages} className="h-[50rem] md:h-[60rem]" />
    </div>
  );
}

const marrakechImages = [
  // Vibrant Souks (color explosion)
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/7e/75/fc/caption.jpg?w=1200&h=-1&s=1",
  "https://stayhere.ma/wp-content/uploads/2023/08/ce3715552d.webp",
  "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/07/8f/38/2d.jpg",
  "https://explore-live.s3.eu-west-1.amazonaws.com/medialibraries/explore/blog-images/2020%2001%20january/87887.jpg",

  // Sunset Camel Rides in Agafay Desert
  "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/09/11/48/a4.jpg",
  "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/10/6f/62/04.jpg",
  "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/13/a3/08/8f.jpg",

  // Sunrise Hot Air Balloon over Atlas Mountains
  "https://media.tacdn.com/media/attractions-splice-spp-674x446/12/45/78/f3.jpg",
  "https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/52/f4/e8.jpg",
  "https://www.marrakech-desert-trips.com/wp-content/uploads/2023/12/Marrakech-balloon-ride.jpg",

  // Jemaa el-Fnaa Square magic (day & night vibes)
  "https://www.blondieinmorocco.com/wp-content/uploads/2025/07/Jemaa-el-fna-square-medina-marrakech-food-stands.jpg",
  "https://i0.wp.com/www.toonsarah-travels.blog/wp-content/uploads/2021/12/31-Marrakech-Sept-2016-Jemaa-el-Fnaa.jpg?fit=2451%2C1380&ssl=1",

  // Quad Biking Adventure in the Desert
  "https://www.marrakech-desert-trips.com/wp-content/uploads/2023/07/quad-biking-Marrakech-1.jpg",

  // Beautiful Riad Courtyards (peaceful luxury)
  "https://images.squarespace-cdn.com/content/v1/5b3fe49df8370a3a890259e8/a10193e9-3ef6-4eaa-81c4-d71a7378a4e7/riad-be-marrakech-hotel.jpg",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/f8/78/0b/patio.jpg?w=900&h=500&s=1",
];