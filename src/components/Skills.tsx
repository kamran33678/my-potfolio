"use client";

import React from "react";
import { Sparkles } from "lucide-react";

const SKILLS = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "Redux Toolkit",
  "Git",
  "GitHub",
  "Node.js",
  "Cursor",
  "Antigravity",
  "Surge",
  "Responsive Web Design",
  "UI Development",
  "Basic SEO",
  "Problem Solving",
  "Component-Based Development",
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header (Matching Pic 1) */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-[#FACC15] bg-[#FACC15]/10 px-4 py-1.5 rounded-full border border-[#FACC15]/20 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#FACC15]" />
          <span>Core Competencies</span>
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4">
          Skills &amp; <span className="text-[#FACC15]">Technologies</span>
        </h2>
        <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed">
          Technologies and tools I specialize in to build modern web solutions.
        </p>
      </div>

      {/* Clean Flowing Skill Badges (Exact Style as Pic 1) */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-3.5 max-w-4xl mx-auto">
        {SKILLS.map((skill, index) => (
          <div
            key={index}
            className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 sm:py-3 rounded-full bg-[#121212] border border-zinc-800 hover:border-[#FACC15] hover:bg-[#FACC15]/[0.06] hover:shadow-[0_0_20px_rgba(250,204,21,0.2)] hover:-translate-y-1 transition-all duration-200 cursor-default"
          >
            {/* Glowing Golden Dot */}
            <span className="w-2 h-2 rounded-full bg-[#FACC15] group-hover:scale-125 transition-transform shadow-[0_0_6px_#FACC15]" />

            {/* Skill Name */}
            <span className="text-sm sm:text-base font-semibold text-zinc-200 group-hover:text-white transition-colors">
              {skill}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
