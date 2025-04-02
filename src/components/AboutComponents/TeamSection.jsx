import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Aisha Patel",
    role: "Principal Architect",
    bio: "With over 15 years of experience, Aisha leads our firm with a passion for sustainable design and cultural preservation.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Rajiv Singh",
    role: "Senior Architect",
    bio: "Rajiv specializes in modern residential architecture with an emphasis on space optimization and natural lighting.",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Nisha Kumar",
    role: "Interior Designer",
    bio: "Nisha brings spaces to life with her keen eye for detail and ability to blend aesthetics with functionality.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Vikram Malhotra",
    role: "Urban Planner",
    bio: "Vikram's expertise in urban development helps integrate our projects seamlessly into their surrounding environment.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Priya Sharma",
    role: "Project Manager",
    bio: "Priya ensures that all projects remain on schedule and within budget while maintaining the highest quality standards.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Arjun Mehta",
    role: "Architectural Technologist",
    bio: "Arjun specializes in implementing cutting-edge technologies to enhance our design and construction processes.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
  }
];

const TeamSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-medium text-gray-900 dark:text-white mb-4">Our Team</h2>
        <div className="w-16 h-1 bg-gray-900 dark:bg-white mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Meet the talented individuals who bring expertise, passion, and creativity to every project we undertake.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group"
          >
            <div className="bg-white dark:bg-[#1e1e1e] overflow-hidden rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-800">
              <div className="relative">
                <div className="aspect-w-4 aspect-h-3 w-full overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-indigo-600 dark:text-indigo-400 mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection; 