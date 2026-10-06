"use client";

import React from "react";
import { User, MapPin, Target, CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-300 bg-white/[0.06] px-3.5 py-1.5 rounded-full border border-white/10 inline-flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-amber-400" />
          <span>About Me</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-3">
          About <span className="text-amber-400">Muhammad Kamran</span>
        </h2>
      </div>

      {/* Main Clean About Card */}
      <div className="theme-card p-6 sm:p-10 rounded-3xl">
        <div className="space-y-4">
          <p className="text-zinc-200 text-base sm:text-lg leading-relaxed font-medium">
            I am <strong className="text-white font-bold">Muhammad Kamran</strong>, a passionate Modern Web Developer from Pakistan. I enjoy creating modern, fast, responsive, and user-friendly web applications and digital experiences.
          </p>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            I specialize in modern technologies including React.js, Next.js, TypeScript, Tailwind CSS, Redux Toolkit, alongside API development, database storage, and performance optimization.
          </p>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            I enjoy learning new technologies, solving technical problems, and turning creative ideas into functional web products that are fast, accessible, and enjoyable to use.
          </p>

          {/* Core Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-300 bg-white/[0.02] p-3 rounded-2xl border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Modern React &amp; Next.js Architecture</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-300 bg-white/[0.02] p-3 rounded-2xl border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Responsive UI &amp; Tailwind CSS</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-300 bg-white/[0.02] p-3 rounded-2xl border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>State Management with Redux Toolkit</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-300 bg-white/[0.02] p-3 rounded-2xl border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Clean, Maintainable &amp; Fast Code</span>
            </div>
          </div>
        </div>

        {/* Quick Meta Footer */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
          <div>
            <span className="block text-[11px] uppercase tracking-wider text-zinc-500 font-semibold">Location</span>
            <span className="text-white font-medium text-sm flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Faisalabad, Pakistan</span>
            </span>
          </div>
          <div>
            <span className="block text-[11px] uppercase tracking-wider text-zinc-500 font-semibold">Focus</span>
            <span className="text-white font-medium text-sm flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
              <Target className="w-3.5 h-3.5 text-amber-400" />
              <span>Modern Web Development</span>
            </span>
          </div>
          <div>
            <span className="block text-[11px] uppercase tracking-wider text-zinc-500 font-semibold">Status</span>
            <span className="text-white font-medium text-sm flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
              <span>Available for Opportunities</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
