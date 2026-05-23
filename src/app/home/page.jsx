// app/home/page.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ১. এখানে প্রতিটি স্লাইডে ব্যাকগ্রাউন্ড ইমেজের পাথ যোগ করা হয়েছে
// (আপনার public/ ফোল্ডারে থাকা ইমেজের নাম অনুযায়ী এই নামগুলো পরিবর্তন করে নেবেন)
const slides = [
  {
    title: "Turn your ideas into reality",
    desc: "Join thousands of innovators sharing startup ideas and finding co-founders on IdeaVault.",
    sub: "Innovation starts here",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80", // আপনার প্রথম ইমেজ
  },
  {
    title: "Collaborate with innovators",
    desc: "Connect with like-minded builders, get feedback, and grow your startup idea together.",
    sub: "Build together",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80", // আপনার দ্বিতীয় ইমেজ
  },
  {
    title: "From idea to impact",
    desc: "Discover trending startup concepts across FinTech, HealthTech, EdTech and more.",
    sub: "Explore the ecosystem",
    image:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1600&q=80", // আপনার তৃতীয় ইমেজ
  },
];

const trendingIdeas = [
  {
    _id: "1",
    title: "AI Budget Planner",
    category: "FinTech",
    description:
      "Smart budgeting app that learns your spending habits automatically.",
    likes: 142,
    comments: 38,
    date: "Mar 2025",
  },
  {
    _id: "2",
    title: "MedRemind Pro",
    category: "HealthTech",
    description: "Medication reminder with family monitoring dashboard.",
    likes: 98,
    comments: 21,
    date: "Apr 2025",
  },
  {
    _id: "3",
    title: "SkillSwap",
    category: "EdTech",
    description: "Peer-to-peer skill exchange platform for students.",
    likes: 87,
    comments: 19,
    date: "Feb 2025",
  },
  {
    _id: "4",
    title: "CarbonTrack",
    category: "GreenTech",
    description: "Personal carbon footprint tracker with offset suggestions.",
    likes: 76,
    comments: 14,
    date: "May 2025",
  },
  {
    _id: "5",
    title: "FarmSense IoT",
    category: "AgriTech",
    description: "Affordable IoT sensors for small-scale farmers.",
    likes: 65,
    comments: 11,
    date: "Jan 2025",
  },
  {
    _id: "6",
    title: "TeamPulse",
    category: "SaaS",
    description: "Remote team mood tracking and burnout prevention tool.",
    likes: 54,
    comments: 9,
    date: "Apr 2025",
  },
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      {/* ── Banner (এখানে ব্যাকগ্রাউন্ড ইমেজের চেঞ্জগুলো করা হয়েছে) ── */}
      <section
        className="relative text-white py-24 px-6 text-center bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{
          // rgba(25, 46, 31, 0.4) দিয়ে একটি হালকা এবং প্রিমিয়াম গ্রিনিশ শেড আনা হয়েছে
          backgroundImage: `linear-gradient(rgba(25, 46, 31, 0.4), rgba(25, 46, 31, 0.4)), url(${slides[current].image})`,
        }}
      >
        {/* জাস্ট কন্টেন্টগুলো সুন্দর দেখানোর জন্য একটু প্যাডিং বাড়ানো হয়েছে (py-16 থেকে py-24) */}
        <p className="text-[#9CD5FF] text-sm tracking-widest uppercase mb-2">
          {slides[current].sub}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 transition-all duration-500">
          {slides[current].title}
        </h1>
        <p className="text-white/80 max-w-xl mx-auto mb-6 text-sm md:text-base">
          {slides[current].desc}
        </p>
        <Link
          href="/ideas"
          className="inline-block bg-[#9CD5FF] text-[#1a3a4a] font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-[] transition-colors duration-200"
        >
          Explore Ideas →
        </Link>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === current ? "bg-[#9CD5FF]" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ── Trending Ideas ── */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
          Trending Ideas
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          Most popular ideas this week
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingIdeas.map((idea) => (
            <div
              key={idea._id}
              className="relative overflow-hidden bg-white dark:bg-[#0f172a] border border-[#1999f5]/20 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between transition-all duration-500 ease-in-out transform hover:-translate-y-2 hover:scale-[1.02] hover:bg-[#1999f5] dark:hover:bg-[#1999f5] hover:border-[#1999f5] hover:shadow-[0_20px_35px_rgba(25,153,245,0.25)] dark:hover:shadow-[0_20px_45px_rgba(25,153,245,0.4)] group"
            >
              <div>
                {/* Category & Date */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block text-xs font-semibold bg-[#1999f5]/10 text-[#1999f5] dark:bg-[#1999f5]/20 dark:text-[#38bdf8] px-2.5 py-1 rounded-lg group-hover:bg-white/20 group-hover:text-white transition-all duration-500">
                    {idea.category}
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium group-hover:text-white/80 transition-colors duration-500">
                    {idea.date}
                  </span>
                </div>

                {/* Title (Normal obosthay black, hover-e smooth white hobe) */}
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-white transition-colors duration-500 line-clamp-1">
                  {idea.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 line-clamp-2 leading-relaxed group-hover:text-white/90 transition-colors duration-500">
                  {idea.description}
                </p>
              </div>

              {/* Footer Stats */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 group-hover:border-white/20 text-xs font-semibold text-slate-500 dark:text-slate-400 transition-all duration-500">
                {/* Likes */}
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 group-hover:text-white transition-colors duration-500">
                  <span className="text-sm filter group-hover:brightness-200">
                    ❤️
                  </span>
                  <span>{idea.likes}</span>
                </div>
                {/* Comments */}
                <div className="flex items-center gap-1.5 text-[#1999f5] dark:text-[#38bdf8] group-hover:text-white transition-colors duration-500">
                  <span className="text-sm text-[#1999f5] group-hover:text-white transition-colors duration-500">
                    💬
                  </span>
                  <span>{idea.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
