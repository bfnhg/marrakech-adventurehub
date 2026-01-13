import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-night text-primary-foreground">
      <div className="container-tourism section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-serif font-bold text-lg">M</span>
              </div>
              <span className="font-serif text-xl font-semibold">
                Marrakech Tours
              </span>
            </Link>
            <p className="text-primary-foreground/70 mb-6">
              Discover the magic of Marrakech with our curated activities and excursions. 
              Authentic experiences, unforgettable memories.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-primary-foreground/70 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/activities" className="text-primary-foreground/70 hover:text-primary transition-colors">Activities</Link></li>
              <li><Link to="/excursions" className="text-primary-foreground/70 hover:text-primary transition-colors">Excursions</Link></li>
              <li><Link to="/reviews" className="text-primary-foreground/70 hover:text-primary transition-colors">Reviews</Link></li>
              <li><Link to="/contact" className="text-primary-foreground/70 hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Popular Activities */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Popular Activities</h4>
            <ul className="space-y-3">
              <li><Link to="/activities/quad-biking-palm-grove" className="text-primary-foreground/70 hover:text-primary transition-colors">Quad Biking</Link></li>
              <li><Link to="/activities/traditional-hammam-spa" className="text-primary-foreground/70 hover:text-primary transition-colors">Hammam & Spa</Link></li>
              <li><Link to="/activities/hot-air-balloon-sunrise" className="text-primary-foreground/70 hover:text-primary transition-colors">Hot Air Balloon</Link></li>
              <li><Link to="/excursions/sahara-desert-camel-trek" className="text-primary-foreground/70 hover:text-primary transition-colors">Sahara Desert</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-primary-foreground/70">Rue Mohammed V, Gueliz<br />Marrakech 40000, Morocco</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+212600000000" className="text-primary-foreground/70 hover:text-primary transition-colors">+212 600 000 000</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:info@marrakech-tours.com" className="text-primary-foreground/70 hover:text-primary transition-colors">info@marrakech-tours.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} Marrakech Tours. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-primary-foreground/50 hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-primary-foreground/50 hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
