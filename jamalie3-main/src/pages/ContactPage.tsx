import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Instagram } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
    
    // Show success message (you can implement a toast notification here)
    alert('Thank you for your message! We\'ll get back to you soon.');
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Luxury Avenue", "Paris, France 75001"],
      action: "Get Directions"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["jamalimahmudjoy@gmail.com", "jamalimahmudjoy@gmail.com"],
      action: "Send Email"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat - Sun: 10:00 AM - 4:00 PM"],
      action: null
    }
  ];

  return (
    <div className="pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-maroon-50 to-terracotta-50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-6">
              Get In
              <span className="gradient-text block mt-2">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-maroon-800 text-white rounded-full mb-4">
                  <info.icon size={20} />
                </div>
                <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1 mb-4">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
                {info.action && (
                  <button className="text-maroon-800 font-medium text-sm hover:text-maroon-600 transition-colors duration-200">
                    {info.action}
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Quick Actions */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-all duration-200"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-all duration-200"
                      placeholder="jamalimahmudjoy@gmail.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-all duration-200"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-all duration-200 resize-vertical"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-maroon-800 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-maroon-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Quick Actions & Social */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-900 mb-6">
                  Quick Actions
                </h2>
                <div className="space-y-4">
                  <motion.a
                    href="https://wa.me/8801881445154?text=Hello, I'd like to know more about Jamaliè products"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-all duration-200 group"
                  >
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-green-700">WhatsApp Us</h3>
                      <p className="text-sm text-gray-600">Get instant support via WhatsApp</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://www.instagram.com/joyfeesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-4 p-4 bg-pink-50 border border-pink-200 rounded-lg hover:bg-pink-100 transition-all duration-200 group"
                  >
                    <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white">
                      <Instagram size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-pink-700">Follow Us</h3>
                      <p className="text-sm text-gray-600">Stay updated with our latest collections</p>
                    </div>
                  </motion.a>
                </div>
              </div>

              {/* FAQ Section */}
              <div>
                <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <span className="font-medium text-gray-900">What are your shipping options?</span>
                      <span className="text-gray-500 group-open:rotate-180 transition-transform duration-200">▼</span>
                    </summary>
                    <div className="p-3 text-gray-600 text-sm">
                      We offer worldwide shipping with express and standard options. Delivery times vary by location.
                    </div>
                  </details>
                  
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <span className="font-medium text-gray-900">Do you offer custom orders?</span>
                      <span className="text-gray-500 group-open:rotate-180 transition-transform duration-200">▼</span>
                    </summary>
                    <div className="p-3 text-gray-600 text-sm">
                      Yes! We love creating custom pieces. Contact us to discuss your specific requirements.
                    </div>
                  </details>
                  
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <span className="font-medium text-gray-900">What is your return policy?</span>
                      <span className="text-gray-500 group-open:rotate-180 transition-transform duration-200">▼</span>
                    </summary>
                    <div className="p-3 text-gray-600 text-sm">
                      We offer a 30-day return policy for unused items in original condition. Custom orders are non-returnable.
                    </div>
                  </details>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-12 md:py-16 bg-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="h-64 md:h-96 bg-gradient-to-br from-maroon-100 to-terracotta-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-maroon-800 mx-auto mb-4" />
                <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-2">Visit Our Showroom</h3>
                <p className="text-gray-600">123 Luxury Avenue, Paris, France</p>
                <button className="mt-4 bg-maroon-800 text-white px-6 py-2 rounded-full hover:bg-maroon-700 transition-colors duration-200">
                  Get Directions
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;