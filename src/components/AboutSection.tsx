import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import bespokeImage from "@/assets/collection-bespoke.jpg";

const features = [
  {
    title: "Savoir-faire",
    description: "Des tailleurs de haut niveau, attentifs à chaque détail",
  },
  {
    title: "Passion",
    description: "L'amour du beau, transmis de génération en génération",
  },
  {
    title: "Fierté culturelle",
    description: "L'héritage africain sublimé par la haute couture",
  },
  {
    title: "Excellence",
    description: "Une attention méticuleuse pour une élégance sans pareille",
  },
];

export const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="histoire"
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-background to-noir-light overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={bespokeImage}
                alt="Artisanat de luxe africain"
                className="w-full h-full object-cover"
              />
              {/* Gold Frame Effect */}
              <div className="absolute inset-4 border border-primary/30 pointer-events-none" />
            </div>
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 text-center"
            >
              <span className="block font-display text-3xl">10+</span>
              <span className="text-xs tracking-luxury uppercase">Années d'Excellence</span>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="text-primary text-sm tracking-luxury uppercase font-body">
              Notre Histoire
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 mb-8 leading-tight">
              L'Art de
              <span className="block text-gradient-gold italic">l'Élégance Africaine</span>
            </h2>

            <div className="space-y-6 text-foreground/80 font-body text-lg leading-relaxed">
              <p>
                Imaginez des vêtements africains luxueux, confectionnés avec passion 
                par des tailleurs hautement qualifiés, méticuleux dans chaque détail 
                pour vous offrir une élégance inégalée.
              </p>
              <p>
                Que ce soit pour le bureau, une réunion importante, un mariage, 
                un baptême ou un voyage, <strong className="text-primary">Le Manoir de l'Élégance</strong> vous 
                habille avec classe et raffinement.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="group"
                >
                  <h3 className="font-display text-xl text-primary mb-2 group-hover:text-gold-light transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-foreground/60 font-body">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
