import { motion } from "framer-motion";
import { MessageCircle, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const WHATSAPP_NUMBER = "1234567890";
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
                  `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`,
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
              <a
                href="#"
                className="p-3 border border-primary/20 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-primary" />
              </a>
              <a
                href="#"
                className="p-3 border border-primary/20 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-primary" />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-primary/20 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-primary" />
              </a>
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
