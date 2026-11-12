import FeaturedProjects from "@/features/home/components/FeaturedProjects";
import Hero from "@/features/home/components/Hero";
import AboutJourney from "@/features/home/components/AboutJourney";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProjects />
      <AboutJourney />
    </main>
  );
}