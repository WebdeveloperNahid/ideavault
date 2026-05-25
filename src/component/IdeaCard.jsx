"use client";

import { useState } from "react";
import Link from "next/link";


const categoryColors = {
  Health:      { bg: "bg-emerald-50",  text: "text-emerald-700",  dot: "bg-emerald-400" },
  Education:   { bg: "bg-amber-50",    text: "text-amber-700",    dot: "bg-amber-400"   },
  Tech:        { bg: "bg-blue-50",     text: "text-blue-700",     dot: "bg-blue-400"    },
  AI:          { bg: "bg-violet-50",   text: "text-violet-700",   dot: "bg-violet-400"  },
  Finance:     { bg: "bg-green-50",    text: "text-green-700",    dot: "bg-green-400"   },
  Environment: { bg: "bg-teal-50",     text: "text-teal-700",     dot: "bg-teal-400"    },
  Social:      { bg: "bg-pink-50",     text: "text-pink-700",     dot: "bg-pink-400"    },
  Other:       { bg: "bg-gray-100",    text: "text-gray-500",     dot: "bg-gray-400"    },
};

export default function IdeaCard({ idea }) {
  const [hovered, setHovered] = useState(false);
  const cat = categoryColors[idea.category] || categoryColors.Other;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        group relative bg-white rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer
        border transition-all duration-300 ease-out
        ${hovered
          ? "border-sky-400 shadow-[0_16px_48px_rgba(25,153,245,0.15)] -translate-y-1.5 scale-[1.012]"
          : "border-slate-200 shadow-md translate-y-0 scale-100"
        }
      `}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img
          src={idea.imageURL}
          alt={idea.ideaTitle}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out ${hovered ? "scale-110" : "scale-100"}`}
        />
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            hovered
              ? "bg-gradient-to-b from-sky-400/10 to-black/40"
              : "bg-gradient-to-b from-transparent via-transparent to-black/25"
          }`}
        />
        <span
          className={`absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold ${cat.bg} ${cat.text}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} />
          {idea.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 gap-2.5 p-5">
        <h3
          className={`text-[17px] font-bold leading-snug tracking-tight transition-colors duration-200 ${
            hovered ? "text-sky-500" : "text-slate-900"
          }`}
        >
          {idea.ideaTitle}
        </h3>

        <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-2">
          {idea.shortDescription}
        </p>

        <div className="bg-sky-50 border border-sky-100 rounded-xl px-3.5 py-2.5">
          <p className="text-[10.5px] font-semibold text-sky-500 uppercase tracking-widest mb-0.5">
            Problem
          </p>
          <p className="text-[12.5px] text-slate-600 leading-relaxed line-clamp-2">
            {idea.problemStatement}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-sky-400 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span className="text-[12.5px] text-slate-500 line-clamp-1">{idea.targetAudience}</span>
        </div>

        <Link href={`/ideas/${idea._id}`} className="mt-auto pt-3 block">
          <button
            className={`
              w-full py-2.5 rounded-xl text-sm font-semibold border border-sky-400
              flex items-center justify-center gap-2 transition-all duration-200
              ${hovered ? "bg-sky-400 text-white" : "bg-transparent text-sky-400"}
            `}
          >
            View Details
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${hovered ? "translate-x-1" : "translate-x-0"}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </Link>
      </div>

    </div>
  );
}