"use client";

import React from "react";
import { Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export default function SocialSection() {
  const socials = [
    {
      name: "GitHub",
      handle: "@kamran33678",
      description: "Explore my full-stack repositories, web apps & code",
      url: "https://github.com/kamran33678",
      icon: GithubIcon,
      action: "Visit Profile",
    },
    {
      name: "LinkedIn",
      handle: "Muhammad Kamran",
      description: "Connect professionally and follow my tech journey",
      url: "https://www.linkedin.com/in/muhammad-kamran", // Configurable profile
      icon: LinkedinIcon,
      action: "Connect",
    },
    {
      name: "WhatsApp",
      handle: "+92 329 6421032",
      description: "Direct instant messaging for fast inquiries",
      url: "https://wa.me/923296421032",
      icon: MessageCircle,
      action: "Chat Now",
    },
    {
      name: "Email",
      handle: "muhammadkamran0774@gmail.com",
      description: "Direct project proposals and collaborations",
      url: "mailto:muhammadkamran0774@gmail.com",
      icon: Mail,
      action: "Send Mail",
    },
  ];

  return (
    <section id="socials" className="relative py-16 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 bg-white/[0.04] px-3.5 py-1 rounded-full border border-white/10">
          Connect Online
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-3">
          Social <span className="text-amber-400">Media &amp; Profiles</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {socials.map((item, index) => {
          const Icon = item.icon;
          return (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="theme-card p-5 rounded-3xl group flex flex-col justify-between hover:border-amber-400/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/10 group-hover:border-amber-400/30 group-hover:bg-amber-400/10 flex items-center justify-center text-zinc-300 group-hover:text-amber-400 transition-colors mb-3.5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base group-hover:text-amber-300 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-zinc-500 font-mono mt-0.5 truncate">
                  {item.handle}
                </p>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-zinc-400 group-hover:text-amber-400 transition-colors">
                <span>{item.action}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
