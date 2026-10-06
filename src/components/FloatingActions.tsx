"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showScrollTop) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Scroll to Top Only */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="w-11 h-11 rounded-full bg-zinc-900/90 border border-white/15 text-white flex items-center justify-center hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all cursor-pointer shadow-xl backdrop-blur-md"
      >
        <ArrowUp className="w-4 h-4 stroke-[2.5]" />
      </button>
    </div>
  );
}
