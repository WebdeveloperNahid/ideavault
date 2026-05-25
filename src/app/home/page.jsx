// app/home/page.jsx
"use client";


import BannerSection from "@/component/BannerSection";
import TrendingIdeas from "@/component/TrendingIdeas";


export default function HomePage() {
  return (
    <main>
      <BannerSection />
      <TrendingIdeas />
    </main>
  );
}
