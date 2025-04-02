import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { gsap, CSSPlugin, Expo } from "gsap";
gsap.registerPlugin(CSSPlugin);
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// #######  Pages ########
import Home from "../src/Pages/Home";
import About from "../src/Pages/About";
import Projects from "../src/Pages/Projects";
import Contact from "../src/Pages/Contact";
import Footer from "./components/Footer";
import ProjectDetail from "../src/Pages/ProjectDetail";

function App() {
  const [counter, setCounter] = useState(0);

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
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // useEffect(() => {
  //   const count = setInterval(() => {
  //     setCounter((counter) =>
  //       counter < 100
  //         ? counter + 1
  //         : (clearInterval(count), setCounter(100), reveal())
  //     );
  //   }, 25);
  // }, []);

  // const reveal = () => {
  //   const t1 = gsap.timeline({
  //     onComplete: () => {
  //       console.log("completed");
  //     },
  //   });
  //   t1.to(".follow", {
  //     width: "100%",
  //     ease: Expo.easeInOut,
  //     duration: 1.2,
  //     delay: 0.7,
  //   })
  //     .to(".hide", { opacity: 0, duration: 0.3 })
  //     .to(".hide", { display: "none", duration: 0.3 })
  //     .to(".follow", {
  //       height: "100%",
  //       ease: Expo.easeInOut,
  //       duration: 0.7,
  //       delay: 0.5,
  //     })
  //     .to(".content", { width: "100%", ease: Expo.easeInOut, duration: 0.7 })
  //     .to(".title-lines", { display: "block", duration: 0.1 })
  //     .to(".title-lines", {
  //       opacity: 1,
  //       stagger: 0.15,
  //       ease: Expo.easeInOut,
  //       duration: 0.6,
  //     });
  // };

  return (
    <div className="min-h-screen">
      {/* <Loading>
        <Follow className="follow"></Follow>
        <ProgressBar
          className="hide"
          id="progress-bar"
          style={{ width: counter + "%" }}
        ></ProgressBar>
        <Count id="count" className="hide">
          {counter}%
        </Count>
      </Loading> */}

      <Router>
        {/* <Header/> */}
        {/* <Content className="content bg-white"> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
        <Footer />
        {/* </Content> */}
      </Router>
    </div>
  );
}

// const Loading = styled.div`
//   height: 100%;
//   width: 100%;
//   background-color: #2c3c44;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: absolute;
//   top: 0;
// `;
// const Follow = styled.div`
//   position: absolute;
//   background-color: #f48049;
//   height: 2px;
//   width: 0;
//   left: 0;
//   z-index: 2;
// `;

// const ProgressBar = styled.div`
//   position: absolute;
//   left: 0;
//   background-color: #fff;
//   height: 2px;
//   width: 0;
//   transition: 0.4s ease-out;
// `;

// const Count = styled.p`
//   position: absolute;
//   font-size: 120px;
//   color: #fff;
//   transform: translateY(-15px);
//   font-weight: 500;
// `;

// const Content = styled.div`
//   width: 0;
//   position: absolute;
//   left: 0;
//   top: 0;

//   z-index: 2;

//   overflow: hidden;
//   color: #fff;
// `;

export default App;
