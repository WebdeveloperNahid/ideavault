"use client";

import IdeaCard from "./IdeaCard";

// const trendingIdeas = [
//   {
//     _id: "1",
//     title: "AI Budget Planner",
//     category: "FinTech",
//     description:
//       "Smart budgeting app that learns your spending habits automatically.",
//     likes: 142,
//     comments: 38,
//     date: "Mar 2025",
//   },
//   {
//     _id: "2",
//     title: "MedRemind Pro",
//     category: "HealthTech",
//     description: "Medication reminder with family monitoring dashboard.",
//     likes: 98,
//     comments: 21,
//     date: "Apr 2025",
//   },
//   {
//     _id: "3",
//     title: "SkillSwap",
//     category: "EdTech",
//     description: "Peer-to-peer skill exchange platform for students.",
//     likes: 87,
//     comments: 19,
//     date: "Feb 2025",
//   },
//   {
//     _id: "4",
//     title: "CarbonTrack",
//     category: "GreenTech",
//     description: "Personal carbon footprint tracker with offset suggestions.",
//     likes: 76,
//     comments: 14,
//     date: "May 2025",
//   },
//   {
//     _id: "5",
//     title: "FarmSense IoT",
//     category: "AgriTech",
//     description: "Affordable IoT sensors for small-scale farmers.",
//     likes: 65,
//     comments: 11,
//     date: "Jan 2025",
//   },
//   {
//     _id: "6",
//     title: "TeamPulse",
//     category: "SaaS",
//     description: "Remote team mood tracking and burnout prevention tool.",
//     likes: 54,
//     comments: 9,
//     date: "Apr 2025",
//   },
// ];

export default function TrendingIdeas({triendingsData}) {
  // const {title,category,description,likes,comments,date} = triendingsData;
  if(!triendingsData || !Array.isArray(triendingsData)) return null;
  return (
    <section className="px-6 py-12 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
        Trending Ideas
      </h2>
      <p className="text-gray-500 text-sm mb-8">
        Most popular ideas this week
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {triendingsData?.map((idea) => (
          <IdeaCard key={idea._id} idea={idea} ></IdeaCard>
        ))}
      </div>
    </section>
  );
}
