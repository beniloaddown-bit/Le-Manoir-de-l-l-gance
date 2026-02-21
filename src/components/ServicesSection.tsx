import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Scissors, Sparkles, Briefcase, HeartHandshake, LucideIcon } from "lucide-react";

const services = [
  {
    icon: Scissors,
    title: "Vêtements Sur Mesure",
    description:
      "Création de tenues africaines de luxe, taillées selon vos mesures exactes avec les plus beaux tissus.",
  },
  {
    icon: Sparkles,
    title: "Créations Événementielles",
    description:
      "Tenues uniques pour mariages, baptêmes et cérémonies, sublimées par des broderies raffinées.",
  },
  {
    icon: Briefcase,
    title: "Tenues Professionnelles",
    description:
      "Élégance au bureau avec des costumes et ensembles alliant style africain et codes professionnels.",
  },
  {
    icon: HeartHandshake,
    title: "Conseils en Style",
    description:
      "Accompagnement personnalisé pour trouver les tenues parfaites selon votre morphologie et vos envies.",
  },
];

interface ServiceCardProps {
  service: {
    icon: LucideIcon;
    title: string;
    description: string;
  };
  index: number;
  isInView: boolean;
}

const ServiceCard = ({ service, index, isInView }: ServiceCardProps) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
      className="group text-center p-8 border border-primary/10 hover:border-primary/40 bg-background/50 backdrop-blur-sm transition-all duration-500 relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle at center, hsl(43 74% 49% / 0.08) 0%, transparent 70%)",
        }}
      />

      <motion.div 
        className="relative inline-flex items-center justify-center w-20 h-20 mb-6"
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
      >
        <motion.div 
          className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300"
          whileHover={{ rotate: 45, scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
        <Icon className="w-8 h-8 text-primary relative z-10 group-hover:scale-110 transition-transform duration-300" />
        
        <motion.div
          className="absolute w-2 h-2 bg-primary rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ top: "-4px", left: "50%", transformOrigin: "0 44px" }}
        />
      </motion.div>

      <motion.h3 
        className="font-display text-xl text-foreground mb-4 group-hover:text-primary transition-colors duration-300 relative z-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.4 }}
      >
        {service.title}
      </motion.h3>
      <motion.p 
        className="font-body text-foreground/60 text-sm leading-relaxed relative z-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.5 }}
      >
        {service.description}
      </motion.p>

      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
        initial={{ width: "0%", left: "50%" }}
        whileHover={{ width: "100%", left: "0%" }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

export const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const patternY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const patternOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.03, 0.08, 0.03]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-32 bg-gradient-to-b from-noir-light to-background relative overflow-hidden scroll-mt-24"
    >
      <motion.div 
        className="absolute inset-0"
        style={{ y: patternY, opacity: patternOpacity }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              hsl(43 74% 49% / 0.15) 35px,
              hsl(43 74% 49% / 0.15) 70px
            )`,
          }}
        />
      </motion.div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border border-primary/10 rounded-full"
            style={{
              left: `${20 + i * 25}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.span 
            className="text-primary text-sm tracking-luxury uppercase font-body inline-block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            Nos Services
          </motion.span>
          <motion.h2 
            className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            L'Excellence
            <motion.span 
              className="block text-gradient-gold italic"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              à votre Service
            </motion.span>
          </motion.h2>
          <motion.div 
            className="luxury-divider"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.title} 
              service={service} 
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
