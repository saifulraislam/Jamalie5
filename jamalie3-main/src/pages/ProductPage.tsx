import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Check, MessageCircle, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface Product {
  id: number;
  name: string;
  price: string;
  images: string[];
  category: string;
  description: string;
  materials: string;
  dimensions: string;
  whatsappText: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Solace Time Keep Journal",
    price: "BDT 850",
    images: [
      "/bellydance.png",
      "/jamaliepage.png",
      "/bellydanceangled.png"
    ],
    category: "journals",
    description: "A handcrafted journal that captures moments with quiet elegance. Perfect for daily reflections, gratitude notes, or creative sketches.",
    materials: "Premium cotton paper, leather-bound cover with gold foil detailing",
    dimensions: "A5 (148 x 210 mm), 120 pages",
    whatsappText: "I'm interested in Solace Time Keep Journal"
  },
  {
    id: 2,
    name: "Ember Time Keep Journal",
    price: "BDT 850",
    images: [
      "/images/jour (2).jpeg",
      "/images/jour (3).jpeg",
      "/images/jour (4).jpeg"
    ],
    category: "journals",
    description: "Warm tones meet timeless design. This journal invites you to slow down and savor each written word.",
    materials: "Burnt sienna cover with hand-stitched binding, ivory pages",
    dimensions: "A5 (148 x 210 mm), 120 pages",
    whatsappText: "I'm interested in Ember Time Keep Journal"
  },
  {
    id: 3,
    name: "Écru Flower Journal",
    price: "BDT 850",
    images: [
      "/images/jour (3).jpeg",
      "/images/jour (2).jpeg",
      "/images/jour (4).jpeg"
    ],
    category: "journals",
    description: "Nature-inspired elegance with pressed botanical inclusions. A tactile experience that celebrates organic beauty.",
    materials: "Linen cover with pressed botanical inclusions, textured paper",
    dimensions: "A5 (148 x 210 mm), 120 pages",
    whatsappText: "I'm interested in Écru Flower Journal"
  },
  {
    id: 4,
    name: "Noir Red Heart Journal",
    price: "BDT 850",
    images: [
      "/images/jour (4).jpeg",
      "/images/jour (2).jpeg",
      "/images/jour (3).jpeg"
    ],
    category: "journals",
    description: "Bold sophistication in black leather with crimson heart embossing. For those who write with passion.",
    materials: "Black leather with crimson heart embossing, premium paper",
    dimensions: "A5 (148 x 210 mm), 120 pages",
    whatsappText: "I'm interested in Noir Red Heart Journal"
  }
];

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="pt-20 bg-[#F5F0E8] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-playfair font-semibold text-[#5A1E2B] mb-4">
            Product not found
          </h2>
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 text-[#5A1E2B] hover:text-[#E2725B] transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: parseInt(product.price.replace('BDT ', '')),
        image: product.images[0],
      });
    }

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    const message = `Hello Jamaliè, I'd like to order:\n\n${product.name} (x${quantity}) – ${parseInt(product.price.replace('BDT ', '')) * quantity} BDT\n\nPlease confirm availability.`;
    const whatsappUrl = `https://wa.me/8801881445154?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
    setImageLoaded(false);
    setImageError(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
    setImageLoaded(false);
    setImageError(false);
  };

  const handleImageError = () => {
    console.error('Failed to load image:', product.images[currentImageIndex]);
    setImageError(true);
    setImageLoaded(true);
  };

  const handleImageLoad = () => {
    console.log('Image loaded successfully:', product.images[currentImageIndex]);
    setImageLoaded(true);
  };

  return (
    <div className="pt-20 bg-[#F5F0E8] min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 text-[#5A1E2B] hover:text-[#E2725B] transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span className="font-inter text-sm">Back to Collection</span>
          </Link>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image Gallery Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg relative">
                {!imageLoaded && !imageError && (
                  <div className="absolute inset-0 bg-[#D6C1A9]/20 animate-pulse flex items-center justify-center">
                    <span className="text-[#5A1E2B]/50">Loading image...</span>
                  </div>
                )}
                {imageError ? (
                  <div className="w-full h-full flex items-center justify-center bg-[#D6C1A9]/30">
                    <div className="text-center text-[#5A1E2B]/60">
                      <div className="text-4xl mb-2">📔</div>
                      <p>Image not available</p>
                      <p className="text-xs mt-2 px-4 break-all">{product.images[currentImageIndex]}</p>
                    </div>
                  </div>
                ) : (
                  <motion.img
                    key={currentImageIndex}
                    src={product.images[currentImageIndex]}
                    alt={`${product.name} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover cursor-pointer"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Image Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                    >
                      <ChevronLeft size={20} className="text-[#5A1E2B]" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                    >
                      <ChevronRight size={20} className="text-[#5A1E2B]" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {product.images.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        setCurrentImageIndex(index);
                        setImageLoaded(false);
                        setImageError(false);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`aspect-square rounded-lg overflow-hidden border-2 ${
                        currentImageIndex === index 
                          ? 'border-[#E2725B]' 
                          : 'border-transparent hover:border-[#D6C1A9]'
                      } transition-all`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23D6C1A9"/><text x="50" y="50" text-anchor="middle" fill="%235A1E2B" font-size="30">📔</text></svg>';
                        }}
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Details Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col"
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-[#D6C1A9]/20 text-[#5A1E2B] text-xs font-medium rounded-full mb-4">
                  {product.category}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-[#5A1E2B] mb-4 tracking-tight">
                  {product.name}
                </h1>
                <p className="text-2xl md:text-3xl font-playfair font-semibold text-[#E2725B] mb-6">
                  {product.price}
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-playfair font-semibold text-[#5A1E2B] mb-2">
                  Description
                </h2>
                <p className="text-base font-inter font-light text-[#5A1E2B]/90 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-playfair font-semibold text-[#5A1E2B] mb-2">
                  Materials
                </h2>
                <p className="text-sm font-inter font-light text-[#5A1E2B]/80">
                  {product.materials}
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-playfair font-semibold text-[#5A1E2B] mb-2">
                  Dimensions
                </h2>
                <p className="text-sm font-inter font-light text-[#5A1E2B]/80">
                  {product.dimensions}
                </p>
              </div>

              {/* Quantity and Actions Section */}
              <div className="border-t border-[#D6C1A9]/30 pt-6">
                <div className="mb-6">
                  <label className="block text-sm font-inter font-medium text-[#5A1E2B] mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3 bg-white rounded-full p-1 w-fit shadow-sm">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F0E8] text-[#5A1E2B] hover:bg-[#D6C1A9]/20 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus size={18} />
                    </motion.button>
                    <span className="w-12 text-center font-inter font-medium text-[#5A1E2B]">
                      {quantity}
                    </span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F0E8] text-[#5A1E2B] hover:bg-[#D6C1A9]/20 transition-colors"
                    >
                      <Plus size={18} />
                    </motion.button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    onClick={handleAddToCart}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#5A1E2B] text-[#D6C1A9] py-3 px-6 rounded-full font-inter font-medium hover:bg-[#5A1E2B]/90 transition-colors"
                  >
                    <AnimatePresence mode="wait">
                      {addedToCart ? (
                        <motion.span
                          key="added"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-2"
                        >
                          <Check size={20} />
                          Added to Cart
                        </motion.span>
                      ) : (
                        <motion.span
                          key="add"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-2"
                        >
                          <ShoppingBag size={20} />
                          Add to Cart
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  <motion.button
                    onClick={handleBuyNow}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#E2725B] text-white py-3 px-6 rounded-full font-inter font-medium hover:bg-[#E2725B]/90 transition-colors"
                  >
                    <MessageCircle size={20} />
                    Buy Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductPage;