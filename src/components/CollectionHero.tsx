import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Collection } from "@/data/collections";

interface CollectionHeroProps {
  collection: Collection;
}

export const CollectionHero = ({ collection }: CollectionHeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY, scale: imageScale }}
      >
        <img
          src={collection.heroImage}
          alt={collection.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

      {/* Golden Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="absolute inset-0 flex items-end"
        style={{ y: textY, opacity }}
      >
        <div className="container mx-auto px-6 pb-16">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button
              variant="luxuryGhost"
              size="sm"
              asChild
              className="mb-8"
            >
              <Link to="/#collections">
                <ArrowLeft className="w-4 h-4" />
                <span>Retour aux collections</span>
              </Link>
            </Button>
          </motion.div>

          {/* Category */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block px-4 py-2 bg-primary/90 text-primary-foreground text-xs tracking-luxury uppercase mb-4"
          >
            {collection.category}
          </motion.span>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground mb-4"
          >
            {collection.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-display text-xl sm:text-2xl text-gradient-gold italic mb-4"
          >
            {collection.subtitle}
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="luxury-divider mb-6 origin-left"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-body text-lg text-foreground/80 max-w-2xl"
          >
            {collection.longDescription}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};
