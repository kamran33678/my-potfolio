"use client";

import React from "react";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";

interface EducationItem {
  degree: string;
  institution: string;
  field: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
}

const EDUCATION_DATA: EducationItem[] = [
  {
    degree: "Intermediate",
    institution: "Superior College Arifwala",
    field: "Pre-Engineering / Computer Science Studies",
    period: "2020 — 2022",
    location: "Arifwala, Pakistan",
    description:
      "Coursework focused on computer science fundamentals, mathematics, analytical problem solving, and physics.",
    highlights: [
      "Mathematics & Logic",
      "Computer Science Fundamentals",
      "Academic Excellence",
    ],
  },
  {
    degree: "Matriculation",
    institution: "Guards Public School",
    field: "Science & Information Technology",
    period: "2018 — 2020",
    location: "Punjab, Pakistan",
    description:
      "Core education in general science and computer basics that established my foundational interest in web development.",
    highlights: [
      "Basic IT & Programming",
      "General Science & Math",
      "School Academic Recognition",
    ],
  },
];

export default function Education() {
  return (
    <section id="education" className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-300 bg-white/[0.06] px-3.5 py-1.5 rounded-full border border-white/10 inline-flex items-center gap-1.5">
          <GraduationCap className="w-3.5 h-3.5 text-white" />
          <span>Academic Background</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-3">
          Education &amp; <span className="text-zinc-400">Foundations</span>
        </h2>
        <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed">
          Foundational milestones that developed my analytical mindset and technical passion.
        </p>
      </div>

      {/* Cards Container */}
      <div className="max-w-3xl mx-auto space-y-6">
        {EDUCATION_DATA.map((item) => (
          <div
            key={item.degree}
            className="theme-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-zinc-200 border border-white/15">
                  {item.degree}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-3">
                  {item.institution}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                  {item.field}
                </p>
              </div>

              <div className="flex flex-col sm:items-end gap-1 text-xs text-zinc-400 font-mono">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-zinc-300" />
                  <span>{item.period}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 mt-4 leading-relaxed">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-5">
              {item.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs bg-white/[0.04] text-zinc-300 border border-white/10"
                >
                  <Award className="w-3 h-3 text-white" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
