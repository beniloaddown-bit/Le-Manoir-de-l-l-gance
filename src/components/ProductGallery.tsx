import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsLightboxOpen(true);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };

  const zoomOut = () => {
    setZoomLevel((prev) => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) setPanPosition({ x: 0, y: 0 });
      return newZoom;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      dragStart.current = { x: e.clientX - panPosition.x, y: e.clientY - panPosition.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPanPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "+" || e.key === "=") zoomIn();
    if (e.key === "-") zoomOut();
  };

  return (
    <>
      {/* Main Gallery */}
      <div className="space-y-4">
        {/* Main Image */}
        <motion.div
          className="relative aspect-[3/4] overflow-hidden luxury-card cursor-zoom-in group"
          onClick={() => openLightbox(selectedIndex)}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            key={selectedIndex}
            src={images[selectedIndex]}
            alt={`${productName} - Vue ${selectedIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Zoom Hint */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-background/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          >
            <div className="bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 text-foreground">
              <ZoomIn className="w-5 h-5" />
              <span className="text-sm font-body">Cliquez pour agrandir</span>
            </div>
          </motion.div>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-body text-foreground">
              {selectedIndex + 1} / {images.length}
            </span>
          </div>

          {/* Golden Glow Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: [
                "radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.08) 0%, transparent 50%)",
                "radial-gradient(circle at 70% 70%, hsl(var(--primary) / 0.08) 0%, transparent 50%)",
                "radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.08) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </motion.div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {images.map((image, index) => (
              <motion.button
                key={index}
                className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                  index === selectedIndex
                    ? "border-primary shadow-lg shadow-primary/20"
                    : "border-transparent hover:border-primary/50"
                }`}
                onClick={() => setSelectedIndex(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={image}
                  alt={`${productName} - Miniature ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {index === selectedIndex && (
                  <motion.div
                    className="absolute inset-0 bg-primary/10"
                    layoutId="thumbnail-highlight"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-background/95 backdrop-blur-md"
              onClick={closeLightbox}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Controls - Top */}
            <motion.div
              className="absolute top-6 right-6 z-10 flex items-center gap-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                variant="luxuryGhost"
                size="icon"
                onClick={zoomOut}
                disabled={zoomLevel <= 1}
                className="bg-background/50 backdrop-blur-sm"
              >
                <ZoomOut className="w-5 h-5" />
              </Button>
              <span className="text-sm font-body text-foreground/70 min-w-[3rem] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <Button
                variant="luxuryGhost"
                size="icon"
                onClick={zoomIn}
                disabled={zoomLevel >= 3}
                className="bg-background/50 backdrop-blur-sm"
              >
                <ZoomIn className="w-5 h-5" />
              </Button>
              <Button
                variant="luxuryGhost"
                size="icon"
                onClick={closeLightbox}
                className="bg-background/50 backdrop-blur-sm ml-4"
              >
                <X className="w-5 h-5" />
              </Button>
            </motion.div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <motion.div
                  className="absolute left-6 z-10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button
                    variant="luxuryGhost"
                    size="icon"
                    onClick={prevImage}
                    className="bg-background/50 backdrop-blur-sm w-12 h-12"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                </motion.div>
                <motion.div
                  className="absolute right-6 z-10"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button
                    variant="luxuryGhost"
                    size="icon"
                    onClick={nextImage}
                    className="bg-background/50 backdrop-blur-sm w-12 h-12"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </motion.div>
              </>
            )}

            {/* Main Image */}
            <motion.div
              ref={imageRef}
              className={`relative max-w-[90vw] max-h-[85vh] ${
                zoomLevel > 1 ? "cursor-grab active:cursor-grabbing" : ""
              }`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <motion.img
                key={selectedIndex}
                src={images[selectedIndex]}
                alt={`${productName} - Vue ${selectedIndex + 1}`}
                className="max-w-full max-h-[85vh] object-contain select-none"
                style={{
                  scale: zoomLevel,
                  x: panPosition.x,
                  y: panPosition.y,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                draggable={false}
              />
            </motion.div>

            {/* Thumbnails - Bottom */}
            {images.length > 1 && (
              <motion.div
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm p-2 rounded-xl">
                  {images.map((image, index) => (
                    <motion.button
                      key={index}
                      className={`relative w-16 h-16 overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                        index === selectedIndex
                          ? "border-primary"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                      onClick={() => {
                        setSelectedIndex(index);
                        setZoomLevel(1);
                        setPanPosition({ x: 0, y: 0 });
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={image}
                        alt={`${productName} - Miniature ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Keyboard Hints */}
            <motion.div
              className="absolute bottom-6 right-6 text-foreground/40 text-xs font-body hidden lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-4">
                <span>← → Navigation</span>
                <span>+ - Zoom</span>
                <span>Esc Fermer</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
