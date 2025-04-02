import React, { useEffect } from "react";
import Header from "../components/Header";
import Aboutus from "../components/Aboutus";
import Experience from "../components/HomeComponents/Experience";
import SEO from "../components/SEO";
import { motion } from "framer-motion";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const keywords = `
    About architects Jalandhar, Our team Jalandhar architects, Jalandhar architecture firm profile, 
    Meet the architects Jalandhar, Jalandhar design experts, Architecture services Jalandhar, 
    Jalandhar architectural expertise, Experienced architects Jalandhar, Jalandhar architectural professionals, 
    About our firm Jalandhar, Jalandhar design team, Company history Jalandhar architects, 
    Jalandhar architects background, Our approach Jalandhar, Jalandhar architecture philosophy, 
    Jalandhar architecture firm, Our mission Jalandhar architects, Jalandhar architectural innovation, 
    Professional team Jalandhar architects, About our projects Jalandhar, Jalandhar architectural achievements, 
    Jalandhar design consultants, Team of architects Jalandhar, Jalandhar architects team, 
    Company values Jalandhar architects, Jalandhar design professionals, Our story Jalandhar architects, 
    Architecture practice Jalandhar, Jalandhar firm history, Jalandhar architectural excellence, 
    Our designers Jalandhar, Jalandhar project leaders, Our team experience Jalandhar, 
    About us Jalandhar architects, Jalandhar architecture experts, Team expertise Jalandhar, 
    Jalandhar firm profile, Design professionals Jalandhar, Jalandhar architecture team, 
    Firm values Jalandhar, Jalandhar architecture company, Meet our team Jalandhar, 
    Jalandhar architectural consultants, About us Jalandhar design, Jalandhar design practice, 
    Firm achievements Jalandhar, Jalandhar architectural leaders, Our vision Jalandhar architects, 
    architecture firm history Punjab, award-winning design team Jalandhar, expert architectural consultants, 
    innovative design approach India, sustainable design philosophy Punjab
  `;

  const description =
    "Learn about VSA Architects, a premier architectural firm in Jalandhar. We are a team of passionate architects and designers committed to creating innovative, sustainable, and aesthetically pleasing spaces that enhance the quality of life.";

  return (
    <>
      <SEO
        title="About Us"
        description={description}
        keywords={keywords}
        canonicalUrl="/about"
        breadcrumb={true}
      />
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
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
    </>
  );
};

export default About;
