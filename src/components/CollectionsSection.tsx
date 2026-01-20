import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ceremonyImage from "@/assets/collection-ceremony.jpg";
import weddingImage from "@/assets/collection-wedding.jpg";
import businessImage from "@/assets/collection-business.jpg";
import bespokeImage from "@/assets/collection-bespoke.jpg";

const WHATSAPP_NUMBER = "1234567890";

const collections = [
  {
    id: "ceremony",
    title: "Tenues de Cérémonie",
    description: "Des créations majestueuses pour vos moments les plus précieux",
    image: ceremonyImage,
    category: "Cérémonie",
  },
  {
    id: "wedding",
    title: "Mariage & Baptême",
    description: "Sublimez vos célébrations avec nos tenues d'exception",
    image: weddingImage,
    category: "Mariage",
  },
  {
    id: "business",
    title: "Bureau & Formel",
    description: "L'élégance professionnelle avec une touche africaine distinctive",
    image: businessImage,
    category: "Business",
  },
  {
    id: "bespoke",
    title: "Sur-Mesure",
    description: "Créations uniques, taillées selon vos désirs",
    image: bespokeImage,
    category: "Bespoke",
  },
];

const CollectionCard = ({
  collection,
  index,
}: {
  collection: (typeof collections)[0];
  index: number;
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const whatsappMessage = encodeURIComponent(
    `Bonjour, je suis intéressé(e) par la collection "${collection.title}" du Manoir de l'Élégance. Pouvez-vous me donner plus d'informations?`
  );

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="group luxury-card"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={collection.image}
          alt={collection.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 bg-primary/90 text-primary-foreground text-xs tracking-luxury uppercase">
            {collection.category}
          </span>
        </div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="font-display text-2xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {collection.title}
          </h3>
          <p className="font-body text-foreground/70 text-sm mb-4 leading-relaxed">
            {collection.description}
          </p>
          
          {/* CTA */}
          <Button
            variant="luxury"
            size="sm"
            className="w-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0"
            onClick={() =>
              window.open(
                `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`,
                "_blank"
              )
            }
          >
            <MessageCircle className="w-4 h-4" />
            <span>Commander</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export const CollectionsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="collections" ref={sectionRef} className="py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-primary text-sm tracking-luxury uppercase font-body">
            Nos Collections
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 mb-6">
            Créations
            <span className="block text-gradient-gold italic">d'Exception</span>
          </h2>
          <div className="luxury-divider mb-6" />
          <p className="font-body text-lg text-foreground/70">
            Découvrez nos collections exclusives, où tradition africaine et luxe 
            contemporain se rencontrent pour créer des pièces uniques.
          </p>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
