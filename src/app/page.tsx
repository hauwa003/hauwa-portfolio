import { Showreel } from "@/components/sections/Showreel";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Testimonial } from "@/components/sections/Testimonial";
import { DesignPhilosophy } from "@/components/sections/DesignPhilosophy";
import { HireMe } from "@/components/sections/HireMe";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <main>
      <Showreel />
      <Hero />
      <SelectedWork />
      <Testimonial />
      <DesignPhilosophy />
      {/* <HireMe /> */}
      <ContactCTA />
    </main>
  );
}
