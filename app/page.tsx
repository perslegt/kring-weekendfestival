import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Presale from "@/components/Presale";
import CampingTypes from "@/components/CampingTypes";
import WeekendVibe from "@/components/WeekendVibe";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <div className="site-background">
        <div className="tape-divider" aria-hidden="true" />
        <Presale />
        <div className="tape-divider" aria-hidden="true" />
        <CampingTypes />
        <WeekendVibe />
        <div className="tape-divider" aria-hidden="true" />
        <FAQ />
        <Footer />
      </div>
    </main>
  );
}
