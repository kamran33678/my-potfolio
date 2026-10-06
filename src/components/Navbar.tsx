"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Send } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Workspace", href: "#workspace" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3 theme-nav shadow-lg" : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#home");
          }}
          className="group flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-tight text-white focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-black font-extrabold text-sm shadow-[0_0_15px_rgba(251,191,36,0.3)] transition-transform group-hover:scale-105">
            MK
          </div>
          <span className="tracking-tight font-semibold">
            Muhammad <span className="text-amber-400 font-normal">Kamran</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-[#121215]/90 border border-white/10 backdrop-blur-md">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item.href);
                }}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "text-black bg-amber-400 font-semibold shadow-[0_0_12px_rgba(251,191,36,0.3)]"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA & Links */}
        <div className="hidden md:flex items-center gap-2.5">
          <a
            href="https://github.com/kamran33678"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-zinc-300 hover:text-amber-400 bg-zinc-900/90 border border-white/10 hover:border-amber-400/40 transition-all"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#contact");
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-black btn-gold uppercase tracking-wider"
          >
            <span>Let&apos;s Talk</span>
            <Send className="w-3.5 h-3.5 text-black" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-zinc-900 border border-white/10 text-white hover:text-amber-400 transition-colors focus:outline-none cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 px-4 pb-6 pt-3 mx-4 rounded-2xl bg-[#121215] border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.href);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "text-black bg-amber-400 font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            <a
              href="https://github.com/kamran33678"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-300 hover:text-amber-400 flex items-center gap-2"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub Profile</span>
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#contact");
              }}
              className="mt-2 text-center py-2.5 rounded-xl font-bold text-black btn-gold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get In Touch</span>
              <Send className="w-3.5 h-3.5 text-black" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
