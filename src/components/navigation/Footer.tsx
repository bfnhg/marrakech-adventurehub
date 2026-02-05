import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-night text-white">
      <div className="container-tourism section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-serif font-bold text-lg">M</span>
              </div>
              <span className="font-serif text-xl font-semibold">
                Marrakech Tours
              </span>
            </Link>

            <p className="text-white/70 mb-6">
              Discover the magic of Marrakech with our curated activities and excursions.
              Authentic experiences, unforgettable memories.
            </p>

            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/activities', label: 'Activities' },
                { to: '/excursions', label: 'Excursions' },
                { to: '/reviews', label: 'Reviews' },
                { to: '/contact', label: 'Contact' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-white/70 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Activities */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-white">
              Popular Activities
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/activities/quad-biking-palm-grove"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Quad Biking
                </Link>
              </li>
              <li>
                <Link
                  to="/activities/traditional-hammam-spa"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Hammam & Spa
                </Link>
              </li>
              <li>
                <Link
                  to="/activities/hot-air-balloon-sunrise"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Hot Air Balloon
                </Link>
              </li>
              <li>
                <Link
                  to="/excursions/sahara-desert-camel-trek"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Sahara Desert
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-white">
              Contact Us
            </h4>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-white/70">
                  Rue Mohammed V, Gueliz <br />
                  Marrakech 40000, Morocco
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a
                  href="tel:+212600000000"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  +212 600 000 000
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a
                  href="mailto:info@marrakech-tours.com"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  info@marrakech-tours.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Marrakech Tours. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <Link
              to="/privacy"
              className="text-white/50 hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-white/50 hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
