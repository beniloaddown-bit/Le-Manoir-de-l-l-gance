import { motion } from "framer-motion";
import { MessageCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/collections";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  collectionSlug: string;
  index: number;
}

export const ProductCard = ({ product, collectionSlug, index }: ProductCardProps) => {
  const whatsappNumber = localStorage.getItem('whatsapp_number') || '221755236363';
  const whatsappMessage = encodeURIComponent(
    `Bonjour, je suis intéressé(e) par "${product.name}" du Manoir de l'Élégance. Pouvez-vous me donner plus d'informations et un devis personnalisé?`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group luxury-card relative"
    >
      {/* Featured Badge */}
      {product.featured && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="absolute top-4 left-4 z-20"
        >
          <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs tracking-luxury uppercase">
            Vedette
          </span>
        </motion.div>
      )}

      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <motion.div
          initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
          whileInView={{ clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          className="absolute inset-0"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Hover Glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-5 z-10">
          <h3 className="font-display text-xl text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
          <p className="font-body text-foreground/70 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          {/* Colors */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product.colors.slice(0, 3).map((color) => (
              <span
                key={color}
                className="text-xs px-2 py-0.5 bg-foreground/10 text-foreground/60 rounded"
              >
                {color}
              </span>
            ))}
            {product.colors.length > 3 && (
              <span className="text-xs px-2 py-0.5 text-primary">
                +{product.colors.length - 3}
              </span>
            )}
          </div>

          {/* Price */}
          <p className="font-display text-primary text-lg mb-4">{product.price}</p>

          {/* Actions */}
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            <Button
              variant="luxury"
              size="sm"
              className="flex-1"
              onClick={() =>
                window.open(
                  `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
                  "_blank"
                )
              }
            >
              <MessageCircle className="w-4 h-4" />
              <span>Commander</span>
            </Button>
            <Button
              variant="luxuryGhost"
              size="sm"
              asChild
            >
              <Link to={`/collections/${collectionSlug}/${product.id}`}>
                <Eye className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-4 right-4 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-0 right-0 w-full h-px bg-primary" />
          <div className="absolute top-0 right-0 w-px h-full bg-primary" />
        </div>
        <div className="absolute bottom-4 left-4 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute bottom-0 left-0 w-full h-px bg-primary" />
          <div className="absolute bottom-0 left-0 w-px h-full bg-primary" />
        </div>
      </div>
    </motion.div>
  );
};
