import React from "react";
import { motion } from "framer-motion";

const Experience = () => {
  // Animation variants - simplified
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Experience data
  const stats = [
    { number: "30+", text: "Years of Experience" },
    { number: "1k+", text: "Projects" },
    { number: "2k+", text: "Happy Clients" },
  ];

  return (
    <div className="bg-white dark:bg-[#1a1a1a] md:max_padd_container2 lg:max_padd_container pt-5 lg:pt-16 pb-16 overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        className="relative"
      >
        <div className="relative px-6 md:px-10">
          {/* Header */}
          <motion.div variants={fadeIn} className="mb-14">
            <h2 className="text-3xl md:text-5xl font-medium text-gray-900 dark:text-white">Our Experience</h2>
            <div className="w-16 h-[1px] mt-3 bg-primary"></div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {stats.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                custom={index}
                className="border-b border-gray-200 dark:border-white/10 pb-4"
              >
                <motion.p className="text-5xl md:text-6xl text-primary mb-3 font-light">
                  {item.number}
                </motion.p>
                <p className="text-lg text-gray-700 dark:text-white/70">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Content Section - Two Column */}
          <motion.div
            variants={fadeIn}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          >
            {/* Text Column */}
            <div className="order-2 lg:order-1 space-y-6 lg:pt-4">
              <motion.h3 variants={fadeInUp} className="text-2xl font-light text-gray-900 dark:text-white">
                Delivering Excellence in{" "}
                <span className="text-primary">Architecture</span>
              </motion.h3>
              <motion.p
                variants={fadeInUp}
                className="text-gray-700 dark:text-white/80 leading-relaxed"
              >
                With over three decades of experience, we've built a reputation
                for creating distinctive spaces that blend aesthetics,
                functionality, and sustainability. Our team's dedication to
                excellence is reflected in our extensive portfolio of successful
                projects.
              </motion.p>

              {/* Key metrics - minimal styling */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 pt-4">
                {[
                  { metric: "100%", desc: "Client satisfaction" },
                  { metric: "60+", desc: "Awards" },
                  {
                    metric: "M.Arch from London",
                    desc: "Qualified Architects",
                  },
                  { metric: "1k+", desc: "Completions" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="border-l border-primary/30 pl-3"
                  >
                    <span className="text-lg font-medium block text-gray-900 dark:text-white">
                      {item.metric}
                    </span>
                    <span className="text-gray-600 dark:text-white/60 text-sm">{item.desc}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Image Column - Clean, minimal frame */}
            <motion.div
              variants={fadeInUp}
              className="order-1 lg:order-2 overflow-hidden"
            >
              <div className="overflow-hidden rounded-md">
                <img
                  src="https://vsa-architect.s3.ap-south-1.amazonaws.com/Website+3D/Commercial/BAR/BAR01+ps01.webp"
                  alt="Architectural Excellence"
                  className="w-full h-auto object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Experience;
