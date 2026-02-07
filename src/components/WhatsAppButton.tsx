import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const getWhatsAppNumber = () => localStorage.getItem('whatsapp_number') || '221775236363';
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Bonjour, je souhaite découvrir les créations du Manoir de l'Élégance."
);

export const WhatsAppButton = () => {
  return (
    <motion.a
      href={`https://wa.me/${getWhatsAppNumber()}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.5, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] text-white px-6 py-4 shadow-lg hover:shadow-xl transition-shadow duration-300 group"
      aria-label="Contacter sur WhatsApp"
    >
      <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
      <span className="hidden sm:inline font-body text-sm tracking-wide uppercase">
        Discuter
      </span>
      
      {/* Pulse Effect */}
      <span className="absolute inset-0 bg-[#25D366] animate-ping opacity-30 -z-10" />
    </motion.a>
  );
};
