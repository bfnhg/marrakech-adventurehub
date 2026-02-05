export interface City {
  title: string;
  description: string;
  colorTheme: string;     // background color for the whole container
  gradient: string;
  image: string;          // image URL for the sticky right card
}

export const moroccanCities: City[] = [
  {
    title: "Marrakech",
    description: "The Red City – vibrant souks, Jemaa el-Fna, historic medina, Majorelle Garden.",
    colorTheme: "#7f1d1d",  // deep red
    gradient: "linear-gradient(to bottom right, #dc2626, #991b1b)",
    image: "https://images.unsplash.com/photo-1590073844006-33379778ae09?w=800&auto=format&fit=crop&q=80", // example
  },
  {
    title: "Tangier",
    description: "Gateway to Africa – Mediterranean charm, beaches, Kasbah, diverse culture.",
    colorTheme: "#1e40af",  // deep blue
    gradient: "linear-gradient(to bottom right, #3b82f6, #1d4ed8)",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80", // example
  },
  {
    title: "Casablanca",
    description: "Economic heart – modern skyline, Hassan II Mosque, vibrant corniche.",
    colorTheme: "#f5f5f5",  // near-white / light gray
    gradient: "linear-gradient(to bottom right, #e5e7eb, #d1d5db)",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80", // example
  },
  // Add more cities here...
];