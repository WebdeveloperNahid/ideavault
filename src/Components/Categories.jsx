"use client";

import { 
  Cpu, 
  Brain, 
  HeartPulse, 
  GraduationCap, 
  Coins, 
  LayoutGrid 
} from "lucide-react";

export default function Categories() {
  const categories = [
    {
      title: "Technology",
      desc: "Latest tech trends & tools",
      icon: <Cpu className="w-6 h-6" />,
      iconColor: "bg-blue-500 text-white border-blue-600",
      // কার্ডের নিজস্ব ব্যাকগ্রাউন্ড সাদা রাখা হয়েছে যাতে সেকশনের হালকা ব্যাকগ্রাউন্ডের উপর এটি চমৎকারভাবে পপ আপ করে
      cardColor: "bg-white border-blue-100/70"
    },
    {
      title: "AI & ML",
      desc: "Artificial Intelligence insights",
      icon: <Brain className="w-6 h-6" />,
      iconColor: "bg-purple-600 text-white border-purple-700",
      cardColor: "bg-white border-purple-100/70"
    },
    {
      title: "Health",
      desc: "Wellness & medical updates",
      icon: <HeartPulse className="w-6 h-6" />,
      iconColor: "bg-emerald-600 text-white border-emerald-700",
      cardColor: "bg-white border-emerald-100/70"
    },
    {
      title: "Education",
      desc: "Learning & career growth",
      icon: <GraduationCap className="w-6 h-6" />,
      iconColor: "bg-amber-600 text-white border-amber-700",
      cardColor: "bg-white border-amber-100/70"
    },
    {
      title: "Finance",
      desc: "Money & investment tips",
      icon: <Coins className="w-6 h-6" />,
      iconColor: "bg-cyan-600 text-white border-cyan-700",
      cardColor: "bg-white border-cyan-100/70"
    },
    {
      title: "Others",
      desc: "More interesting topics",
      icon: <LayoutGrid className="w-6 h-6" />,
      iconColor: "bg-slate-700 text-white border-slate-800",
      cardColor: "bg-white border-slate-200"
    }
  ];

  return (
    // 💡 এখানে 'bg-slate-50/70' ব্যবহার করা হয়েছে, যা সেকশনটিকে আলাদা একটি হালকা শেড দেবে
    <section className="py-24 bg-slate-50/70 border-y border-slate-100">
      <div className="container mx-auto">
        
        {/* সেকশন হেডার */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Popular Ideas <span className="text-blue-600">Categories</span>
          </h2>
          <p className="text-slate-500 font-medium text-base md:text-lg">
            Explore trending topics across different fields
          </p>
        </div>

        {/* ক্যাটাগরি গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <div 
              key={index}
              // 💡 হালকা ব্যাকগ্রাউন্ডের উপর সাদা রঙের কার্ডগুলো শ্যাডো সহ দারুণ একটা ৩ডি ভাইব তৈরি করবে
              className={`flex items-start p-8 rounded-[2rem] border shadow-sm transition-all duration-300 ease-out cursor-pointer hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 ${cat.cardColor}`}
            >
              {/* আইকন বক্স */}
              <div className={`p-4 rounded-2xl mr-6 border shadow-inner ${cat.iconColor}`}>
                {cat.icon}
              </div>
              
              {/* টেক্সট বক্স */}
              <div className="space-y-1 mt-1">
                <h4 className="text-xl font-bold text-slate-900">
                  {cat.title}
                </h4>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}