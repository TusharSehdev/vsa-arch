import React from "react";
import Header from "../components/Header";
import SwiperCarousel from "../components/HomeComponents/SwiperCarousel";
import Aboutus from "../components/Aboutus";
import Experience from "../components/HomeComponents/Experience";
import Expertise from "../components/HomeComponents/Expertise";
import Testimonials from "../components/HomeComponents/Testimonials";
import FeaturedProjects from "../components/HomeComponents/FeaturedProjects";
import ContactCTA from "../components/HomeComponents/ContactCTA";
import SEO from "../components/SEO";
import { motion } from "framer-motion";

const Home = () => {
  const keywords = `
    architects in Jalandhar, interior design Jalandhar, landscape design Punjab,
    urban design firms India, master planning services, sustainable architecture India,
    residential architects Jalandhar, commercial architects Punjab, innovative architecture firm Jalandhar,
    architectural design services, landmark building design, collaborative architecture firms,
    large-scale urban developments India, creative architectural solutions, functional architectural design,
    space planning experts, vibrant urban community design, architectural excellence India,
    architecture for quality of life, multidisciplinary design team Jalandhar, visionary architecture projects,
    end-to-end architecture services, exterior and interior architecture Jalandhar, environmentally friendly architecture,
    urban space planning Punjab, residential and commercial design, custom architecture projects India,
    architecture to elevate human experience, holistic design services Jalandhar, premium design studio Jalandhar,
    award-winning architects Punjab, eco-friendly building design, modern architecture Punjab, innovative building solutions,
    luxury home architects Jalandhar, commercial complex design, office space design Jalandhar, green building consultants Punjab,
    heritage conservation architecture, mixed-use development design, institutional building architects, healthcare facility design Punjab,
    hospitality architecture Jalandhar, retail space design Punjab, cultural space architects, educational institution design,
    urban renewal projects India, smart city planning Punjab, high-end residential design, biophilic architecture India,
    climate-responsive design Punjab, parametric architecture, contemporary design solutions, integrated design approach,
    architectural visualization services, 3D architectural rendering Punjab, architecture project management, design-build services
  `;

  const description =
    "VSA Architects is a premier architectural firm in Jalandhar, Punjab specializing in innovative and sustainable design solutions for residential, commercial, and urban projects. Our multidisciplinary team delivers excellence in architectural design, interior design, landscape design, and master planning services across India.";

  return (
    <>
      <SEO
        title="Home"
        description={description}
        keywords={keywords}
        canonicalUrl="/"
        breadcrumb={true}
      />
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="overflow-hidden"
      >
        <SwiperCarousel />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Aboutus />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Experience />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <FeaturedProjects />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Expertise />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Testimonials />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <ContactCTA />
      </motion.div>
    </>
  );
};

export default Home;
