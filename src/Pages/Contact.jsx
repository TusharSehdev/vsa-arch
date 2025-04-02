import React, { useEffect } from "react";
import Header from "../components/Header";
import Map from "../components/Map";
import SEO from "../components/SEO";
import { motion } from "framer-motion";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);

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
      <motion.div
        className="text-black pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="px-4 md:px-8 lg:px-20 pb-20 pt-10">
          {/* Contact Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max_padd_container3">
            <motion.div
              className="bg-gray-300 p-4 md:p-8 rounded-2xl shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-2xl md:text-3xl font-semibold pt-3">
                By Phone
              </div>
              <div className="py-4 md:py-6 text-md md:text-xl capitalize">
                Ready to bring your vision to life? Call us today!
              </div>
              <hr className="border-black" />
              <div className="flex flex-row items-center justify-between mt-4 lg:mt-6">
                <div className="flex items-center mb-4 md:mb-0">
                  <img
                    src={"/mobile.svg"}
                    alt="mobile svg"
                    width={40}
                    className="mr-2"
                  />
                  <span className="text-sm md:text-lg">+91 98766 15741</span>
                </div>
                <div>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block rounded-xl border mb-3 md:mb-0 text-sm md:text-md border-black px-4 py-2 text-md font-medium text-black hover:bg-[#1a1a1a] hover:text-white focus:outline-none active:bg-gray-300"
                    href="tel:9876615741"
                  >
                    Call Us
                  </motion.a>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-6">
              <motion.div
                className="bg-gray-300 p-4 md:p-6 rounded-2xl shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="text-2xl md:text-3xl font-semibold pt-3">
                  Social Media
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                  <div className="grid gap-3">
                    <motion.a
                      whileHover={{ scale: 1.05, x: 5 }}
                      href="https://www.facebook.com/share/ryhxrkCQxGt4yFsH/?mibextid=qi2Omg"
                      target="_blank"
                      className="flex items-center gap-3"
                    >
                      <img
                        src={"/facebook.svg"}
                        alt="facebook svg"
                        width={24}
                      />
                      <span className="text-md">@ vsa-architects</span>
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05, x: 5 }}
                      href="https://www.instagram.com/vsa_architects?igsh=MXIzNWV6dGFhYjhkZg=="
                      target="_blank"
                      className="flex items-center gap-3"
                    >
                      <img
                        src={"/instagram.svg"}
                        alt="instagram svg"
                        width={24}
                      />
                      <span className="text-md">@ vsa-architects</span>
                    </motion.a>
                  </div>

                  <div className="grid gap-3">
                    <motion.div
                      whileHover={{ scale: 1.05, x: 5 }}
                      className="flex items-center gap-3"
                    >
                      <img src={"/twitter.svg"} alt="twitter svg" width={24} />
                      <span className="text-md">@ vsa-architects</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, x: 5 }}
                      className="flex items-center gap-3"
                    >
                      <img
                        src={"/linkedin.svg"}
                        alt="linkedin svg"
                        width={24}
                      />
                      <span className="text-md">@ vsa-architects</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.a
                  href="https://wa.me/9876615741"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="bg-gray-300 p-4 md:p-6 rounded-2xl shadow flex items-center justify-between">
                    <div className="grid gap-2">
                      <div className="text-lg md:text-2xl font-semibold">
                        Chat With Us
                      </div>
                      <div className="text-sm md:text-md">
                        Start a WhatsApp chat
                      </div>
                    </div>
                    <img src={"/send.svg"} alt="send icon" width={24} />
                  </div>
                </motion.a>

                <motion.a
                  href="mailto:vsa.architects@gmail.com"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="bg-gray-300 p-4 md:p-6 rounded-2xl shadow flex items-center justify-between">
                    <div className="grid gap-2">
                      <div className="text-lg md:text-2xl font-semibold">
                        Email Us
                      </div>
                      <div className="text-sm md:text-md">
                        Send us a message
                      </div>
                    </div>
                    <img src={"/send.svg"} alt="send icon" width={24} />
                  </div>
                </motion.a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            className="mt-20 grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-5"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-gray-300 rounded-2xl shadow p-4 md:p-8 lg:col-span-2">
              <div className="text-3xl md:text-4xl font-semibold pt-3">
                Contact Us
              </div>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                <div>
                  <label className="font-medium text-lg block">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="mt-2 border border-black bg-gray-300 rounded-lg p-3 w-full outline-none ring-black"
                    required
                  />
                </div>

                <div>
                  <label className="font-medium text-lg block">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="mt-2 border border-black bg-gray-300 rounded-lg p-3 w-full outline-none"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="font-medium text-lg block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Email Address"
                    className="mt-2 border border-black bg-gray-300 rounded-lg p-3 w-full outline-none"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="font-medium text-lg block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Your Contact Number"
                    className="mt-2 border border-black bg-gray-300 rounded-lg p-3 w-full outline-none"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="font-medium text-lg block">
                    Your Message
                  </label>
                  <textarea
                    placeholder="Enter your message here"
                    rows="4"
                    className="mt-2 border border-black bg-gray-300 rounded-lg p-3 w-full outline-none"
                    required
                  ></textarea>
                </div>

                <div className="md:col-span-2">
                  <motion.button
                    className="hover:brightness-125 font-bold py-3 px-6 rounded-xl bg-gradient-to-r from-black to-slate-600 text-white mt-5 active:scale-95 transition-all duration-200 w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Message
                  </motion.button>
                </div>
              </form>
            </div>

            <div className="flex items-center">
              <motion.img
                src={"/sketch.jpg"}
                alt="image"
                width={500}
                className="shadow-xl hidden rounded-2xl lg:block image8"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </div>
          </motion.div>
        </div>
        <Map />
      </motion.div>
    </>
  );
};

export default Contact;
