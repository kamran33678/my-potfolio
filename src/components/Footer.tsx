"use client";

import React from "react";
import { Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="relative border-t border-white/10 bg-[#09090b] z-10 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Identity */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center font-black text-xs text-black shadow-[0_0_10px_rgba(251,191,36,0.3)]">
              MK
            </div>
            <span className="text-white font-bold text-base tracking-tight">
              Muhammad <span className="text-amber-400">Kamran</span>
            </span>
          </div>
          <p className="text-xs text-zinc-400">Modern Web Developer</p>
        </div>

        {/* Direct Contact Info & Socials */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs text-zinc-400">
          <a
            href="mailto:muhammadkamran0774@gmail.com"
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>muhammadkamran0774@gmail.com</span>
          </a>

          <a
            href="tel:03296421032"
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>03296421032</span>
          </a>

          <div className="flex items-center gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 sm:border-l border-white/10 sm:pl-4">
            <a
              href="https://github.com/kamran33678"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href="https://www.linkedin.com/in/muhammad-kamran"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-xs text-zinc-500 font-normal">
          <p>© {currentYear} Muhammad Kamran. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
