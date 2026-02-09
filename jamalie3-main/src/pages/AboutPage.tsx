import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Award, Users, Target, Eye, Sparkles } from 'lucide-react';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: "Passionate Craftsmanship",
      description: "Every piece is created with love and attention to detail, ensuring the highest quality."
    },
    {
      icon: Award,
      title: "Timeless Quality",
      description: "We believe in creating products that stand the test of time, both in style and durability."
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "Building relationships with our customers and creating a community around shared values."
    }
  ];

  const milestones = [
    { year: "2018", title: "Founded", description: "Jamaliè was born from a vision of timeless elegance" },
    { year: "2020", title: "First Collection", description: "Launched our signature line of artisan products" },
    { year: "2022", title: "International Recognition", description: "Featured in major fashion publications worldwide" },
    { year: "2024", title: "Sustainable Future", description: "Committed to eco-friendly practices and materials" }
  ];

  return (
    <div className="pt-16 md:pt-24">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-[#F8F3E9] to-[#F7D9C9]">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-[#2D3436] mb-4">
              About
              <span className="text-[#800020] block mt-2">Jamaliè</span>
            </h1>
            <p className="text-base md:text-lg text-[#555555] leading-relaxed mb-8">
              A story of passion, craftsmanship, and timeless elegance that began with a simple belief: 
              true beauty lies in the details.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-[#2D3436] mb-4">
                Our Story
              </h2>
              <div className="space-y-4 text-[#555555] leading-relaxed text-sm md:text-base">
                <p>
                  Jamaliè was born from a vision to create something truly special in a world of mass production. 
                  Founded in 2018, our journey began with a simple question: "What if we could bring back the 
                  art of thoughtful design and meticulous craftsmanship?"
                </p>
                <p>
                  Our founder, inspired by travels across artisan communities worldwide, discovered that the 
                  most beautiful creations came from those who poured their heart and soul into their work. 
                  This revelation became the cornerstone of our philosophy.
                </p>
                <p>
                  Today, Jamaliè stands as a testament to the power of passion-driven creation. Every product 
                  in our collection tells a story of dedication, quality, and the pursuit of timeless elegance.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2 relative"
            >
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Our Story"
                className="rounded-xl shadow-lg w-full h-auto object-cover aspect-square"
              />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#800020] rounded-full opacity-20 hidden md:block" />
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#E07A5F] rounded-full opacity-30 hidden md:block" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-16 bg-[#F8F8F8]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#800020] rounded-full flex items-center justify-center mr-3">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-playfair font-bold text-[#2D3436]">Our Mission</h3>
              </div>
              <p className="text-[#555555] leading-relaxed text-sm">
                To create exceptional products that inspire confidence and celebrate individual style. 
                We are committed to sustainable practices, ethical sourcing, and supporting artisan 
                communities worldwide while delivering uncompromising quality to our customers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#E07A5F] rounded-full flex items-center justify-center mr-3">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-playfair font-bold text-[#2D3436]">Our Vision</h3>
              </div>
              <p className="text-[#555555] leading-relaxed text-sm">
                To become the world's most trusted name in luxury craftsmanship, where every product 
                represents the perfect harmony of tradition and innovation. We envision a future where 
                quality triumphs over quantity, and every purchase makes a positive impact.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-[#2D3436] mb-3">
              Our Values
            </h2>
            <p className="text-[#555555] text-sm md:text-base max-w-2xl mx-auto">
              The principles that guide everything we do and shape who we are as a brand.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center p-5 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#800020] text-white rounded-full mb-4">
                  <value.icon size={20} />
                </div>
                <h3 className="text-lg font-playfair font-semibold text-[#2D3436] mb-2">
                  {value.title}
                </h3>
                <p className="text-[#555555] leading-relaxed text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-[#F8F3E9] to-[#F7D9C9]">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-[#2D3436] mb-3">
              Our Journey
            </h2>
            <p className="text-[#555555] text-sm md:text-base max-w-2xl mx-auto">
              Key milestones that have shaped our story and defined our path forward.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} mb-8`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'pr-4 md:pr-8' : 'pl-4 md:pl-8'}`}>
                  <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
                    <h3 className="text-lg md:text-xl font-playfair font-bold text-[#800020] mb-1">
                      {milestone.title}
                    </h3>
                    <p className="text-[#555555] leading-relaxed text-sm">
                      {milestone.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex-shrink-0 w-12 h-12 bg-[#800020] rounded-full flex items-center justify-center text-white font-bold text-sm relative">
                  {milestone.year}
                  {index < milestones.length - 1 && (
                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-[#800020] opacity-30" />
                  )}
                </div>
                
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center bg-gradient-to-r from-[#800020] to-[#E07A5F] text-white p-8 md:p-12 rounded-2xl"
          >
            <Sparkles className="w-10 h-10 mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">
              Join Our Story
            </h2>
            <p className="text-sm md:text-base mb-6 opacity-90 max-w-2xl mx-auto">
              Become part of the Jamaliè family and experience the difference that passion and 
              craftsmanship can make in your life.
            </p>
            <motion.a
              href="/collection"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-[#800020] px-6 py-3 rounded-full font-semibold text-sm md:text-base hover:shadow-lg transition-all duration-300"
            >
              Explore Our Collection
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;