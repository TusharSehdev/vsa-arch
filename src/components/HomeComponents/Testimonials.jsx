import React, { useState } from "react";
import { motion } from "framer-motion";

const testimonialData = [
  {
    quote:
      "VSA Architects transformed our vision into reality with exceptional attention to detail and innovative solutions. Their team was responsive and professional throughout the entire process.",
    author: "Rajesh Sharma",
    position: "Residential Client",
  },
  {
    quote:
      "Working with VSA on our commercial project was a seamless experience. They understood our brand identity and created a space that perfectly reflects our company culture and enhances productivity.",
    author: "Priya Patel",
    position: "CEO, InnoTech Solutions",
  },
  {
    quote:
      "The landscape design VSA created for our property has completely transformed our outdoor living experience. Their sustainable approach and creative vision exceeded our expectations.",
    author: "Vikram Singh",
    position: "Landscape Client",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-[#1a1a1a] md:max_padd_container2 lg:max_padd_container pt-16 lg:pt-20 pb-16 overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        className="relative"
      >
        <div className="px-6 md:px-10">
          {/* Header */}
          <motion.div variants={fadeIn} className="mb-14">
            <h2 className="text-3xl md:text-5xl font-medium">
              Client Testimonials
            </h2>
            <div className="w-16 h-[1px] mt-3 bg-primary"></div>
          </motion.div>

          {/* Testimonial Section */}
          <div className="max-w-4xl mx-auto">
            {/* Quote content */}
            <motion.div variants={fadeInUp} className="relative">
              <div className="absolute -top-10 -left-6 text-8xl text-primary/10 font-serif">
                "
              </div>
              <div className="absolute -bottom-14 -right-6 text-8xl text-primary/10 font-serif rotate-180">
                "
              </div>

              <div className="relative border-l-2 border-primary/30 pl-8 py-8">
                {testimonialData.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: activeIndex === index ? 1 : 0,
                      x: activeIndex === index ? 0 : 20,
                      position: activeIndex === index ? "relative" : "absolute",
                    }}
                    className="w-full"
                    style={{
                      display: activeIndex === index ? "block" : "none",
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-xl md:text-2xl font-light text-white/90 leading-relaxed mb-8">
                      {testimonial.quote}
                    </p>
                    <div className="flex flex-col md:flex-row md:items-center md:border-t border-white/10 pt-6 mt-6">
                      <p className="font-medium text-primary text-lg md:text-xl">
                        {testimonial.author}
                      </p>
                      <span className="hidden md:inline-block mx-3 text-white/30">
                        |
                      </span>
                      <p className="text-white/70">{testimonial.position}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div
              variants={fadeIn}
              className="flex justify-center mt-16 space-x-1"
            >
              {testimonialData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`p-1 focus:outline-none transition-all duration-300 ${
                    activeIndex === index
                      ? "opacity-100 scale-125"
                      : "opacity-50 hover:opacity-75"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <div
                    className={`w-12 h-1 ${
                      activeIndex === index ? "bg-primary" : "bg-white/30"
                    }`}
                  ></div>
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Testimonials;
