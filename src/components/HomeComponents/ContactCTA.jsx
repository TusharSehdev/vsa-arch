import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ContactCTA = () => {
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
    <div className="bg-white dark:bg-[#1a1a1a] md:max_padd_container2 lg:max_padd_container pt-16 lg:pt-20 pb-16 overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        className="relative"
      >
        {/* Background element */}
        <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
          <motion.div
            variants={fadeIn}
            className="w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-40"
          ></motion.div>
        </div>

        <div className="relative z-10">
          <div className="px-6 md:px-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div variants={fadeInUp} className="mb-8">
                <h2 className="text-3xl md:text-5xl font-medium mb-5 text-gray-900 dark:text-white">
                  Ready to transform your space?
                </h2>
                <p className="text-gray-700 dark:text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto">
                  Let's collaborate to create something extraordinary. Whether
                  you have a specific project in mind or need guidance, we're
                  here to help.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col md:flex-row gap-5 justify-center items-center"
              >
                <Link
                  to="/contact"
                  className="px-8 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors duration-300 min-w-[180px]"
                >
                  Contact Us
                </Link>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-gray-700 dark:text-white/70">or call us at</p>
                </div>
                <a
                  href="tel:+919876543210"
                  className="text-gray-900 dark:text-white hover:text-primary transition-colors duration-300 font-medium"
                >
                  +91 98765 43210
                </a>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="mt-12 flex justify-center space-x-8"
              >
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-1 text-gray-900 dark:text-white">Visit Our Office</h3>
                  <p className="text-gray-600 dark:text-white/60 text-sm">
                    123 Architecture Plaza, Jalandhar, Punjab
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-1 text-gray-900 dark:text-white">Email Us</h3>
                  <a
                    href="mailto:info@vsaarchitects.com"
                    className="text-gray-600 dark:text-white/60 text-sm hover:text-primary transition-colors duration-300"
                  >
                    info@vsaarchitects.com
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactCTA;
 