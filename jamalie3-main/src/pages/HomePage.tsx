// =============================================================================
// MEGAFILE: All Components Consolidated for Single-Page Experience
// ⚠️  SEO WARNING: This structure prevents ranking for commercial keywords.
//     Plan to split into pages (/collection, /about, etc.) within 60 days.
// =============================================================================

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Heart, Award, Users, Instagram, Mail, MapPin, Menu, X, ShoppingBag, 
  ExternalLink, ChevronLeft, ChevronRight, Play, Pause, MessageCircle, 
  Check, Quote 
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';

// Interfaces
interface StoryItem {
  id: number;
  image: string;
  caption: string;
}

interface SlideData {
  id: number;
  image: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
  title: string;
  subtitle: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  whatsappText: string;
}

interface LoadingScreenProps {
  onComplete: () => void;
}

// =============================================================================
// COMPONENTS (Formerly separate files)
// =============================================================================

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsMenuOpen(false), [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && buttonRef.current && !menuRef.current.contains(event.target as Node) && !buttonRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/collection', label: 'Collection' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActiveRoute = (href: string) => href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-[#D6C1A9]/20' : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/" className="text-2xl md:text-3xl font-playfair font-bold text-[#5A1E2B] tracking-tight">
              Jamaliè
            </Link>
          </motion.div>

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div key={item.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={item.href}
                  className={`relative font-inter font-medium transition-colors duration-200 ${
                    isActiveRoute(item.href) ? 'text-[#5A1E2B]' : 'text-[#5A1E2B]/80 hover:text-[#5A1E2B]'
                  }`}
                >
                  {item.label}
                  {isActiveRoute(item.href) && (
                    <motion.span layoutId="navUnderline" className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#E2725B]" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />
                  )}
                </Link>
              </motion.div>
            ))}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/cart" className="relative inline-flex items-center justify-center text-[#5A1E2B]">
                <ShoppingBag size={22} />
                {cartItemCount > 0 && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 bg-[#E2725B] text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </motion.span>
                )}
              </Link>
            </motion.div>
          </nav>

          <div className="lg:hidden flex items-center gap-4">
            <motion.div whileTap={{ scale: 0.9 }}>
              <Link to="/cart" className="relative inline-flex items-center justify-center text-[#5A1E2B] p-2">
                <ShoppingBag size={22} />
                {cartItemCount > 0 && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 bg-[#E2725B] text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </motion.span>
                )}
              </Link>
            </motion.div>
            <motion.button
              ref={buttonRef}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="text-[#5A1E2B] p-2 relative z-50"
              aria-label="Toggle menu"
              style={{ minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {isMenuOpen ? <X size={24} className="text-[#5A1E2B]" /> : <Menu size={24} className="text-[#5A1E2B]" />}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={toggleMenu} />
              <motion.div
                ref={menuRef}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed top-0 right-0 h-screen w-full max-w-xs bg-[#F5F0E8] shadow-xl z-50 border-l border-[#D6C1A9]/30 flex flex-col"
              >
                <div className="p-6 pt-20 flex flex-col flex-1 overflow-y-auto">
                  <nav className="flex-1 space-y-1">
                    {navItems.map((item) => (
                      <motion.div key={item.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
                        <Link to={item.href} onClick={toggleMenu} className={`block px-4 py-3 text-lg font-inter rounded-lg transition-all ${isActiveRoute(item.href) ? 'text-[#5A1E2B] bg-[#D6C1A9]/20' : 'text-[#5A1E2B]/80 hover:bg-[#D6C1A9]/10'}`} style={{ minHeight: '48px', display: 'flex', alignItems: 'center' }}>
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                  <div className="pt-6 mt-auto border-t border-[#D6C1A9]/30">
                    <div className="flex justify-center gap-4 mb-4">
                      <motion.a href="https://instagram.com/jamalie" target="_blank" rel="noopener noreferrer" whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} className="p-2 rounded-full border border-[#5A1E2B] text-[#5A1E2B] hover:bg-[#5A1E2B] hover:text-[#D6C1A9] transition-colors" style={{ minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Instagram size={18} />
                      </motion.a>
                    </div>
                    <p className="text-center text-sm text-[#5A1E2B]/60 font-inter">© {new Date().getFullYear()} Jamaliè</p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div initial={{ opacity: 1 }} animate={{ opacity: isVisible ? 1 : 0 }} transition={{ duration: 0.8 }} className="fixed inset-0 z-50 flex items-center justify-center bg-[#5A1E2B]">
      <div className="text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }} className="text-6xl md:text-8xl font-playfair font-bold text-[#D6C1A9] mb-4">
          J
        </motion.div>
        <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.5, delay: 0.5 }} className="h-0.5 bg-[#D6C1A9] mx-auto max-w-24" />
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }} className="text-[#D6C1A9] text-lg font-light mt-4 tracking-widest">
          JAMALIÈ
        </motion.p>
      </div>
    </motion.div>
  );
};

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans">
      <div className="absolute inset-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/jamalie.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(rgba(90, 30, 43, 0.1), rgba(0, 0, 0, 0.6))' }} />
      </div>
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold tracking-wide leading-tight mb-6 drop-shadow-lg">
          Elegance isn't loud,<br />
          <span className="text-[#D6C1A9] mt-1 block">it lingers.</span>
        </motion.h1>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }} className="w-24 h-px bg-gradient-to-r from-transparent via-[#D6C1A9] to-transparent mx-auto mb-6">
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#D6C1A9] rounded-full" />
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }} className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white/90 leading-relaxed mb-10 drop-shadow-sm">
          The art of timeless craftsmanship.
        </motion.p>
        <motion.a
          href="https://www.instagram.com/joyfeesh"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05, y: -3, boxShadow: "0 10px 30px rgba(214, 193, 169, 0.3)" }}
          whileTap={{ scale: 0.98 }}
          className="group relative inline-flex items-center gap-2 border border-[#D6C1A9] px-8 py-3 rounded-full text-[#D6C1A9] font-medium tracking-wide transition-all duration-300 hover:bg-[#D6C1A9] hover:text-[#5A1E2B] shadow-lg backdrop-blur-sm bg-black/10 overflow-hidden"
        >
          <span className="relative z-10">Visit Our Instagram</span>
          <ExternalLink size={18} className="relative z-10" />
          <div className="absolute inset-0 bg-[#D6C1A9] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
        </motion.a>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }} className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-px h-8 bg-gradient-to-b from-transparent via-[#D6C1A9] to-transparent rounded-full" />
      </motion.div>
      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-[#D6C1A9]/20 hidden md:block" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-[#D6C1A9]/20 hidden md:block" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-[#D6C1A9]/20 hidden md:block" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-[#D6C1A9]/20 hidden md:block" />
    </section>
  );
};

