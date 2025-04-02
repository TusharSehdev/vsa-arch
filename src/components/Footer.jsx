import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#1a1a1a] overflow-hidden">
      {/* Main Footer Content */}
      <div className="md:max_padd_container2 lg:max_padd_container border-t border-gray-200 dark:border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Column - CTA */}
          <div className="px-6 md:px-10 py-16 lg:py-24 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight leading-tight mb-8 text-gray-900 dark:text-white">
                Let's <span className="text-primary">collaborate</span>
              </h2>

              <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-12">
                <Link
                  to="/contact"
                  className="inline-block border border-primary px-8 py-3 text-sm text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  Get in touch
                </Link>
                <a
                  href="mailto:vsa.architects@gmail.com"
                  className="inline-block text-sm text-gray-700 dark:text-white/70 hover:text-primary dark:hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">vsa.architects@gmail.com</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Info & Links */}
          <div className="px-6 md:px-10 py-16 lg:py-24 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-white/10 flex flex-col justify-between">
            {/* Links Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-12">
              {/* Column 1 */}
              <div>
                <p className="text-xs text-gray-500 dark:text-white/40 uppercase tracking-wider mb-4">
                  Navigate
                </p>
                <div className="space-y-3">
                  <Link
                    to="/"
                    className="block text-gray-700 dark:text-white/80 hover:text-primary dark:hover:text-primary transition-colors duration-300"
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className="block text-gray-700 dark:text-white/80 hover:text-primary dark:hover:text-primary transition-colors duration-300"
                  >
                    About
                  </Link>
                  <Link
                    to="/projects"
                    className="block text-gray-700 dark:text-white/80 hover:text-primary dark:hover:text-primary transition-colors duration-300"
                  >
                    Projects
                  </Link>
                  <Link
                    to="/contact"
                    className="block text-gray-700 dark:text-white/80 hover:text-primary dark:hover:text-primary transition-colors duration-300"
                  >
                    Contact
                  </Link>
                </div>
              </div>

              {/* Column 2 */}
              <div>
                <p className="text-xs text-gray-500 dark:text-white/40 uppercase tracking-wider mb-4">
                  Connect
                </p>
                <div className="space-y-3">
                  <a
                    href="https://www.facebook.com/share/ryhxrkCQxGt4yFsH/?mibextid=qi2Omg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-700 dark:text-white/80 hover:text-primary dark:hover:text-primary transition-colors duration-300"
                  >
                    Facebook
                  </a>
                  <a
                    href="https://www.instagram.com/vsa_architects?igsh=MXIzNWV6dGFhYjhkZg=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-700 dark:text-white/80 hover:text-primary dark:hover:text-primary transition-colors duration-300"
                  >
                    Instagram
                  </a>
                  <a
                    href="tel:+919876543210"
                    className="block text-gray-700 dark:text-white/80 hover:text-primary dark:hover:text-primary transition-colors duration-300"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="mt-12">
              <p className="text-xs text-gray-500 dark:text-white/40 uppercase tracking-wider mb-4">
                Location
              </p>
              <p className="text-gray-700 dark:text-white/80">
                123 Architecture Plaza,
                <br />
                Jalandhar, Punjab, India
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-200 dark:border-white/10 px-6 md:px-10 py-4 md:max_padd_container2 lg:max_padd_container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 dark:text-white/40">
            © {new Date().getFullYear()} Vijay Sehdev & Associates
          </p>
          <p className="text-xs text-gray-500 dark:text-white/40 mt-2 md:mt-0">
            All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
