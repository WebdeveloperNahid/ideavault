// app/home/page.jsx


import BannerSection from "@/component/BannerSection";
import TrendingIdeas from "@/component/TrendingIdeas";
import { fetchHomeData } from "@/lib/ideasapi/data";


export default async function HomePage() {
  const triendingsData = await fetchHomeData();
  return (
    <main>
      <BannerSection />
      <TrendingIdeas triendingsData={triendingsData} />
    </main>
  );
}
