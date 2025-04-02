import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Aboutus = ({ hideHeading = false }) => {
  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.05,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="text-gray-900 dark:text-white bg-white dark:bg-[#1a1a1a] md:max_padd_container2 lg:max_padd_container pt-16 lg:pt-28 pb-16 overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-30px" }}
        variants={sectionVariants}
        className="relative"
      >
        {/* Abstract background element */}
        <motion.div
          className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full filter blur-[120px] z-0 opacity-50"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <div className="relative z-10 px-6 md:px-10">
          {/* Header - conditionally rendered based on hideHeading prop */}
          {!hideHeading && (
            <motion.div variants={fadeInUp} className="mb-16">
              <motion.h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-white/70">
                About Us
              </motion.h2>
              <motion.div
                variants={fadeIn}
                className="w-24 h-[2px] mt-2 bg-gradient-to-r from-primary to-primary/30"
              />
            </motion.div>
          )}

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 overflow-hidden">
            {/* Text Column */}
            <motion.div
              variants={fadeInUp}
              className="lg:col-span-3 lg:pr-10 order-2 lg:order-1 overflow-hidden"
            >
              <motion.div
                variants={fadeInUp}
                className="text-gray-800 dark:text-white/90 text-lg lg:text-xl font-light mb-8 leading-relaxed"
              >
                At VSA, we are passionate about shaping the built environment
                through innovative architecture, interior design, urban design,
                and master planning. Our multidisciplinary team brings together
                creativity, technical expertise, and a deep understanding of
                space to craft environments that are not only visually striking
                but also highly functional and sustainable.
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="text-gray-700 dark:text-white/80 mb-10 leading-relaxed"
              >
                Our commitment to excellence drives us to push the boundaries of
                design, creating spaces that inspire and elevate the human
                experience. We believe in a collaborative process, working
                closely with our clients to understand their vision and
                translate it into reality.
              </motion.div>

              {/* Service Badges */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-3 mb-10"
              >
                {[
                  "Architecture",
                  "Interior Design",
                  "Urban Planning",
                  "Master Planning",
                  "Landscape Design",
                ].map((service, i) => (
                  <motion.span
                    key={i}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(240, 115, 74, 0.2)",
                    }}
                    className="px-4 py-2 rounded-full border border-primary/30 text-sm text-primary/90 backdrop-blur-sm"
                  >
                    {service}
                  </motion.span>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div variants={fadeInUp}>
                <Link to="/about">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-primary transition duration-300 ease-out border border-primary rounded-xl shadow-md group"
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-primary group-hover:translate-x-0 ease">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-primary transition-all duration-300 transform group-hover:translate-x-full ease">
                      Discover More
                    </span>
                    <span className="relative invisible">Discover More</span>
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Image Column */}
            <motion.div
              variants={fadeInUp}
              className="lg:col-span-2 order-1 lg:order-2 overflow-hidden"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                {/* Image overlay effects */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-primary/20 z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                />

                {/* Image */}
                <motion.div
                  className="w-full overflow-hidden"
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  <img
                    src="https://vsa-architect.s3.ap-south-1.amazonaws.com/Website+3D/Urban+Design-Masterplanning/Victoria+Garden/master+plan/final+view+2+COLONY.webp"
                    alt="VSA Architecture"
                    className="w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </motion.div>

                {/* Floating Element */}
                <motion.div
                  className="absolute bottom-6 left-6 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full z-20 font-light text-sm text-white"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <span className="text-primary font-medium">30+ Years</span> of
                  Excellence
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Aboutus;
