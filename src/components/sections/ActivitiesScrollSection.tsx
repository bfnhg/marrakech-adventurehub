"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { ActivityCard } from "@/pages/ActivityCard";

const items = [
  {
    title: "Agafay Desert",
    image: "/images/agafay.jpg",
    description: "Luxury desert experience near Marrakech",
  },
  {
    title: "Atlas Mountains",
    image: "/images/atlas.jpg",
    description: "Breathtaking mountain excursion",
  },
  {
    title: "Quad Biking",
    image: "/images/quad.jpg",
    description: "Thrilling quad adventure",
  },
  {
    title: "Hot Air Balloon",
    image: "/images/balloon.jpg",
    description: "Sunrise balloon flight over Marrakech",
  },
];

export function ActivitiesScrollSection() {
  return (
    <ContainerScroll
      titleComponent={
        <>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Activities & Excursions
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover the best experiences Marrakech has to offer
          </p>
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <ActivityCard
            key={item.title}
            title={item.title}
            image={item.image}
            description={item.description}
            href="/activities"
          />
        ))}
      </div>
    </ContainerScroll>
  );
}
