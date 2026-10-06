"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[88vh] flex flex-col justify-center items-center pt-32 pb-16 px-4 sm:px-6 text-center overflow-hidden"
    >
      {/* Subtle Golden Ambient Glow Behind Hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/[0.04] rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Clean Status Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 mb-8 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse" />
        <span className="text-xs font-medium text-zinc-300 tracking-wide">
          Modern Web Developer • Open to Opportunities
        </span>
      </div>

      {/* Center Profile Image with Subtle Golden Glow Border */}
      <div className="relative mb-8 group">
        {/* Soft Golden Ambient Glow */}
        <div className="absolute -inset-2 rounded-full bg-amber-500/15 blur-xl group-hover:bg-amber-500/25 transition-all duration-300 pointer-events-none" />

        {/* Crisp Border Ring */}
        <div className="relative p-[2px] rounded-full bg-gradient-to-b from-amber-400/60 via-zinc-600/30 to-white/10 shadow-[0_12px_35px_rgba(0,0,0,0.8)]">
          <div className="relative w-[170px] h-[170px] sm:w-[190px] sm:h-[190px] md:w-[210px] md:h-[210px] rounded-full overflow-hidden bg-zinc-950">
            <Image
              src="/kamran-new.jpg"
              alt="Muhammad Kamran - Modern Web Developer"
              width={500}
              height={500}
              priority
              unoptimized
              className="w-full h-full object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Hero Typography */}
      <div className="max-w-3xl mx-auto space-y-3">
        <p className="text-xs sm:text-sm font-semibold text-zinc-400 tracking-widest uppercase">
          Hi, I&apos;m <span className="text-white font-bold">Muhammad Kamran</span>
        </p>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.1]">
          Modern Web Developer
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto font-normal leading-relaxed pt-2">
          I build modern, fast, responsive, and user-friendly web applications using the latest web technologies.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-9 w-full max-w-md px-4">
        <button
          onClick={() => scrollTo("workspace")}
          className="w-full sm:w-auto px-7 py-3 rounded-full font-semibold text-black btn-gold flex items-center justify-center gap-2 text-sm tracking-wide cursor-pointer group"
        >
          <span>View Workspace Project</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        <button
          onClick={() => scrollTo("contact")}
          className="w-full sm:w-auto px-7 py-3 rounded-full font-semibold btn-outline-gold flex items-center justify-center gap-2 text-sm tracking-wide cursor-pointer"
        >
          <Mail className="w-4 h-4 text-amber-400" />
          <span>Contact Me</span>
        </button>

        <a
          href="https://github.com/kamran33678"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-5 py-3 rounded-full font-semibold bg-zinc-900 border border-white/15 text-zinc-200 hover:text-amber-400 hover:border-amber-400/40 transition-all flex items-center justify-center gap-2 text-sm tracking-wide cursor-pointer"
        >
          <GithubIcon className="w-4 h-4" />
          <span>GitHub</span>
        </a>
      </div>
    </section>
  );
}
