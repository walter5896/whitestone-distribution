import { AudiencePathways } from "../components/home/AudiencePathways";
import { CuratedStoneSection } from "../components/home/CuratedStoneSection";
import { DarkReserveCTA } from "../components/home/DarkReserveCTA";
import { FeaturedSlabsSection } from "../components/home/FeaturedSlabsSection";
import { HomeFeatureStrip } from "../components/home/HomeFeatureStrip";
import { HomeHero } from "../components/home/HomeHero";
import { PreArrivalSavings } from "../components/home/PreArrivalSavings";

export function Home() {
  return (
    <>
      <HomeHero />
      <HomeFeatureStrip />
      <PreArrivalSavings />
      <CuratedStoneSection />
      <FeaturedSlabsSection />
      <DarkReserveCTA />
      <AudiencePathways />
    </>
  );
}
