import { AudiencePathways } from "../components/home/AudiencePathways";
import { CuratedStoneSection } from "../components/home/CuratedStoneSection";
import { DarkReserveCTA } from "../components/home/DarkReserveCTA";
import { FeaturedSlabsSection } from "../components/home/FeaturedSlabsSection";
import { HomeFeatureStrip } from "../components/home/HomeFeatureStrip";
import { HomeHero } from "../components/home/HomeHero";

export function Home() {
  return (
    <>
      <HomeHero />
      <HomeFeatureStrip />
      <CuratedStoneSection />
      <FeaturedSlabsSection />
      <DarkReserveCTA />
      <AudiencePathways />
    </>
  );
}