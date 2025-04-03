import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedImage from "./OptimizedImage";

// Animation variants
const navVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const linkVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const menuVariants = {
  closed: { height: 0, opacity: 0, overflow: "hidden" },
  open: {
    height: "100vh",
    opacity: 1,
    transition: {
      height: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
      opacity: { duration: 0.3 },
    },
  },
};

const underlineVariants = {
  hidden: { width: 0 },
  visible: { width: "100%", transition: { duration: 0.5 } },
};

const logoVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.6 } },
};

// Theme toggle animation variants
const themeToggleVariants = {
  light: { rotate: 0, scale: 1 },
  dark: { rotate: 180, scale: 1 },
  tap: { scale: 0.9 },
};

// Navigation links
const links = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Projects", href: "/projects" },
  { title: "Contact", href: "/contact" },
];

const ThemeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <motion.button
      onClick={toggleDarkMode}
      className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden focus:outline-none"
      whileTap="tap"
      variants={themeToggleVariants}
      animate={darkMode ? "dark" : "light"}
      transition={{ duration: 0.5, type: "spring" }}
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <OptimizedImage
          src="/sun.svg"
          alt="Switch to light mode"
          className="w-5 h-5"
          width={20}
          height={20}
          priority={true}
          placeholderColor="transparent"
          style={{ filter: "invert(100%)" }}
        />
      ) : (
        <OptimizedImage
          src="/moon.svg"
          alt="Switch to dark mode"
          className="w-4 h-4"
          width={16}
          height={16}
          priority={true}
          placeholderColor="transparent"
          style={{ filter: "invert(0%)" }}
        />
      )}
    </motion.button>
  );
};

