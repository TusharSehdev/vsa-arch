import React, { useEffect, useRef } from "react";
import { MdArrowOutward } from "react-icons/md";
import gsap from "gsap";
import { Link } from "react-router-dom";

export default function Button2({ linkField, label, showIcon = true, className }) {
  const arrowRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const buttonElement = buttonRef.current;
    const arrowElement = arrowRef.current;
    if (!buttonElement || !arrowElement) return;

    // GSAP animation timeline
    const tl = gsap.timeline({ paused: true });
    tl.to(arrowElement, { rotation: 30 });

    // Mouse enter event handler for button
    const handleMouseEnter = () => {
      tl.play();
    };

    // Mouse leave event handler for button
    const handleMouseLeave = () => {
      tl.reverse();
    };

    // Add event listeners to button
    buttonElement.addEventListener("mouseenter", handleMouseEnter);
    buttonElement.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      buttonElement.removeEventListener("mouseenter", handleMouseEnter);
      buttonElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={buttonRef} className={className}>
      <Link
        to={linkField}
        className={`group relative flex w-fit items-center justify-center overflow-hidden cursor-pointer rounded-full border-2 border-red-600 border-white bg-gray-800 px-4 py-2 font-light transition-transform ease-out hover:scale-105`}
      >
        <span
          className={`absolute inset-0 z-0 h-full translate-y-12 bg-primary transition-transform duration-300 ease-in-out group-hover:translate-y-0`}
        />
        <span className="relative flex items-center justify-center gap-2 text-white group-hover:text-white text-xl duration-300">
          {label}{" "}
          {showIcon && (
            <div ref={arrowRef}>
              <MdArrowOutward className="inline-block mb-1 text-lg" id="arrow" />
            </div>
          )}
        </span>
      </Link>
    </div>
  );
}
