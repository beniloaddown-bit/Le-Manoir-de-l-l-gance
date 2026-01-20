import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "Le Manoir de l'Élégance a transformé mon mariage en un moment inoubliable. Ma robe était une véritable œuvre d'art, mêlant tradition et modernité avec une grâce infinie.",
    author: "Aminata D.",
    role: "Mariée - Cérémonie traditionnelle",
  },
  {
    id: 2,
    quote:
      "Un service impeccable et une qualité de confection exceptionnelle. Mon costume sur mesure a fait sensation lors de la réunion des dirigeants africains.",
    author: "Kofi M.",
    role: "Homme d'affaires - Abidjan",
  },
  {
    id: 3,
    quote:
      "Chaque détail, chaque couture raconte une histoire. L'équipe a su capturer l'essence de notre culture tout en y ajoutant une touche de luxe contemporain.",
    author: "Fatou B.",
    role: "Ambassadrice culturelle",
  },
  {
    id: 4,
    quote:
      "Pour le baptême de ma fille, nous voulions des tenues familiales assorties. Le résultat a dépassé toutes nos attentes. Un travail d'artiste!",
    author: "Thierry & Marie K.",
    role: "Baptême familial - Paris",
  },
];

export const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-background relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary text-sm tracking-luxury uppercase font-body">
            Témoignages
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 mb-6">
            Ils ont choisi
            <span className="block text-gradient-gold italic">l'Élégance</span>
          </h2>
          <div className="luxury-divider" />
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* Quote Icon */}
            <Quote className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 text-primary/20" />

            {/* Content */}
            <div className="text-center px-8 py-12 border border-primary/10 bg-card/50 backdrop-blur-sm">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-body text-xl sm:text-2xl text-foreground/90 italic leading-relaxed mb-8">
                  "{testimonials[currentIndex].quote}"
                </p>
                <div className="luxury-divider mb-6" />
                <p className="font-display text-lg text-primary">
                  {testimonials[currentIndex].author}
                </p>
                <p className="font-body text-sm text-foreground/60 mt-1">
                  {testimonials[currentIndex].role}
                </p>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-3 border border-primary/20 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                aria-label="Témoignage précédent"
              >
                <ChevronLeft className="w-5 h-5 text-primary" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-primary w-8"
                        : "bg-foreground/20 hover:bg-foreground/40"
                    }`}
                    aria-label={`Témoignage ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-3 border border-primary/20 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                aria-label="Témoignage suivant"
              >
                <ChevronRight className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
