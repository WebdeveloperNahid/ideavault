// app/home/page.jsx

export const dynamic = "force-dynamic";

import BannerSection from "@/Components/BannerSection";
import Categories from "@/Components/Categories";
import TrendingIdeas from "@/Components/TrendingIdeas";
import WhyChoiceUs from "@/Components/WhyChoiseUs";
import WhyIdeaVault from "@/Components/WhyIdeaVault";

import { fetchHomeData } from "@/lib/ideasapi/data";
import Link from "next/link";

export default async function HomePage() {
  const triendingsData = await fetchHomeData();
  return (
    <main>
      <BannerSection />
      <TrendingIdeas triendingsData={triendingsData} />

      <div className="flex justify-center items-center py-5 ">
        <Link href={"/ideas"}>
          <button className="bg-black text-white px-3 py-2 rounded-[5px] hover:bg-sky-500 cursor-pointer">
            Explore More
          </button>
        </Link>
      </div>

      <div>
        <WhyIdeaVault></WhyIdeaVault>
        <Categories></Categories>
        <WhyChoiceUs></WhyChoiceUs>
      </div>
    </main>
  );
}
