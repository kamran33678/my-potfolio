"use client";

import React, { useState, useMemo } from "react";
import { GitCommit, Flame, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

export default function GithubSection() {
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);

  const contributionGrid = useMemo(() => {
    const weeks = 48;
    const daysPerWeek = 7;
    const grid: number[][] = [];

    for (let w = 0; w < weeks; w++) {
      const week: number[] = [];
      for (let d = 0; d < daysPerWeek; d++) {
        const rand = Math.sin(w * 0.45 + d * 0.8) + Math.cos(w * 0.2);
        let level = 0;
        if (rand > 1.2) level = 4;
        else if (rand > 0.6) level = 3;
        else if (rand > 0.0) level = 2;
        else if (rand > -0.6) level = 1;
        else level = 0;

        if ((d === 0 || d === 6) && Math.random() > 0.5) {
          level = Math.max(0, level - 1);
        }
        week.push(level);
      }
      grid.push(week);
    }
    return grid;
  }, []);

  const getCellColor = (level: number) => {
    switch (level) {
      case 4:
        return "bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]";
      case 3:
        return "bg-zinc-300";
      case 2:
        return "bg-zinc-500";
      case 1:
        return "bg-zinc-700";
      default:
        return "bg-zinc-900";
    }
  };

  const months = [
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
  ];

  return (
    <section id="github" className="relative py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-300 bg-white/[0.06] px-3.5 py-1.5 rounded-full border border-white/10 inline-flex items-center gap-1.5">
          <GithubIcon className="w-3.5 h-3.5 text-white" />
          <span>Open Source</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-3">
          GitHub <span className="text-zinc-400">Activity</span>
        </h2>
        <p className="mt-3 text-zinc-400 text-sm sm:text-base">
          Regular code commits, active project repositories, and web development experiments.
        </p>
      </div>

      {/* Main Box */}
      <div className="theme-card rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto">
        {/* Profile Stats */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
              <GithubIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Muhammad Kamran</h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-zinc-300 font-mono border border-white/10">
                  @kamran33678
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Frontend projects, UI components &amp; web apps
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10">
              <GitCommit className="w-4 h-4 text-white" />
              <span className="text-white font-semibold">Active</span>
              <span className="text-zinc-400">commits</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10">
              <Flame className="w-4 h-4 text-white" />
              <span className="text-white font-semibold">Consistent</span>
              <span className="text-zinc-400">learning</span>
            </div>
          </div>
        </div>

        {/* Heatmap Matrix */}
        <div className="pt-6 overflow-x-auto pb-2">
          <div className="flex justify-between text-xs text-zinc-400 font-mono mb-2 min-w-[650px] px-1">
            {months.map((m, idx) => (
              <span key={idx}>{m}</span>
            ))}
          </div>

          <div className="flex gap-[3.5px] min-w-[650px] py-1">
            {contributionGrid.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[3.5px]">
                {week.map((level, dIdx) => (
                  <div
                    key={dIdx}
                    onMouseEnter={() =>
                      setHoveredDay({
                        date: `Week ${wIdx + 1}, Day ${dIdx + 1}`,
                        count: level === 0 ? 0 : level * 2 + 1,
                      })
                    }
                    onMouseLeave={() => setHoveredDay(null)}
                    className={`w-[11px] h-[11px] rounded-[2px] transition-all cursor-pointer hover:scale-125 ${getCellColor(
                      level
                    )}`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between mt-4 text-xs text-zinc-400 font-mono">
            <div>
              {hoveredDay ? (
                <span className="text-white">
                  {hoveredDay.count} commits on {hoveredDay.date}
                </span>
              ) : (
                <span>Hover over squares to see commits</span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className="w-[10px] h-[10px] rounded-[2px] bg-zinc-900 border border-white/10" />
              <div className="w-[10px] h-[10px] rounded-[2px] bg-zinc-700" />
              <div className="w-[10px] h-[10px] rounded-[2px] bg-zinc-500" />
              <div className="w-[10px] h-[10px] rounded-[2px] bg-zinc-300" />
              <div className="w-[10px] h-[10px] rounded-[2px] bg-white" />
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-5 border-t border-white/10 flex justify-center">
          <a
            href="https://github.com/kamran33678"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full font-bold text-black btn-white flex items-center gap-2 text-sm cursor-pointer shadow-md"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Check My GitHub Profile</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
