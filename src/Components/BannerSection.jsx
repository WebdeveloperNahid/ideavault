"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    title: "Turn your ideas into reality",
    desc: "Join thousands of innovators sharing startup ideas and finding co-founders on IdeaVault.",
    sub: "Innovation starts here",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Collaborate with innovators",
    desc: "Connect with like-minded builders, get feedback, and grow your startup idea together.",
    sub: "Build together",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "From idea to impact",
    desc: "Discover trending startup concepts across FinTech, HealthTech, EdTech and more.",
    sub: "Explore the ecosystem",
    image:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function BannerSection() {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative text-white py-24 px-6 text-center bg-cover bg-center transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `linear-gradient(rgba(25, 46, 31, 0.4), rgba(25, 46, 31, 0.4)), url(${slides[current].image})`,
      }}
    >
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
  );
}
