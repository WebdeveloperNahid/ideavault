"use client";

import { 
  Layers, 
  Rocket, 
  Award, 
  ShieldCheck 
} from "lucide-react";

export default function WhyChoiceUs() {
  const infoCards = [
    {
      q: "What is this platform about?",
      a: "A place for ideas to grow. This platform helps you turn thoughts into real projects. You can share ideas, explore what others are building, and organize everything in one clean space designed for creators and developers.",
      icon: <Layers className="w-6 h-6 text-white" />,
      iconColor: "bg-blue-600 border-blue-700",
      cardColor: "bg-blue-50/50 border-blue-100/70"
    },
    {
      q: "How does it actually work?",
      a: "Simple flow, powerful system. Anyone can sign up, publish a startup or project concept, tag it by category, and immediately open the doors for community validation, reviews, and potential co-founder matchmaking.",
      icon: <Rocket className="w-6 h-6 text-white" />,
      iconColor: "bg-emerald-600 border-emerald-700",
      cardColor: "bg-emerald-50/50 border-emerald-100/70"
    },
    {
      q: "What makes this project special?",
      a: "Built for real builders. Unlike general social media platforms, IdeaVault focuses purely on structure, growth metrics, and insightful constructive critiques from verified tech enthusiasts and fellow creators.",
      icon: <Award className="w-6 h-6 text-white" />,
      iconColor: "bg-purple-600 border-purple-700",
      cardColor: "bg-purple-50/50 border-purple-100/70"
    },
    {
      q: "Is my data safe here?",
      a: "Security-first approach. We take intellectual privacy and data rights seriously. Your authentication is protected with robust encryption, and you retain full ownership over the content and ideas you publish.",
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
      iconColor: "bg-amber-600 border-amber-700",
      cardColor: "bg-amber-50/50 border-amber-100/70"
    },
  ];

  return (
    // 💡 পুরো সেকশনের ব্যাকগ্রাউন্ডে খুব হালকা একটি মডার্ন কালার শেড (গ্রেডিয়েন্ট) দেওয়া হয়েছে
    <section className="py-24 bg-gradient-to-tr from-slate-50 via-cyan-50/20 to-blue-50/40">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* সেকশন হেডার */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Why Is This a <span className="text-blue-600">Good Choice</span> for You?
          </h2>
          <p className="text-slate-600 font-medium text-base md:text-lg leading-relaxed">
            Discover a modern platform designed to help creators organize ideas, collaborate smoothly, and build projects with confidence.
          </p>
        </div>

        {/* ইনফো/এফএকিউ গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {infoCards.map((card, index) => (
            <div 
              key={index}
              // 💡 কার্ডের প্যাডিং বড় করা হয়েছে, কালার পার্মানেন্ট এবং হোভারে হালকা স্কেল জুম কাজ করবে
              className={`p-8 rounded-[2rem] border shadow-sm transition-all duration-300 ease-out cursor-pointer hover:shadow-xl hover:scale-[1.03] flex flex-col sm:flex-row items-start gap-6 ${card.cardColor}`}
            >
              {/* আইকন বক্স */}
              <div className={`p-4 rounded-2xl border shadow-md shrink-0 ${card.iconColor}`}>
                {card.icon}
              </div>
              
              {/* প্রশ্ন ও উত্তর */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-950 tracking-tight">
                  {card.q}
                </h3>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                  {card.a}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}