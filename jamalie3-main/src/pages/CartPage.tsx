import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const orderSummary = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} (x${item.quantity}) – ${item.price * item.quantity} BDT`
      )
      .join('\n');

    const total = getCartTotal();
    const message = `Hello Jamaliè, I'd like to order the following items:\n\n${orderSummary}\n\nTotal: ${total} BDT\n\nPlease confirm availability.`;

    const whatsappUrl = `https://wa.me/8801881445154?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="pt-20 bg-[#F5F0E8] min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <Link
              to="/collection"
              className="inline-flex items-center gap-2 text-[#5A1E2B] hover:text-[#E2725B] transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-inter text-sm">Continue Shopping</span>
            </Link>
          </div>

          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-[#5A1E2B] mb-2 tracking-tight">
            Your Cart
          </h1>
          <p className="text-base font-inter font-light text-[#5A1E2B]/80 mb-8">
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
          </p>

          {cart.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center py-20"
            >
              <ShoppingBag size={64} className="mx-auto text-[#D6C1A9] mb-4" />
              <h2 className="text-2xl font-playfair font-semibold text-[#5A1E2B] mb-2">
                Your cart is empty
              </h2>
              <p className="text-base font-inter text-[#5A1E2B]/80 mb-6">
                Add some beautiful pieces to get started
              </p>
              <Link
                to="/collection"
                className="inline-flex items-center gap-2 bg-[#5A1E2B] text-[#D6C1A9] px-6 py-3 rounded-full font-inter font-medium hover:bg-[#5A1E2B]/90 transition-colors"
              >
                Browse Collection
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-4 md:p-6 border border-[#D6C1A9]/30 hover:border-[#E2725B]/50 transition-all"
                  >
                    <div className="flex gap-4">
                      <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg md:text-xl font-playfair font-semibold text-[#5A1E2B] mb-1">
                            {item.name}
                          </h3>
                          <p className="text-base md:text-lg font-medium text-[#E2725B]">
                            {item.price} BDT
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3 bg-[#F5F0E8] rounded-full p-1">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#5A1E2B] hover:bg-[#D6C1A9]/20 transition-colors"
                            >
                              <Minus size={16} />
                            </motion.button>
                            <span className="w-8 text-center font-inter font-medium text-[#5A1E2B]">
                              {item.quantity}
                            </span>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#5A1E2B] hover:bg-[#D6C1A9]/20 transition-colors"
                            >
                              <Plus size={16} />
                            </motion.button>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#E2725B] hover:text-[#5A1E2B] transition-colors"
                          >
                            <Trash2 size={20} />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-1"
              >
                <div className="bg-white rounded-xl p-6 border border-[#D6C1A9]/30 sticky top-24">
                  <h2 className="text-2xl font-playfair font-semibold text-[#5A1E2B] mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="font-inter text-[#5A1E2B]/80">
                          {item.name} (x{item.quantity})
                        </span>
                        <span className="font-inter font-medium text-[#5A1E2B]">
                          {item.price * item.quantity} BDT
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#D6C1A9]/30 pt-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-lg font-playfair font-semibold text-[#5A1E2B]">
                        Total
                      </span>
                      <span className="text-lg font-playfair font-semibold text-[#E2725B]">
                        {getCartTotal()} BDT
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="w-full bg-[#E2725B] text-white py-3 rounded-full font-inter font-medium hover:bg-[#E2725B]/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={20} />
                    Checkout via WhatsApp
                  </motion.button>

                  <p className="text-xs font-inter text-[#5A1E2B]/60 text-center mt-4">
                    You'll be redirected to WhatsApp to complete your order
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CartPage;
