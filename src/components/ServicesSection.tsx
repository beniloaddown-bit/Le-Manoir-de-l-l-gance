import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Scissors, Sparkles, Briefcase, HeartHandshake } from "lucide-react";

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

export const ServicesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-32 bg-gradient-to-b from-noir-light to-background relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              hsl(43 74% 49% / 0.1) 35px,
              hsl(43 74% 49% / 0.1) 70px
            )`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-primary text-sm tracking-luxury uppercase font-body">
            Nos Services
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 mb-6">
            L'Excellence
            <span className="block text-gradient-gold italic">à votre Service</span>
          </h2>
          <div className="luxury-divider" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group text-center p-8 border border-primary/10 hover:border-primary/30 bg-background/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2"
              >
                {/* Icon */}
                <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300" />
                  <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="font-body text-foreground/60 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
