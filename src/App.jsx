import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// #######  Pages ########
import Home from "../src/Pages/Home";
import About from "../src/Pages/About";
import Projects from "../src/Pages/Projects";
import Contact from "../src/Pages/Contact";
import Footer from "./components/Footer";
import ProjectDetail from "../src/Pages/ProjectDetail";

function App() {
  // Disable right-click context menu
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault(); // Prevent the default right-click menu
    };

    // Disable F12, Ctrl+Shift+I, and Ctrl+U
    const handleKeyDown = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && (e.shiftKey || e.key === "U" || e.key === "I"))
      ) {
        e.preventDefault(); // Prevent default action for these keys
      }
    };

    // Attach event listeners to the whole document
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listeners on component unmount
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Check for dark mode preference in localStorage
  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    // If no preference is stored (first visit), default to dark mode
    const isDarkMode = storedDarkMode === null ? true : storedDarkMode === "true";
    
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      // Save the preference if it's the first visit
      if (storedDarkMode === null) {
        localStorage.setItem("darkMode", "true");
      }
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
