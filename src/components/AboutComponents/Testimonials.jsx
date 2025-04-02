import React, { useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    quote: "VSA Architects transformed our vision into a stunning reality. Their attention to detail and innovative approach created a space that exceeds our expectations.",
    author: "Sunil Kapoor",
    position: "Homeowner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    quote: "Working with VSA on our corporate headquarters was a seamless experience. Their team balanced aesthetic beauty with functionality, creating a workspace our employees love.",
    author: "Meera Joshi",
    position: "CEO, InnoTech Solutions",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    quote: "The team at VSA Architects brought exceptional expertise to our hospitality project. Their design perfectly captures our brand while creating an inviting atmosphere for guests.",
    author: "Rahul Mehta",
    position: "Director, Lotus Hotels",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 4,
    quote: "Their sustainable design approach not only reduced our environmental footprint but also created significant long-term energy savings. VSA delivered both beauty and efficiency.",
    author: "Priya Singh",
    position: "Sustainability Officer, Green Urban Development",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  }
];

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handleNext = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleDotClick = (index) => {
    setActiveTestimonial(index);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-medium text-gray-900 dark:text-white mb-4">Client Testimonials</h2>
        <div className="w-16 h-1 bg-gray-900 dark:bg-white mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover what our clients have to say about their experience working with VSA Architects.
        </p>
      </div>

      <div className="relative">
        <div className="max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: index === activeTestimonial ? 1 : 0,
                x: index === activeTestimonial ? 0 : (index < activeTestimonial ? -50 : 50)
              }}
              transition={{ duration: 0.5 }}
              className={`absolute top-0 left-0 right-0 ${index === activeTestimonial ? 'z-10' : 'z-0'}`}
              style={{ display: index === activeTestimonial ? 'block' : 'none' }}
            >
              <div className="bg-white dark:bg-[#1e1e1e] p-8 md:p-12 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 text-center">
                <svg className="w-10 h-10 mx-auto mb-6 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
                
                <p className="text-xl text-gray-700 dark:text-gray-200 mb-8 leading-relaxed">
                  {testimonial.quote}
                </p>
                
                <div className="flex items-center justify-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div className="text-left">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {testimonial.position}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mt-8">
          <button 
            onClick={handlePrev}
            className="bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white p-3 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-800 focus:outline-none"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full focus:outline-none transition-colors duration-300 ${
                  index === activeTestimonial 
                    ? 'bg-gray-900 dark:bg-white' 
                    : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white p-3 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-800 focus:outline-none"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials; 