"use client";

import React from "react";

export default function StarBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#09090b]">
      {/* Subtle Monochrome Top Ambient Glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] sm:w-[1000px] h-[450px] bg-gradient-to-b from-white/[0.04] via-zinc-400/[0.015] to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle Side Ambient Glows */}
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-white/[0.015] rounded-full blur-[160px] pointer-events-none" />

      {/* Clean Subtle Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
