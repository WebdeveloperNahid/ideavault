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
          className="inline-block bg-[#9CD5FF] text-[#1a3a4a] font-semibold px-6 py-3 rounded-lg hover:bg-white transition-colors duration-200"
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
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
            >
              <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-md mb-3 w-fit">
                {idea.category}
              </span>

              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                {idea.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                {idea.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                <span>❤ {idea.likes}</span>
                <span>💬 {idea.comments}</span>
                <span>{idea.date}</span>
              </div>

              <Link
                href={`/ideas/${idea._id}`}
                className="block text-center border border-[#355872] text-[#355872] dark:border-[#9CD5FF] dark:text-[#9CD5FF] text-sm font-semibold py-2 rounded-lg hover:bg-[#355872] hover:text-white dark:hover:bg-[#9CD5FF] dark:hover:text-[#1a3a4a] transition-colors duration-200"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
