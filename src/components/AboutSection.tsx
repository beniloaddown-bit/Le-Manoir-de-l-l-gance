import { motion, useScroll, useTransform } from "framer-motion";
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
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [5, -5]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const decorY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section
      id="histoire"
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-background to-noir-light overflow-hidden"
    >
      <motion.div 
        className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        style={{ y: decorY }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <motion.div 
              className="relative aspect-[3/4] overflow-hidden"
              style={{ rotateY: imageRotate }}
            >
              <motion.div
                initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
                animate={isInView ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" } : {}}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <motion.img
                  src={bespokeImage}
                  alt="Artisanat de luxe africain"
                  className="w-full h-full object-cover"
                  style={{ y: imageY, scale: 1.2 }}
                />
              </motion.div>
              
              <motion.div
                initial={{ x: "-100%" }}
                animate={isInView ? { x: "200%" } : { x: "-100%" }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, hsl(43 74% 49% / 0.4) 50%, transparent 100%)",
                  width: "50%",
                }}
              />
              
              <motion.div 
                className="absolute inset-4 border border-primary/30 pointer-events-none"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: 1,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{ scale: 1.05 }}
              className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 text-center cursor-default"
            >
              <motion.span 
                className="block font-display text-3xl"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2 }}
              >
                10+
              </motion.span>
              <span className="text-xs tracking-luxury uppercase">Années d'Excellence</span>
            </motion.div>

            <motion.div
              className="absolute -top-4 -left-4 w-16 h-16"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2 }}
            >
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-primary to-transparent" />
              <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-primary to-transparent" />
            </motion.div>
          </motion.div>

          <motion.div style={{ y: textY }}>
            <motion.span 
              className="text-primary text-sm tracking-luxury uppercase font-body inline-block"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Notre Histoire
            </motion.span>
            
            <motion.h2 
              className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              L'Art de
              <motion.span 
                className="block text-gradient-gold italic"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                l'Élégance Africaine
              </motion.span>
            </motion.h2>

            <motion.div 
              className="space-y-6 text-foreground/80 font-body text-lg leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
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
            </motion.div>

            <div className="grid grid-cols-2 gap-6 mt-12">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.7 + index * 0.15,
                    ease: "easeOut",
                  }}
                  whileHover={{ 
                    scale: 1.02, 
                    x: 5,
                    transition: { duration: 0.2 } 
                  }}
                  className="group cursor-default p-4 border-l-2 border-transparent hover:border-primary transition-colors duration-300"
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
