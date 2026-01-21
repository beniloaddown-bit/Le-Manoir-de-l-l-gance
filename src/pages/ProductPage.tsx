import { useParams, Navigate, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, MessageCircle, Ruler, Palette, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { getCollectionBySlug, getProductById, WHATSAPP_NUMBER } from "@/data/collections";

const ProductPage = () => {
  const { slug, productId } = useParams<{ slug: string; productId: string }>();
  const collection = slug ? getCollectionBySlug(slug) : undefined;
  const product = slug && productId ? getProductById(slug, productId) : undefined;
  
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  if (!collection || !product) {
    return <Navigate to="/" replace />;
  }

  const whatsappMessage = encodeURIComponent(
    `Bonjour, je suis intéressé(e) par "${product.name}" de la collection ${collection.title} du Manoir de l'Élégance. Je souhaite obtenir plus d'informations et un devis personnalisé.`
  );

  // Get related products (other products from same collection)
  const relatedProducts = collection.products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <div ref={heroRef} className="relative pt-24">
        <div className="container mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm text-foreground/60 mb-8"
          >
            <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
            <span>/</span>
            <Link to={`/collections/${slug}`} className="hover:text-primary transition-colors">
              {collection.title}
            </Link>
            <span>/</span>
            <span className="text-primary">{product.name}</span>
          </motion.nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] overflow-hidden luxury-card"
            >
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                style={{ scale: imageScale, y: imageY }}
              />
              
              {/* Featured Badge */}
              {product.featured && (
                <div className="absolute top-6 left-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm tracking-luxury uppercase">
                    <Sparkles className="w-4 h-4" />
                    Vedette
                  </span>
                </div>
              )}

              {/* Golden Glow Effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  background: [
                    "radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 70% 70%, hsl(var(--primary) / 0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.1) 0%, transparent 50%)",
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              {/* Category */}
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs tracking-luxury uppercase w-fit mb-4">
                {collection.category}
              </span>

              {/* Title */}
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <p className="font-display text-2xl text-gradient-gold mb-6">
                {product.price}
              </p>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="luxury-divider mb-6 origin-left"
              />

              {/* Description */}
              <p className="font-body text-lg text-foreground/80 leading-relaxed mb-8">
                {product.longDescription}
              </p>

              {/* Options */}
              <div className="space-y-6 mb-8">
                {/* Colors */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Palette className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm tracking-luxury uppercase text-foreground mb-2">
                      Coloris Disponibles
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <span
                          key={color}
                          className="px-3 py-1 bg-foreground/5 text-foreground/70 text-sm rounded border border-foreground/10"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sizes */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Ruler className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm tracking-luxury uppercase text-foreground mb-2">
                      Tailles
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <span
                          key={size}
                          className="px-3 py-1 bg-foreground/5 text-foreground/70 text-sm rounded border border-foreground/10"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="luxuryFilled"
                  size="lg"
                  className="flex-1"
                  onClick={() =>
                    window.open(
                      `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`,
                      "_blank"
                    )
                  }
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Commander via WhatsApp</span>
                </Button>
                <Button
                  variant="luxury"
                  size="lg"
                  asChild
                >
                  <Link to={`/collections/${slug}`}>
                    <ArrowLeft className="w-5 h-5" />
                    <span>Retour à la collection</span>
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-20 bg-muted/30 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <span className="text-primary text-sm tracking-luxury uppercase font-body">
                Vous aimerez aussi
              </span>
              <h2 className="font-display text-3xl sm:text-4xl mt-3 mb-4">
                Créations <span className="text-gradient-gold italic">Similaires</span>
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="luxury-divider"
              />
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  collectionSlug={slug!}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default ProductPage;
