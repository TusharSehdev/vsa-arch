import React, { useEffect, lazy, Suspense, useState, memo, useCallback } from "react";
import Header from "../components/Header";
import SEO from "../components/SEO";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Banner from "../components/Banner";
import { usePerformance } from "../context/PerformanceContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { throttle } from "../utils/performance";

// Lazy load map component with error boundary
const Map = lazy(() => {
  return import("../components/Map")
    .catch(err => {
      console.error("Error loading Map component:", err);
      // Return a fallback component
      return {
        default: () => (
          <div className="w-full max-w-6xl mx-auto px-4 pb-20">
            <div className="flex flex-col mb-8">
              <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">Visit Our Office</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">Urban Estate Phase II, Jalandhar, Punjab, India</p>
              <div className="h-[400px] w-full bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Map could not be loaded</p>
              </div>
            </div>
          </div>
        )
      };
    });
});

// Fallback loading component
const MapLoader = () => (
  <div className="h-[400px] w-full bg-gray-100 dark:bg-gray-800 animate-pulse flex items-center justify-center">
    <LoadingSpinner />
  </div>
);

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Map component error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const Contact = () => {
  const { trackRender } = usePerformance();
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });
  
  // Memoize scroll function
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  
  useEffect(() => {
    // Track component render once
    trackRender("Contact");
    
    // Use requestAnimationFrame for smooth scrolling
    requestAnimationFrame(scrollToTop);
  }, []); // Empty dependency array to run once

  // Throttled form change handler to prevent excessive re-renders
  const handleInputChange = throttle((e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  }, 100);
  
  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form handling logic would go here
    console.log("Form submitted:", formState);
    // Reset form or show success message
  };

  // Map fallback component
  const MapFallback = (
    <div className="w-full max-w-6xl mx-auto px-4 pb-20">
      <div className="flex flex-col mb-8">
        <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">Visit Our Office</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">Urban Estate Phase II, Jalandhar, Punjab, India</p>
        <div className="h-[400px] w-full bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Map could not be loaded</p>
        </div>
      </div>
    </div>
  );

  const keywords = `
    Contact architects Jalandhar, Jalandhar architectural contact, Reach out to Jalandhar architects, 
    Contact us Jalandhar, Jalandhar architecture firm contact, Get in touch Jalandhar architects, 
    Jalandhar design contact, Contact information Jalandhar architects, Jalandhar architecture inquiries, 
    Contact details Jalandhar, Jalandhar architect contact form, Connect with Jalandhar architects, 
    Jalandhar office contact, Schedule consultation Jalandhar, Jalandhar firm contact info,
    Jalandhar architecture firm details, Contact Jalandhar design team, Jalandhar architecture firm phone, 
    Jalandhar architects email, Contact Jalandhar office, Jalandhar architects address, 
    Reach Jalandhar architects, Jalandhar architectural services contact, Get in touch with Jalandhar architects, 
    Jalandhar design experts, Jalandhar architectural firm inquiries, Contact for architecture Jalandhar, 
    Jalandhar architecture company contact, Jalandhar design team contact, Contact form Jalandhar architects,
    Jalandhar architects support, Jalandhar firm consultation, Contact for design Jalandhar, 
    Jalandhar architectural support, Reach Jalandhar design firm, Contact Jalandhar architecture services,
    Jalandhar architects customer service, Contact information Jalandhar design, Jalandhar office details, 
    Get in touch Jalandhar design, Jalandhar architectural consultations, Firm contact Jalandhar, 
    Jalandhar architect office contact, Contact Jalandhar design firm, Jalandhar architecture support, 
    architectural firm Punjab contact, design consultation services Jalandhar, architecture project inquiries Punjab
  `;

  const description =
    "Get in touch with VSA Architects in Jalandhar. Contact us for architectural consultations, design inquiries, or to discuss your project requirements. Reach our team via phone, email, or visit our office.";

  return (
    <>
      <SEO
        title="Contact Us"
        description={description}
        keywords={keywords}
        canonicalUrl="/contact"
        breadcrumb={true}
      />
      <Header />
      <LazyMotion features={domAnimation}>
        <div className="bg-white dark:bg-[#1a1a1a]">
          <Banner 
            title="Contact Us" 
            subtitle="Get in touch with our team to discuss your architectural vision."
          />
          
          <div className="w-full max-w-5xl mx-auto px-4 py-12">
            <m.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {/* Phone Contact Card */}
                <m.div
                  className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-300"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                      </svg>
                </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Call Us</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Speak directly with our architects about your project</p>
                  <a href="tel:+919876615741" className="inline-flex items-center text-gray-900 dark:text-white font-medium hover:text-primary dark:hover:text-primary transition-colors">
                    +91 98766 15741
                  </a>
                </m.div>

                {/* Email Contact Card */}
                <m.div
                  className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-300"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Email</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Send us detailed information about your requirements</p>
                  <a href="mailto:vsa.architects@gmail.com" className="inline-flex items-center text-gray-900 dark:text-white font-medium hover:text-primary dark:hover:text-primary transition-colors">
                    vsa.architects@gmail.com
                  </a>
                </m.div>

                {/* Social Media Card */}
                <m.div
                  className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-300"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Social</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Connect with us on social media platforms</p>
                  <div className="flex space-x-4">
                    <a href="https://www.facebook.com/share/ryhxrkCQxGt4yFsH/?mibextid=qi2Omg" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                    <a href="https://www.instagram.com/vsa_architects?igsh=MXIzNWV6dGFhYjhkZg==" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                      </svg>
                    </a>
                  </div>
                </m.div>
          </div>

          {/* Contact Form */}
              <m.div
                className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-6">Send us a message</h2>
                
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                  <input
                    type="text"
                      name="firstName"
                      className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
                      placeholder="Your first name" 
                    required
                      onChange={handleInputChange}
                  />
                </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                  <input
                    type="text"
                      name="lastName"
                      className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
                      placeholder="Your last name" 
                      onChange={handleInputChange}
                  />
                </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input
                    type="email"
                      name="email"
                      className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
                      placeholder="your.email@example.com" 
                    required
                      onChange={handleInputChange}
                  />
                </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                  <input
                    type="tel"
                      name="phone"
                      className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
                      placeholder="Your phone number" 
                      onChange={handleInputChange}
                  />
                </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                  <textarea
                      name="message"
                      className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
                      placeholder="Tell us about your project or inquiry" 
                    rows="4"
                    required
                      onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="md:col-span-2">
                    <m.button
                    whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-3 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-medium rounded-lg transition-colors duration-200"
                      type="submit"
                  >
                    Send Message
                    </m.button>
                </div>
              </form>
              </m.div>
            </m.div>
            
            {/* Map Component - Lazy loaded with error boundary */}
            <ErrorBoundary fallback={MapFallback}>
              <Suspense fallback={<MapLoader />}>
                <Map />
              </Suspense>
            </ErrorBoundary>
            </div>
        </div>
      </LazyMotion>
    </>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(Contact);
