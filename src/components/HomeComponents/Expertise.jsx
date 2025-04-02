import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const expertiseData = [
  {
    title: "Residential",
    description:
      "At VSA, We design residential properties that blend beauty, comfort, and functionality. From cozy homes to luxurious estates, our tailored approach ensures every space reflects the unique lifestyle of our clients.",
    images: [
      "https://vsa-architect.s3.ap-south-1.amazonaws.com/Website+3D/residential/Rajesh+Gurdaspur/1.webp",
      "https://vsa-architect.s3.ap-south-1.amazonaws.com/Website+3D/residential/UE-II/1.webp",
    ],
  },
  {
    title: "Commercial",
    description:
      "We design commercial spaces that are functional, innovative, and visually striking. Our goal is to create environments that enhance productivity and leave a lasting impression, tailored to meet the unique needs of your business.",
    images: [
      "https://vsa-architect.s3.ap-south-1.amazonaws.com/Website+3D/Commercial/GYM/GYM01+ps.webp",
      "https://vsa-architect.s3.ap-south-1.amazonaws.com/Website+3D/Commercial/Geeta+Mandir/render+gray+02+ps.webp",
    ],
  },
  {
    title: "Interior Design",
    description:
      "We craft interiors that are both stylish and practical, reflecting the personality and preferences of our clients. Our designs create inviting, functional spaces that enhance the way you live and work.",
    images: [
      "https://vsa-architect.s3.ap-south-1.amazonaws.com/Website+3D/residential/Bali+Travels/FINAL+VIEW+dwg+room+25-6-2022.webp",
      "https://vsa-architect.s3.ap-south-1.amazonaws.com/Website+3D/residential/Bali+Travels/grayyyy.webp",
    ],
  },
  {
    title: "Urban Design / Master Planning",
    description:
      "At VSA, we specialize in urban design that shapes vibrant, sustainable communities. Our approach integrates architecture, landscape, and public space to create cohesive, livable environments that enrich urban life.",
    images: [
      "https://vsa-architect.s3.ap-south-1.amazonaws.com/Website+3D/Urban+Design-Masterplanning/Ameek's+Paradise/to+be+revised/jalander+comercal+ex02+ps.webp",
      "https://vsa-architect.s3.ap-south-1.amazonaws.com/Website+3D/Urban+Design-Masterplanning/Victoria+Garden/master+plan/final+view+2+COLONY.webp",
    ],
  },
  {
    title: "Landscape Design",
    description:
      "We design landscapes that harmonize with the natural environment and architectural elements. Our creative solutions enhance outdoor spaces, making them both beautiful and functional, tailored to complement your property.",
    images: [
      "https://vsa-architect.s3.ap-south-1.amazonaws.com/Website+3D/residential/Bali+Travels/back+yard+view+ps.webp",
      "https://vsa-architect.s3.ap-south-1.amazonaws.com/Website+3D/residential/Bali+Travels/terrace.webp",
    ],
  },
];

const Expertise = () => {
  // Simple animation variants
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

  return (
    <div className="bg-white dark:bg-[#1a1a1a] md:max_padd_container2 lg:max_padd_container pt-16 lg:pt-20 pb-16 overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        className="relative"
      >
        <div className="px-6 md:px-10">
          {/* Header */}
          <motion.div variants={fadeIn} className="mb-14">
            <h2 className="text-3xl md:text-5xl font-medium text-gray-900 dark:text-white">Our Expertise</h2>
            <div className="w-16 h-[1px] mt-3 bg-primary"></div>
          </motion.div>

          {/* Expertise Sections */}
          <div className="space-y-24">
            {expertiseData.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12"
              >
                {/* Text Column */}
                <div className="lg:col-span-4 order-2 lg:order-1 flex flex-col">
                  <div className="border-l border-primary/40 pl-4">
                    <h3 className="text-2xl lg:text-3xl font-light text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                  </div>

                  <p className="mt-6 text-gray-700 dark:text-white/80 leading-relaxed">
                    {item.description}
                  </p>

                  <Link
                    to="/projects"
                    className="mt-auto pt-6 inline-flex items-center text-primary hover:text-gray-900 dark:hover:text-white transition-colors duration-300 group"
                  >
                    <span className="mr-2">See Projects</span>
                    <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </Link>
                </div>

                {/* Image Column */}
                <div className="lg:col-span-8 order-1 lg:order-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.images.map((image, idx) => (
                      <motion.div
                        key={idx}
                        className="overflow-hidden"
                        transition={{ duration: 0.5 }}
                      >
                        <img
                          src={image}
                          alt={`${item.title} ${idx + 1}`}
                          loading="lazy"
                          className="w-full h-auto object-contain"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Expertise;
