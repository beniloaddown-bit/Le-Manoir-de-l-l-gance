import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";
import { useRef } from "react";

const WHATSAPP_NUMBER = "221775236363";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Bonjour, je souhaite découvrir les créations du Manoir de l'Élégance."
);

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 0.8]);

  return (
    <section
      id="accueil"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: imageY, scale: imageScale }}
      >
        <motion.img
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={heroImage}
          alt="Le Manoir de l'Élégance - Mode Africaine de Luxe"
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      {/* Dynamic Overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />

      {/* Animated gold particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      {/* Content with Parallax */}
      <motion.div 
        className="relative z-10 container mx-auto px-6 text-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="luxury-divider mb-8"
          />

          {/* Brand Name with letter animation */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium mb-6 leading-tight overflow-hidden">
            <motion.span 
              className="block text-foreground"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Le Manoir
            </motion.span>
            <motion.span 
              className="block text-gradient-gold italic"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              de l'Élégance
            </motion.span>
          </h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="font-body text-xl sm:text-2xl md:text-3xl text-foreground/80 mb-12 tracking-wide"
          >
            Vivez l'élégance, partout où vous allez.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="whatsapp"
                size="xl"
                className="group"
                onClick={() =>
                  window.open(
                    `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`,
                    "_blank"
                  )
                }
              >
                <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>Commander via WhatsApp</span>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button variant="luxury" size="xl" asChild>
                <a href="#collections">
                  <span>Découvrir nos créations</span>
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator with enhanced animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#histoire"
          className="flex flex-col items-center gap-2 text-foreground/50 hover:text-primary transition-colors group"
        >
          <motion.span 
            className="text-xs tracking-luxury uppercase font-body"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Découvrir
          </motion.span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 group-hover:text-primary transition-colors" />
          </motion.div>
        </motion.a>
      </motion.div>
    </section>
  );
};
