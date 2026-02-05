"use client";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion"; // on garde motion si tu veux mais plus obligatoire ici
import { Menu, X, Phone, Moon, Sun, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", labelKey: "nav.home" },
  { href: "/activities", labelKey: "nav.activities" },
  { href: "/excursions", labelKey: "nav.excursions" },
  { href: "/reviews", labelKey: "nav.reviews" },
  { href: "/contact", labelKey: "nav.contact" },
];

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();

  // Effet blur + ombre au scroll
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu mobile quand on change de page
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header
      className={cn(
        "fixed top-4 left-4 right-4 z-[5000] transition-all duration-300",
        isScrolled
          ? "py-3 scale-[0.98] shadow-elevated"
          : "py-4 shadow-card"
      )}
    >
      <nav
        className={cn(
          "container-tourism mx-auto rounded-2xl transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur-md border border-border/40"
            : "bg-background/80 backdrop-blur-sm border border-border/20"
        )}
      >
        <div className="flex items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-lg">
                M
              </span>
            </div>
            <span className="font-serif text-xl font-semibold">
              Marrakech Tours
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-foreground"
                )}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </div>

          {/* Right Actions - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                  >
                    {lang.flag} {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 dark:hidden" />
              <Moon className="h-5 w-5 hidden dark:block" />
            </Button>

            <a href="tel:+212600000000" className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4" />
              +212 600 000 000
            </a>

            <Button asChild>
              <Link to="/activities">{t("nav.bookNow")}</Link>
            </Button>
          </div>

          {/* Mobile right icons */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 dark:hidden" />
              <Moon className="h-5 w-5 hidden dark:block" />
            </Button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t mt-3 px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}