"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

export default function Projects() {
  const project = {
    title: "Workspace Manager",
    badge: "Flagship Featured Project",
    tagline: "Modern Workspace & Task Management Web App",
    description:
      "A modern workspace management web application inspired by tools like Notion and Jira. Designed to streamline productivity, task tracking, and team workflows with interactive UI architectures, state management, and persistent local data storage.",
    image: "/project-workspace.jpg",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Redux Toolkit",
      "LocalStorage",
      "IndexedDB",
    ],
    highlights: [
      "Intuitive Kanban task boards and nested workspace dashboards",
      "Fast client-side state management powered by Redux Toolkit",
      "Persistent data storage utilizing LocalStorage & IndexedDB",
      "100% mobile-first, responsive, and high-performance modern web architecture",
    ],
    githubUrl: "https://github.com/kamran33678",
  };

  return (
    <section id="workspace" className="relative py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Featured Project</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-3">
          Workspace <span className="text-amber-400">Manager</span>
        </h2>
        <p className="mt-2 text-zinc-400 text-sm sm:text-base">
          A full-featured workspace management web application built with modern web technologies.
        </p>
      </div>

      {/* Main Workspace Showcase Card */}
      <div className="theme-card rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/40 transition-all duration-300">
        {/* Project Image Banner */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 bg-zinc-950 overflow-hidden border-b border-white/10 group">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-black/20 to-black/40" />

          {/* Floating Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-black/80 text-amber-400 border border-amber-400/30 backdrop-blur-md shadow-lg">
              {project.badge}
            </span>
          </div>
        </div>

        {/* Project Details Content */}
        <div className="p-6 sm:p-10 space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
              {project.tagline}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              {project.title}
            </h3>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mt-3">
              {project.description}
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {project.highlights.map((h, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-xs sm:text-sm text-zinc-300"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{h}</span>
              </div>
            ))}
          </div>

          {/* Technologies Used */}
          <div>
            <span className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-3">
              Technologies &amp; Architecture
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-white/[0.03] text-zinc-200 border border-white/10 hover:border-amber-400/40 hover:text-amber-300 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3 rounded-full font-bold text-black btn-gold flex items-center justify-center gap-2.5 text-sm cursor-pointer shadow-lg"
            >
              <GithubIcon className="w-4 h-4 text-black" />
              <span>View Workspace Manager on GitHub</span>
              <ExternalLink className="w-4 h-4 text-black" />
            </a>

            <span className="text-xs text-zinc-500 font-mono">
              Designed &amp; Developed by Muhammad Kamran
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