const ProductShowcase: React.FC = () => {
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState<number | null>(null);

  const handleAddToCart = (product: Product) => {
    addToCart({ id: product.id, name: product.name, price: parseInt(product.price.replace('BDT ', '')), image: product.image });
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const products: Product[] = [
    { id: 1, name: "Solace Time Keep Journal", price: "BDT 850", image: "bellydance.png", whatsappText: "I'm interested in Solace Time Keep Journal" },
    { id: 2, name: "Ember Time Keep Journal", price: "BDT 850", image: "jour (2).jpeg", whatsappText: "I'm interested in Ember Time Keep Journal" },
    { id: 3, name: "Écru Flower Journal", price: "BDT 850", image: "jour (3).jpeg", whatsappText: "I'm interested in Écru Flower Journal" },
    { id: 4, name: "Noir Red Heart Journal", price: "BDT 850", image: "jour (4).jpeg", whatsappText: "I'm interested in Noir Red Heart Journal" }
  ];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 0.77, 0.47, 0.97] } } };

  return (
    <section id="collection" className="py-12 md:py-20 bg-[#F5F0E8]">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#5A1E2B] mb-4 tracking-tight">
            Our Curated<span className="text-[#D6C1A9] block mt-2">Collection</span>
          </h2>
          <p className="text-base md:text-lg font-inter font-light text-[#5A1E2B]/90 max-w-2xl mx-auto px-4">
            Timeless pieces crafted with intention
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D6C1A9] to-transparent my-6 mx-auto" />
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants} whileHover={{ y: -5 }} className="group bg-white rounded-lg overflow-hidden border border-[#D6C1A9]/30 hover:border-[#E2725B]/50 transition-all duration-300">
              <Link to={`/product/${product.id}`}>
                <div className="relative overflow-hidden h-48 sm:h-56">
                  <motion.img src={product.image} alt={product.name} initial={{ scale: 1 }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(rgba(226, 114, 91, 0.08), rgba(90, 30, 43, 0.15))' }} />
                </div>
              </Link>
              <div className="p-4 text-center">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-lg font-playfair font-semibold text-[#5A1E2B] mb-1 line-clamp-1 hover:text-[#E2725B] transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-base font-medium text-[#E2725B] mb-3">
                  {product.price}
                </p>
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => handleAddToCart(product)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 inline-flex items-center justify-center gap-1 bg-[#5A1E2B] text-[#D6C1A9] py-1.5 px-3 rounded-full font-inter font-light text-sm hover:bg-[#5A1E2B]/90 transition-all relative overflow-hidden"
                  >
                    <AnimatePresence mode="wait">
                      {addedToCart === product.id ? (
                        <motion.span key="added" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-1">
                          <Check size={14} />
                          <span>Added</span>
                        </motion.span>
                      ) : (
                        <motion.span key="add" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-1">
                          <ShoppingBag size={14} />
                          <span>Add</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                  <motion.a
                    href={`https://wa.me/8801881445154?text=${encodeURIComponent(product.whatsappText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center border border-[#D6C1A9] text-[#5A1E2B] p-1.5 rounded-full hover:bg-[#D6C1A9]/10 transition-all"
                    title="Order via WhatsApp"
                  >
                    <MessageCircle size={14} className="text-[#E2725B]" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="text-center mt-12 md:mt-16">
          <p className="text-base md:text-lg font-inter font-light text-[#5A1E2B]/80 mb-4 max-w-2xl mx-auto px-4">
            For custom orders or special requests, we'd love to create something unique for you.
          </p>
          <motion.a
            href="https://wa.me/8801881445154?text=I'd like to make a custom order"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 bg-[#E2725B] text-white py-2.5 px-6 rounded-full font-inter font-medium text-sm md:text-base transition-all"
          >
            <MessageCircle size={16} />
            Discuss Custom Order
          </motion.a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 1 }} className="flex justify-center mt-12 md:mt-16">
          <motion.div animate={{ scaleY: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-px h-10 bg-[#D6C1A9]" />
        </motion.div>
      </div>
    </section>
  );
};

const ImageSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slides: SlideData[] = [
    { id: 1, image: { desktop: "mood (2).jpeg", tablet: "mood (2).jpeg", mobile: "mood (2).jpeg" }, title: "Artisan Craftsmanship", subtitle: "Handcrafted with precision and passion" },
    { id: 2, image: { desktop: "mood (3).jpeg", tablet: "mood (3).jpeg", mobile: "mood (3).jpeg" }, title: "Premium Materials", subtitle: "Only the finest materials make the cut" },
    { id: 3, image: { desktop: "mood(4).jpeg", tablet: "mood(4).jpeg", mobile: "mood(4).jpeg" }, title: "Timeless Design", subtitle: "Elegance that transcends trends" },
    { id: 4, image: { desktop: "mood (1).jpeg", tablet: "mood (1).jpeg", mobile: "mood (1).jpeg" }, title: "Luxury Collection", subtitle: "Discover our signature pieces" }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    let startTime = Date.now();
    const duration = 5000;
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progressPercent = Math.min((elapsed / duration) * 100, 100);
      setProgress(progressPercent);
      if (progressPercent >= 100) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setDirection(1);
        startTime = Date.now();
        setProgress(0);
      }
    }, 50);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isAutoPlaying, currentSlide, slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const handleTouchMove = (e: React.TouchEvent) => { setTouchEnd(e.targetTouches[0].clientX); };
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    else if (distance < -50) prevSlide();
  };

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setProgress(0);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setProgress(0);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setProgress(0);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  }, [slides.length]);

  const toggleAutoPlay = () => { setIsAutoPlaying(!isAutoPlaying); if (isAutoPlaying) setProgress(0); };

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0, scale: 1.05 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0, scale: 0.95 })
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  useEffect(() => { const timer = setTimeout(() => setIsLoading(false), 1000); return () => clearTimeout(timer); }, []);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#F5F0E8] to-[#F0E8D8]">
      <div ref={containerRef} className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] max-h-[600px]" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={currentSlide} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.4 }, scale: { duration: 0.6 } }} className="absolute inset-0">
            <div className="relative w-full h-full overflow-hidden">
              <picture>
                <source media="(min-width: 1200px)" srcSet={slides[currentSlide].image.desktop} />
                <source media="(min-width: 768px)" srcSet={slides[currentSlide].image.tablet} />
                <img src={slides[currentSlide].image.mobile} alt={slides[currentSlide].title} className="w-full h-full object-cover transition-transform duration-[8s] ease-out hover:scale-105" loading="lazy" onLoad={() => setIsLoading(false)} />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-r from-[#5A1E2B]/70 via-[#5A1E2B]/50 to-[#5A1E2B]/70" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#5A1E2B]/60 via-transparent to-[#5A1E2B]/30" />
              <AnimatePresence>
                {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#5A1E2B]/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-[#D6C1A9] border-t-transparent rounded-full animate-spin" />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
                  <motion.div variants={contentVariants} initial="hidden" animate="visible" key={`content-${currentSlide}`}>
                    <motion.h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-playfair font-bold mb-3 md:mb-6 text-[#D6C1A9] drop-shadow-lg leading-tight" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
                      {slides[currentSlide].title}
                    </motion.h2>
                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.6 }} className="w-16 sm:w-20 md:w-24 h-px bg-[#D6C1A9] mx-auto mb-4 md:mb-6" />
                    <motion.p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-[#F5F0E8] font-light tracking-wide sm:tracking-wider leading-relaxed drop-shadow-md max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}>
                      {slides[currentSlide].subtitle}
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.button onClick={prevSlide} whileHover={{ scale: 1.1, x: -2 }} whileTap={{ scale: 0.9 }} className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-[#5A1E2B]/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#D6C1A9] hover:bg-[#5A1E2B] transition-all duration-300 z-20 border border-[#D6C1A9]/30 shadow-lg" aria-label="Previous slide">
          <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
        </motion.button>
        <motion.button onClick={nextSlide} whileHover={{ scale: 1.1, x: 2 }} whileTap={{ scale: 0.9 }} className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-[#5A1E2B]/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#D6C1A9] hover:bg-[#5A1E2B] transition-all duration-300 z-20 border border-[#D6C1A9]/30 shadow-lg" aria-label="Next slide">
          <ChevronRight size={20} className="sm:w-6 sm:h-6" />
        </motion.button>

        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center space-x-4 bg-[#5A1E2B]/80 backdrop-blur-md rounded-full px-4 py-2 border border-[#D6C1A9]/20">
            <motion.button onClick={toggleAutoPlay} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-8 h-8 flex items-center justify-center text-[#D6C1A9] hover:text-[#F5F0E8] transition-colors duration-200" aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}>
              {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
            </motion.button>
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <motion.button key={index} onClick={() => goToSlide(index)} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className="relative" aria-label={`Go to slide ${index + 1}`}>
                  <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-[#D6C1A9]' : 'bg-[#D6C1A9]/40 hover:bg-[#D6C1A9]/70'}`} />
                  {index === currentSlide && isAutoPlaying && (
                    <div className="absolute inset-0 w-2 h-2 sm:w-2.5 sm:h-2.5">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 20 20">
                        <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray={`${2 * Math.PI * 8}`} strokeDashoffset={`${2 * Math.PI * 8 * (1 - progress / 100)}`} className="text-[#D6C1A9] transition-all duration-75 ease-linear" />
                      </svg>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-[#F5F0E8] to-[#F0E8D8] py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }} className="mb-12 sm:mb-16 md:mb-20">
            <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-[#5A1E2B] mb-6 sm:mb-8 leading-none" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}>
              JAMALIÈ
            </motion.h1>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} className="relative mb-6 sm:mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-[#D6C1A9] to-transparent max-w-xs mx-auto" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#D6C1A9] rounded-full" />
            </motion.div>
            <motion.p className="text-base sm:text-lg md:text-xl text-[#5A1E2B] tracking-widest uppercase font-light mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.6 }}>
              Timeless Elegance
            </motion.p>
            <motion.p className="text-sm sm:text-base text-[#5A1E2B]/70 tracking-wider" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.8 }}>
              EST. 2018
            </motion.p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center items-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <Link to="/collection" className="w-full sm:w-auto">
              <motion.button whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(90, 30, 43, 0.3)" }} whileTap={{ scale: 0.98 }} className="group relative w-full sm:w-auto bg-[#5A1E2B] text-[#F5F0E8] px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-medium overflow-hidden transition-all duration-300 hover:shadow-lg border border-[#5A1E2B]">
                <span className="relative z-10 tracking-wider">SHOP COLLECTION</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#3A121D] to-[#5A1E2B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </motion.button>
            </Link>
            <Link to="/about" className="w-full sm:w-auto">
              <motion.button whileHover={{ scale: 1.02, backgroundColor: "#5A1E2B", color: "#F5F0E8" }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto border-2 border-[#5A1E2B] text-[#5A1E2B] px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-medium transition-all duration-300 hover:shadow-lg tracking-wider">
                OUR STORY
              </motion.button>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }} className="flex justify-center items-center space-x-6 sm:space-x-8">
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.8 }} className="w-12 sm:w-16 md:w-20 h-px bg-gradient-to-r from-transparent to-[#D6C1A9]" />
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="w-3 h-3 bg-[#D6C1A9] rounded-full" />
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.8 }} className="w-12 sm:w-16 md:w-20 h-px bg-gradient-to-l from-transparent to-[#D6C1A9]" />
          </motion.div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

const Gallery: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const stories: StoryItem[] = [
    { id: 1, image: "storyofjamalie1.webp", caption: "Moodboard" },
    { id: 2, image: "story (3).jpg", caption: "Behind the Brand" },
    { id: 3, image: "story (4).jpg", caption: "Inspo" },
    { id: 4, image: "story(6).jpg", caption: "Lookbook" },
    { id: 5, image: "story (1).jpg", caption: "Textures" },
    { id: 6, image: "story (2).jpg", caption: "Craftsmanship" }
  ];

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
    } else {
      setIsOpen(false);
      setCurrentIndex(0);
      setProgress(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
    }
  };

  const openStory = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
    setProgress(0);
    setIsPaused(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentIndex(0);
    setProgress(0);
    setIsPaused(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => { setTouchStart(e.touches[0].clientX); };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) diff > 0 ? handleNext() : handlePrev();
  };

  const handleScreenClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    if (x < width / 3) handlePrev();
    else if (x > (width * 2) / 3) handleNext();
  };

  useEffect(() => {
    if (!isOpen || isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    }
    intervalRef.current = window.setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 1;
      });
    }, 50);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isOpen, isPaused, currentIndex]);

  return (
    <section id="gallery" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 relative overflow-hidden" style={{ backgroundColor: '#F8F4ED' }}>
      <div className="absolute inset-0 opacity-5 pointer-events-none"><div className="absolute inset-0 bg-gradient-to-br from-[#5A1E2B]/10 via-transparent to-[#E2725B]/10" /></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, ease: "easeOut" }} className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#5A1E2B] mb-4 sm:mb-6 tracking-tight leading-tight">
            Jamaliè<span className="text-[#D6C1A9] block mt-1 sm:mt-2">Aesthetics</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#5A1E2B]/80 max-w-2xl mx-auto px-4 leading-relaxed">
            A glimpse into our creative process and the inspiration behind our timeless collections.
          </p>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-transparent via-[#D6C1A9] to-transparent my-6 sm:my-8 mx-auto" />
        </motion.div>

        <div className="relative -mx-4 sm:mx-0">
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 px-4 sm:px-0 snap-x snap-mandatory scrollbar-hide max-w-7xl mx-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
            {stories.map((story, index) => (
              <motion.button
                key={story.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openStory(index)}
                className="relative flex-shrink-0 w-28 h-48 sm:w-32 sm:h-56 md:w-36 md:h-64 lg:w-40 lg:h-72 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#E2725B] focus:ring-offset-2 focus:ring-offset-[#F8F4ED] snap-start"
              >
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#E2725B] via-[#D6C1A9] to-[#5A1E2B] p-[2px] sm:p-[3px] group-hover:p-[3px] sm:group-hover:p-[4px] transition-all duration-300">
                  <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-white relative">
                    <img src={story.image} alt={story.caption} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4">
                      <p className="text-white text-xs sm:text-sm md:text-base font-medium text-center drop-shadow-lg">{story.caption}</p>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play size={20} className="text-white ml-1" fill="white" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 bg-black z-50 flex items-center justify-center" style={{ touchAction: 'pan-y' }}>
            <div className="absolute top-0 left-0 right-0 flex gap-1 sm:gap-1.5 p-2 sm:p-3 md:p-4 z-30 max-w-2xl mx-auto w-full">
              {stories.map((_, index) => (
                <div key={index} className="flex-1 h-0.5 sm:h-1 bg-white/30 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-white rounded-full" style={{ width: index < currentIndex ? '100%' : index === currentIndex ? `${progress}%` : '0%' }} transition={{ duration: 0.05, ease: "linear" }} />
                </div>
              ))}
            </div>
            <div className="absolute top-0 left-0 right-0 pt-10 sm:pt-12 md:pt-14 pb-4 px-3 sm:px-4 md:px-6 bg-gradient-to-b from-black/60 to-transparent z-20 max-w-2xl mx-auto w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#E2725B] to-[#D6C1A9] p-[2px]">
                    <div className="w-full h-full rounded-full bg-[#5A1E2B] flex items-center justify-center text-white font-serif font-bold text-xs sm:text-sm">J</div>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm sm:text-base">Jamaliè</p>
                    <p className="text-white/80 text-xs sm:text-sm">{stories[currentIndex].caption}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <button onClick={() => setIsPaused(!isPaused)} className="text-white p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors active:scale-95" aria-label={isPaused ? "Play" : "Pause"}>
                    {isPaused ? <Play size={18} className="sm:w-5 sm:h-5" /> : <Pause size={18} className="sm:w-5 sm:h-5" />}
                  </button>
                  <button onClick={handleClose} className="text-white p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors active:scale-95" aria-label="Close">
                    <X size={22} className="sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>
            </div>
            <div className="relative w-full h-full max-w-2xl mx-auto flex items-center justify-center" onClick={handleScreenClick} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.img key={currentIndex} src={stories[currentIndex].image} alt={stories[currentIndex].caption} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.25, ease: "easeInOut" }} className="w-full h-full object-contain select-none" draggable={false} />
              </AnimatePresence>
              <div className="hidden md:flex absolute inset-0 pointer-events-none"><div className="w-1/3 h-full" /><div className="w-1/3 h-full" /><div className="w-1/3 h-full" /></div>
            </div>
            <div className="hidden md:flex absolute inset-y-0 left-0 right-0 items-center justify-between px-4 lg:px-6 pointer-events-none z-20 max-w-3xl mx-auto w-full">
              <button onClick={handlePrev} disabled={currentIndex === 0} className={`pointer-events-auto p-2 lg:p-3 rounded-full backdrop-blur-md transition-all ${currentIndex === 0 ? 'opacity-0 cursor-not-allowed' : 'bg-white/10 hover:bg-white/20 text-white'}`} aria-label="Previous story">
                <ChevronLeft size={24} />
              </button>
              <button onClick={handleNext} className="pointer-events-auto p-2 lg:p-3 rounded-full backdrop-blur-md bg-white/10 hover:bg-white/20 text-white transition-all" aria-label="Next story">
                <ChevronRight size={24} />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 pb-6 sm:pb-8 md:pb-10 px-4 sm:px-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 pointer-events-none max-w-2xl mx-auto w-full">
              <AnimatePresence mode="wait">
                <motion.h3 key={currentIndex} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.3 }} className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-semibold text-center drop-shadow-2xl">
                  {stories[currentIndex].caption}
                </motion.h3>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const About: React.FC = () => {
  const features = [
    { icon: Heart, title: "Passionate Craftsmanship", description: "Every piece is created with love and attention to detail, ensuring the highest quality." },
    { icon: Award, title: "Timeless Quality", description: "We believe in creating products that stand the test of time, both in style and durability." },
    { icon: Users, title: "Community Focused", description: "Building relationships with our customers and creating a community around shared values." }
  ];

  return (
    <section id="about" className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">
            Who We<span className="gradient-text block mt-2">Are</span>
          </h2>
          <div className="w-16 md:w-24 h-1 bg-maroon-800 mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-center mb-12 md:mb-16">
            <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed mb-6 md:mb-8 px-2">
              Jamaliè is a manifestation of timeless elegance. Our philosophy blends tradition, minimalism, and soulful craftsmanship into every curated drop. With each product, we aim to inspire identity, sophistication, and aesthetic harmony.
            </p>
            <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed mb-8 md:mb-12 px-2">
              Founded in 2018, our brand has grown from a small boutique to an internationally recognized name, while maintaining our commitment to quality and attention to detail. Every piece tells a story of passion and dedication.
            </p>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold gradient-text mb-12 md:mb-16">
              Jamaliè
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.2 }} whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }} className="text-center p-4 md:p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 touch-manipulation">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-maroon-800 text-white rounded-full mb-4 md:mb-6">
                  <feature.icon size={20} className="md:w-7 md:h-7" />
                </div>
                <h3 className="text-lg md:text-xl font-playfair font-semibold text-gray-900 mb-2 md:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed px-2">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.6 }} className="text-center mt-12 md:mt-16 p-6 md:p-8 bg-gradient-to-r from-maroon-50 to-terracotta-50 rounded-2xl">
            <blockquote className="text-lg md:text-2xl lg:text-3xl font-playfair font-medium text-maroon-800 italic leading-relaxed px-2">
              "Fashion fades, but style is eternal. We create pieces that transcend trends and become part of your personal story."
            </blockquote>
            <cite className="block mt-4 md:mt-6 text-base md:text-lg text-gray-600">
              — The Jamaliè Team
            </cite>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const QuoteSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-maroon-50 to-terracotta-50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-4xl mx-auto">
          <Quote className="w-12 h-12 md:w-16 md:h-16 text-maroon-800 mx-auto mb-6 opacity-60" />
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-playfair font-medium text-maroon-800 italic leading-relaxed mb-8">
            "Fashion fades, but style is eternal. We create pieces that transcend trends and become part of your personal story."
          </blockquote>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="text-lg md:text-xl text-gray-600">
            — The Jamaliè Team
          </motion.div>
          <div className="flex justify-center items-center mt-8 space-x-4">
            <div className="w-8 h-0.5 bg-maroon-800 opacity-60" />
            <div className="w-2 h-2 bg-maroon-800 rounded-full opacity-60" />
            <div className="w-8 h-0.5 bg-maroon-800 opacity-60" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#5A1E2B] text-[#D6C1A9] pt-12 pb-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-playfair font-bold mb-4 tracking-tight">Jamaliè</h3>
            <p className="font-inter font-light text-sm md:text-base leading-relaxed max-w-xs mx-auto md:mx-0">
              Timeless craftsmanship and elegant design for the discerning individual.
            </p>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-lg font-playfair font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 font-inter font-light text-sm md:text-base">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Mail size={16} className="text-[#E2725B]" />
                contact@Jamaliè.com
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <MapPin size={16} className="text-[#E2725B]" />
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-lg font-playfair font-semibold mb-4">Connect</h4>
            <div className="flex justify-center md:justify-start gap-4">
              <motion.a href="https://instagram.com/joyfeesh" target="_blank" rel="noopener noreferrer" whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} className="p-2 rounded-full border border-[#D6C1A9] text-[#D6C1A9] hover:bg-[#D6C1A9]/10 transition-colors">
                <Instagram size={18} />
              </motion.a>
            </div>
          </div>
        </motion.div>
        <div className="w-full h-px bg-[#D6C1A9]/30 my-8"></div>
        <div className="text-center font-inter font-light text-xs md:text-sm">
          <p>© {new Date().getFullYear()} Jamaliè. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// =============================================================================
// MAIN HOMEPAGE COMPONENT
// =============================================================================

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <>
      <Header />
      <Hero />
      <ProductShowcase />
      <ImageSlider />
      <Gallery />
      <About />
      <QuoteSection />
      <Footer />
    </>
  );
};

export default HomePage;