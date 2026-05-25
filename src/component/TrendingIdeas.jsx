"use client";

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

export default function TrendingIdeas() {
  return (
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

              {/* Title */}
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
  );
}
