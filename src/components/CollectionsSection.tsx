import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCollections } from "@/hooks/useCollections";

const CollectionCard = ({
  collection,
  index,
}: {
  collection: {
    id: string;
    slug: string;
    title: string;
    description: string;
    heroImage: string;
    category: string;
    products: { length: number }[] | { id: string }[];
  };
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1.1, 1]);

  const productCount = Array.isArray(collection.products) ? collection.products.length : 0;

  return (
    <Link to={`/collections/${collection.slug}`} className="block">
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.2,
          ease: "easeOut"
        }}
        className="group luxury-card"
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={isInView ? { x: "200%" } : { x: "-100%" }}
            transition={{ duration: 1.2, delay: index * 0.2 + 0.5, ease: "easeInOut" }}
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 0%, hsl(43 74% 49% / 0.3) 50%, transparent 100%)",
              width: "50%",
            }}
          />
          
          <motion.div
            initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
            animate={isInView ? { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)" } : {}}
            transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <motion.img
              src={collection.heroImage}
              alt={collection.title}
              className="w-full h-full object-cover"
              style={{ y: imageY, scale: imageScale }}
            />
          </motion.div>
          
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
          />
          
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "radial-gradient(circle at center, hsl(43 74% 49% / 0.1) 0%, transparent 70%)",
            }}
          />
          
          <motion.div 
            className="absolute top-4 left-4 z-10"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-primary/90 text-primary-foreground text-xs tracking-luxury uppercase backdrop-blur-sm">
              {collection.category}
            </span>
          </motion.div>

          <motion.div 
            className="absolute inset-x-0 bottom-0 p-6 z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.3, ease: "easeOut" }}
          >
            <motion.h3 
              className="font-display text-2xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
            >
              {collection.title}
            </motion.h3>
            <p className="font-body text-foreground/70 text-sm mb-3 leading-relaxed">
              {collection.description}
            </p>
            
            <p className="font-body text-primary/80 text-xs mb-4">
              {productCount} créations
            </p>
            
            <div className="overflow-hidden">
              <Button
                variant="luxury"
                size="sm"
                className="w-full opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0"
              >
                <Eye className="w-4 h-4" />
                <span>Découvrir</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          <div className="absolute top-4 right-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-0 right-0 w-full h-px bg-primary" />
            <div className="absolute top-0 right-0 w-px h-full bg-primary" />
          </div>
          <div className="absolute bottom-4 left-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute bottom-0 left-0 w-full h-px bg-primary" />
            <div className="absolute bottom-0 left-0 w-px h-full bg-primary" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export const CollectionsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { collections } = useCollections();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      id="collections" 
      ref={sectionRef} 
      className="py-32 bg-background relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.span 
            className="text-primary text-sm tracking-luxury uppercase font-body inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Nos Collections
          </motion.span>
          
          <motion.h2 
            className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-block">Créations</span>
            <motion.span 
              className="block text-gradient-gold italic"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              d'Exception
            </motion.span>
          </motion.h2>
          
          <motion.div 
            className="luxury-divider mb-6"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          
          <motion.p 
            className="font-body text-lg text-foreground/70"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Découvrez nos collections exclusives, où tradition africaine et luxe 
            contemporain se rencontrent pour créer des pièces uniques.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
