import { Showreel } from "@/components/sections/Showreel";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Testimonial } from "@/components/sections/Testimonial";
import { ProcessSnapshot } from "@/components/sections/ProcessSnapshot";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main>
      <Showreel />
      <Hero />
      <SelectedWork />
      <Testimonial />
      <ProcessSnapshot />
      <AboutTeaser />
      <ContactSection />
    </main>
  );
}