const MobileMenu = ({
  isOpen,
  setIsOpen,
  pathname,
  darkMode,
  toggleDarkMode,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-white/95 dark:bg-black/95 z-40 overflow-hidden"
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
        >
          <motion.div
            className="container mx-auto h-full flex flex-col justify-center items-center py-20 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.3 } }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col space-y-10 items-center">
              {links.map((link, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.3 + i * 0.1,
                      duration: 0.6,
                      ease: "easeOut",
                    },
                  }}
                  exit={{
                    y: 50,
                    opacity: 0,
                    transition: {
                      duration: 0.4,
                      ease: "easeIn",
                    },
                  }}
                  className="relative"
                >
                  <Link
                    to={link.href}
                    className={`text-4xl md:text-5xl font-light text-gray-900 dark:text-white hover:text-primary transition-colors duration-300 ${
                      pathname === link.href ? "text-primary" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.title}
                  </Link>
                  {pathname === link.href && (
                    <motion.div
                      layoutId="underline"
                      className="absolute -bottom-2 left-0 right-0 h-[2px] bg-primary mx-auto"
                      initial={{ width: 0 }}
                      animate={{ width: "50%", transition: { duration: 0.5 } }}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.7 } }}
              exit={{ opacity: 0 }}
              className="absolute bottom-10 left-0 right-0 flex justify-center space-x-6 items-center"
            >
              <Link
                to="https://www.facebook.com/share/ryhxrkCQxGt4yFsH/?mibextid=qi2Omg"
                target="_blank"
              >
                <OptimizedImage
                  src="/facebook2.svg"
                  alt="Facebook"
                  className="w-8 h-8 hover:opacity-70 transition-opacity filter invert dark:invert-0"
                  width={32}
                  height={32}
                  priority={true}
                  placeholderColor="transparent"
                />
              </Link>
              <Link
                to="https://www.instagram.com/vsa_architects?igsh=MXIzNWV6dGFhYjhkZg=="
                target="_blank"
              >
                <OptimizedImage
                  src="/instagram2.svg"
                  alt="Instagram"
                  className="w-8 h-8 hover:opacity-70 transition-opacity filter invert dark:invert-0"
                  width={32}
                  height={32}
                  priority={true}
                  placeholderColor="transparent"
                />
              </Link>
              <ThemeToggle
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pathname, setPathname] = useState("/");
  const [darkMode, setDarkMode] = useState(true);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  // Get current pathname for active state and check for dark mode preference
  useEffect(() => {
    setPathname(window.location.pathname);

    // Check localStorage for saved preference, default to dark if none exists
    const storedDarkMode = localStorage.getItem("darkMode");
    const isDarkMode = storedDarkMode === null ? true : storedDarkMode === "true";
    
    setDarkMode(isDarkMode);
    
    // Apply dark mode to document if needed
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Body scroll lock when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`fixed w-full top-0 z-50 transition-all duration-500 ${
          scrolled || isOpen
            ? "py-3 bg-white/75 dark:bg-[#1a1a1a]/75 backdrop-blur-md shadow-lg"
            : "py-5 bg-white/100 dark:bg-[#1a1a1a]/100"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <motion.div
            variants={logoVariants}
            className="flex items-center z-50"
          >
            <Link to="/" className="flex items-center gap-2">
              <OptimizedImage
                src="/logo2.png"
                alt="VSA Architects"
                className="w-[70px] md:w-[80px] dark:invert-0"
                width={60}
                
                priority={true}
                placeholderColor="transparent"
              />
              <OptimizedImage
                src="/logoText.png"
                alt="VSA Architects"
                className="w-[60px] md:w-[80px] dark:invert-0"
                width={60}
              
                priority={true}
                placeholderColor="transparent"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation - Now aligned to the right */}
          <motion.nav className="hidden md:flex items-center space-x-8 justify-end">
            {links.map((link, i) => (
              <div key={i} className="relative">
                <motion.div
                  variants={linkVariants}
                  whileHover="hover"
                  className="relative"
                >
                  <Link
                    to={link.href}
                    className={`text-md font-medium hover:text-primary transition-colors duration-300 ${
                      pathname === link.href
                        ? "text-primary"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {link.title}
                  </Link>
                  {pathname === link.href && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary mx-auto"
                      initial={{ width: 0 }}
                      animate={{ width: "100%", transition: { duration: 0.5 } }}
                    />
                  )}
                </motion.div>
              </div>
            ))}

            {/* Social Links and Theme Toggle */}
            <motion.div
              variants={linkVariants}
              className="flex items-center space-x-4 pl-4 border-l border-gray-900/20 dark:border-white/20"
            >
              <Link
                to="https://www.facebook.com/share/ryhxrkCQxGt4yFsH/?mibextid=qi2Omg"
                target="_blank"
              >
                <OptimizedImage
                  src="/facebook2.svg"
                  alt="Facebook"
                  className="w-5 h-5 hover:opacity-70 transition-opacity filter invert dark:invert-0"
                  width={20}
                  height={20}
                  priority={true}
                  placeholderColor="transparent"
                />
              </Link>
              <Link
                to="https://www.instagram.com/vsa_architects?igsh=MXIzNWV6dGFhYjhkZg=="
                target="_blank"
              >
                <OptimizedImage
                  src="/instagram2.svg"
                  alt="Instagram"
                  className="w-5 h-5 hover:opacity-70 transition-opacity filter invert dark:invert-0"
                  width={20}
                  height={20}
                  priority={true}
                  placeholderColor="transparent"
                />
              </Link>
              <ThemeToggle
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
              />
            </motion.div>
          </motion.nav>

          {/* Mobile Header Controls (Hamburger + Theme Toggle) */}
          <div className="flex md:hidden items-center space-x-4 z-50">
            <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            {/* Hamburger Button */}
            <motion.button
              variants={linkVariants}
              className="flex flex-col justify-center items-center w-10 h-10 relative"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 8 : 0,
                  transition: { duration: 0.4 },
                }}
                className="w-7 h-[2px] bg-gray-900 dark:bg-white block mb-1.5 transition-transform"
              />
              <motion.span
                animate={{
                  opacity: isOpen ? 0 : 1,
                  transition: { duration: 0.4 },
                }}
                className="w-7 h-[2px] bg-gray-900 dark:bg-white block mb-1.5 transition-opacity"
              />
              <motion.span
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -8 : 0,
                  transition: { duration: 0.4 },
                }}
                className="w-7 h-[2px] bg-gray-900 dark:bg-white block transition-transform"
              />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Menu */}
      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        pathname={pathname}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
    </>
  );
}
