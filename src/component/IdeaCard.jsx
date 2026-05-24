"use client";

import { useState } from "react";
import Link from "next/link";

const categoryColors = {
  Health:      { bg: "#e8f7f0", text: "#0d6e45", dot: "#1ab87a" },
  Education:   { bg: "#fff4e0", text: "#8a5500", dot: "#f59e0b" },
  Tech:        { bg: "#e8f0fe", text: "#1a3a8a", dot: "#4a7af5" },
  AI:          { bg: "#f0e8fe", text: "#5a1a8a", dot: "#9b5cf6" },
  Finance:     { bg: "#e8fef0", text: "#0a5a2a", dot: "#22c55e" },
  Environment: { bg: "#e8fef8", text: "#0a5a4a", dot: "#14b8a6" },
  Social:      { bg: "#fee8f0", text: "#8a0a3a", dot: "#ec4899" },
  Other:       { bg: "#f4f4f4", text: "#444",    dot: "#888"    },
};

export default function IdeaCard({ idea }) {
  const [hovered, setHovered] = useState(false);
  const cat = categoryColors[idea.category] || categoryColors.Other;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: "18px",
        overflow: "hidden",
        border: hovered ? "1.5px solid #1999f5" : "1.5px solid #e8edf2",
        boxShadow: hovered
          ? "0 16px 48px rgba(25,153,245,0.13), 0 2px 8px rgba(0,0,0,0.06)"
          : "0 2px 12px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-6px) scale(1.012)" : "translateY(0) scale(1)",
        transition: "all 0.32s cubic-bezier(0.34,1.56,0.64,1)",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
    >
      <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
        <img
          src={idea.imageURL}
          alt={idea.ideaTitle}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hovered ? "scale(1.07)" : "scale(1)",
            transition: "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: hovered
            ? "linear-gradient(180deg,rgba(25,153,245,0.08) 0%,rgba(0,0,0,0.35) 100%)"
            : "linear-gradient(180deg,transparent 40%,rgba(0,0,0,0.25) 100%)",
          transition: "background 0.3s ease",
        }} />
        <span style={{
          position: "absolute", top: "14px", left: "14px",
          background: cat.bg, color: cat.text,
          fontSize: "11.5px", fontWeight: 600,
          padding: "4px 11px", borderRadius: "99px",
          display: "flex", alignItems: "center", gap: "5px",
        }}>
          <span style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: cat.dot, display: "inline-block",
          }} />
          {idea.category}
        </span>
      </div>

      <div style={{
        padding: "20px 22px 22px", flex: 1,
        display: "flex", flexDirection: "column", gap: "10px",
      }}>
        <h3 style={{
          fontSize: "17px", fontWeight: 700, margin: 0,
          lineHeight: 1.3, letterSpacing: "-0.01em",
          color: hovered ? "#1999f5" : "#0f1923",
          transition: "color 0.2s",
        }}>
          {idea.ideaTitle}
        </h3>

        <p style={{
          fontSize: "13.5px", color: "#6b7a8d", margin: 0,
          lineHeight: 1.6, display: "-webkit-box",
          WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {idea.shortDescription}
        </p>

        <div style={{
          background: "#f7faff", border: "1px solid #e2ecf8",
          borderRadius: "10px", padding: "10px 13px",
        }}>
          <p style={{
            fontSize: "11.5px", fontWeight: 600, color: "#1999f5",
            margin: "0 0 3px", textTransform: "uppercase", letterSpacing: "0.06em",
          }}>Problem</p>
          <p style={{
            fontSize: "12.5px", color: "#4a5568", margin: 0, lineHeight: 1.5,
            display: "-webkit-box", WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            {idea.problemStatement}
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="#1999f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span style={{ fontSize: "12.5px", color: "#6b7a8d" }}>
            {idea.targetAudience}
          </span>
        </div>

        <Link href={`/ideas/${idea._id}`} style={{ marginTop: "auto", paddingTop: "14px", display: "block", textDecoration: "none" }}>
          <button style={{
            width: "100%", padding: "11px 0",
            background: hovered ? "#1999f5" : "transparent",
            color: hovered ? "#fff" : "#1999f5",
            border: "1.5px solid #1999f5", borderRadius: "10px",
            fontSize: "14px", fontWeight: 600, cursor: "pointer",
            transition: "all 0.25s ease",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "7px",
            fontFamily: "inherit",
          }}>
            View Details
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              style={{ transform: hovered ? "translateX(3px)" : "translateX(0)", transition: "transform 0.25s ease" }}>
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}