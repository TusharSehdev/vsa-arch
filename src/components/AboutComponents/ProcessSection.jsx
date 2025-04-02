import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We begin by understanding your vision, requirements, and constraints through in-depth discussions and site analysis.",
  },
  {
    number: "02",
    title: "Concept Development",
    description: "Our team creates preliminary design concepts that align with your goals, exploring various aesthetic and functional possibilities.",
  },
  {
    number: "03",
    title: "Design Refinement",
    description: "We refine the chosen concept, incorporating your feedback and developing detailed plans with precise specifications.",
  },
  {
    number: "04",
    title: "Documentation",
    description: "We prepare comprehensive technical drawings and documentation required for approvals, permits, and construction.",
  },
  {
    number: "05",
    title: "Construction",
    description: "During construction, we provide oversight to ensure the project is built according to our design specifications.",
  },
  {
    number: "06",
    title: "Completion",
    description: "We conduct final inspections and ensure all details meet our standards before the project is handed over to you.",
  }
];

const ProcessSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-medium text-gray-900 dark:text-white mb-4">Our Design Process</h2>
        <div className="w-16 h-1 bg-gray-900 dark:bg-white mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          We follow a structured yet flexible approach to transform your vision into exceptional architectural reality.
        </p>
      </div>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
        
        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div 
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gray-900 dark:bg-white border-4 border-white dark:border-[#121212] z-10"></div>
                
                {/* Content */}
                <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                  <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-800">
                    <div className="text-4xl font-light text-gray-400 dark:text-gray-500 mb-2">{step.number}</div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                  </div>
                </div>
                
                {/* Empty space for opposite side */}
                <div className="md:w-5/12"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessSection; 