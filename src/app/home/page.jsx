// app/home/page.jsx


import BannerSection from "@/component/BannerSection";
import Categories from "@/component/Categories";
import TrendingIdeas from "@/component/TrendingIdeas";
import WhyChoiceUs from "@/component/WhyChoiseUs";
import WhyIdeaVault from "@/component/WhyIdeaVault";


import { fetchHomeData } from "@/lib/ideasapi/data";
import Link from "next/link";


export default async function HomePage() {
  const triendingsData = await fetchHomeData();
  return (
    <main>
      <BannerSection />
      <TrendingIdeas triendingsData={triendingsData} />

      <div className="flex justify-center items-center ">
        <Link href={"/ideas"}>
        <button className="bg-black text-white px-3 py-2 rounded-[5px] hover:bg-sky-500 cursor-pointer" >Explore More</button>
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
