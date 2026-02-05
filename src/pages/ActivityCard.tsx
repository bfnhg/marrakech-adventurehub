import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function ActivityCard({
  title,
  image,
  description,
  href,
}: {
  title: string;
  image: string;
  description: string;
  href: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="group relative rounded-2xl overflow-hidden bg-card border border-border shadow-lg"
    >
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>

        <Button size="sm" className="w-full">
          View details
        </Button>
      </div>
    </motion.div>
  );
}
