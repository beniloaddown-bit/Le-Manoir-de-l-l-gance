import { motion } from "framer-motion";
import { MessageCircle, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);
import logo from "@/assets/logo.png";

const getWhatsAppNumber = () => localStorage.getItem('whatsapp_number') || '221755236363';
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Bonjour, je souhaite en savoir plus sur Le Manoir de l'Élégance."
);

export const Footer = () => {
  return (
    <footer id="contact" className="bg-noir-light border-t border-primary/10">
      {/* CTA Section */}
      <div className="py-20 border-b border-primary/10">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-4">
              Prêt à vivre
              <span className="text-gradient-gold italic"> l'Élégance?</span>
            </h3>
            <p className="font-body text-foreground/60 mb-8 max-w-xl mx-auto">
              Contactez-nous sur WhatsApp pour découvrir nos créations et 
              commencer votre transformation vestimentaire.
            </p>
            <Button
              variant="whatsapp"
              size="xl"
              onClick={() =>
                window.open(
                  `https://wa.me/${getWhatsAppNumber()}?text=${WHATSAPP_MESSAGE}`,
                  "_blank"
                )
              }
            >
              <MessageCircle className="w-5 h-5" />
              <span>Discuter avec un Styliste</span>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <img
                src={logo}
                alt="Le Manoir de l'Élégance"
                className="h-16 w-auto"
              />
            </div>

            {/* Tagline */}
            <p className="font-display text-xl text-foreground/60 italic">
              "L'élégance est un art"
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <motion.a
                href="https://www.instagram.com/le_manoir_de_lelegance?igsh=YWw0c2d5cTZlZXJ1&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-primary/20 hover:border-primary hover:bg-primary/10 transition-colors duration-300"
                aria-label="Instagram"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Instagram className="w-5 h-5 text-primary" />
              </motion.a>
              <motion.a
                href="https://www.tiktok.com/@manoirelegance?_r=1&_t=ZS-93F7ma1TPdN"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-primary/20 hover:border-primary hover:bg-primary/10 transition-colors duration-300"
                aria-label="TikTok"
                whileHover={{ scale: 1.15, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <TikTokIcon className="w-5 h-5 text-primary" />
              </motion.a>
              <motion.a
                href="https://www.facebook.com/share/1Dmub997qX/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-primary/20 hover:border-primary hover:bg-primary/10 transition-colors duration-300"
                aria-label="Facebook"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Facebook className="w-5 h-5 text-primary" />
              </motion.a>
              <motion.a
                href={`https://wa.me/${getWhatsAppNumber()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-primary/20 hover:border-primary hover:bg-primary/10 transition-colors duration-300"
                aria-label="WhatsApp"
                whileHover={{ scale: 1.15, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <MessageCircle className="w-5 h-5 text-primary" />
              </motion.a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-primary/10 text-center">
            <p className="font-body text-sm text-foreground/40">
              © {new Date().getFullYear()} Le Manoir de l'Élégance. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
