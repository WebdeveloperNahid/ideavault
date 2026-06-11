"use client";

import { Lightbulb, MessageSquare, Users, Zap } from "lucide-react";

export default function WhyIdeaVault() {
  const features = [
    {
      icon: <Lightbulb className="w-6 h-6 text-white" />,
      title: "Share Ideas",
      desc: "Post your innovative concepts and get valuable initial feedback from the community.",
      iconColor: "bg-blue-600 border-blue-700",
      // সেকশনের ব্যাকগ্রাউন্ডের সাথে ম্যাচ করে কার্ডের বর্ডার এবং শ্যাডো সামান্য টিউন করা হয়েছে
      cardColor: "bg-white border-blue-100/60 shadow-sm"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-white" />,
      title: "Get Feedback",
      desc: "Engage with the community to refine your thoughts and improve your original ideas.",
      iconColor: "bg-emerald-600 border-emerald-700",
      cardColor: "bg-white border-emerald-100/60 shadow-sm"
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: "Build Together",
      desc: "Collaborate and turn abstract concepts into impactful real-world solutions.",
      iconColor: "bg-purple-600 border-purple-700",
      cardColor: "bg-white border-purple-100/60 shadow-sm"
    },
    {
      icon: <Zap className="w-6 h-6 text-white" />,
      title: "Grow Faster",
      desc: "Validate, iterate, and launch your startup idea with confidence.",
      iconColor: "bg-amber-600 border-amber-700",
      cardColor: "bg-white border-amber-100/60 shadow-sm"
    },
  ];

  return (
    // 💡 এখানে 'bg-blue-50/30' এবং হালকা বর্ডার ব্যবহার করা হয়েছে যা সেকশনটিকে মডার্ন ব্লক ভাইব দেবে
    <section className="py-24 bg-blue-50/30 border-b border-slate-100">
      <div className="container mx-auto">
        
        {/* সেকশন হেডার */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Why <span className="text-blue-600">IdeaVault?</span>
          </h2>
          <p className="text-slate-600 font-medium text-base md:text-lg">
            A community built for innovators, founders, and creators to share, improve, and launch ideas together.
          </p>
        </div>

        {/* ফিচার গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div 
              key={index} 
              // 💡 হালকা ব্যাকগ্রাউন্ডের উপর কার্ডগুলো সাদা (bg-white) হওয়ায় এগুলো থ্রিডি ইফেক্টের মতো ভেসে উঠবে
              className={`p-8 rounded-[2rem] border transition-all duration-300 ease-out cursor-pointer hover:shadow-xl hover:scale-[1.04] hover:-translate-y-1 ${item.cardColor}`}
            >
              {/* আইকন বক্স */}
              <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-6 shadow-md transition-transform duration-300 ${item.iconColor}`}>
                {item.icon}
              </div>
              
              {/* টেক্সট */}
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}