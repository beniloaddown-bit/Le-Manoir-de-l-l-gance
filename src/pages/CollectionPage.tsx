import { useParams, Navigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CollectionHero } from "@/components/CollectionHero";
import { ProductCard } from "@/components/ProductCard";
import { useCollections } from "@/hooks/useCollections";

const CollectionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { collections, getCollectionBySlug } = useCollections();
  const collection = slug ? getCollectionBySlug(slug) : undefined;

  // Scroll to top when navigating to this page or changing collection
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!collection) {
    return <Navigate to="/" replace />;
  }

  // Get other collections for navigation
  const otherCollections = collections.filter((c) => c.slug !== slug);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <CollectionHero collection={collection} />

      {/* Products Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm tracking-luxury uppercase font-body">
              {collection.products.length} Créations
            </span>
            <h2 className="font-display text-3xl sm:text-4xl mt-3 mb-4">
              Nos <span className="text-gradient-gold italic">Pièces</span> d'Exception
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="luxury-divider"
            />
          </motion.div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {collection.products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                collectionSlug={collection.slug}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Other Collections */}
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
              Explorer
            </span>
            <h2 className="font-display text-3xl sm:text-4xl mt-3 mb-4">
              Autres <span className="text-gradient-gold italic">Collections</span>
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="luxury-divider"
            />
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {otherCollections.map((col, index) => (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={`/collections/${col.slug}`}
                  className="group block relative aspect-[4/3] overflow-hidden luxury-card"
                >
                  <img
                    src={col.heroImage}
                    alt={col.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute inset-0 flex items-end p-6">
                    <div>
                      <span className="inline-block px-3 py-1 bg-primary/80 text-primary-foreground text-xs tracking-luxury uppercase mb-2">
                        {col.category}
                      </span>
                      <h3 className="font-display text-xl text-foreground group-hover:text-primary transition-colors">
                        {col.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default CollectionPage;
