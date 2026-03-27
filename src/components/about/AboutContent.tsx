import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function AboutContent() {
  return (
    <div className="px-8 py-16 lg:px-16">
      {/* Title bar */}
      <ScrollReveal>
        <div className="flex items-center justify-between border-b border-border pb-6">
          <h1 className="font-display text-2xl tracking-[-0.04em]">Getting to know me</h1>
          <span className="text-sm text-muted">About</span>
        </div>
      </ScrollReveal>

      {/* Overview */}
      <ScrollReveal>
        <div id="overview" className="mt-10 max-w-2xl scroll-mt-8">
          <p className="text-base leading-[1.85] text-muted">
            Hi, I&apos;m Hauwa, a product designer. I&apos;ve always been the
            observant one, the person quietly paying attention to how things work
            and how people interact with the tools around them. That habit of
            noticing things eventually led me to design, where curiosity and
            attention to detail are not just useful, but essential.
          </p>
        </div>
      </ScrollReveal>

      {/* Hero photo placeholder */}
      <ScrollReveal>
        <div className="mt-10 aspect-[16/9] w-full rounded-2xl bg-surface" />
      </ScrollReveal>

      {/* Interests */}
      <ScrollReveal>
        <div id="interests" className="mt-10 max-w-2xl scroll-mt-8">
          <p className="text-base leading-[1.85] text-muted">
            Outside of design, I enjoy reading, cooking, watching movies, and
            discovering new places to eat. I&apos;m naturally curious, so
            I&apos;m drawn to experiences that allow me to notice small details,
            whether it&apos;s in a story, a meal, or a place I&apos;ve never
            been before.
          </p>
        </div>
      </ScrollReveal>

      {/* Photo grid — 4 images */}
      <ScrollReveal>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="aspect-[3/4] rounded-2xl bg-surface" />
          <div className="aspect-[3/4] rounded-2xl bg-surface" />
          <div className="aspect-[3/4] rounded-2xl bg-surface" />
          <div className="aspect-[3/4] rounded-2xl bg-surface" />
        </div>
      </ScrollReveal>

      {/* Family Values */}
      <ScrollReveal>
        <div id="family-values" className="mt-10 max-w-2xl scroll-mt-8">
          <p className="text-base leading-[1.85] text-muted">
            I&apos;m also very family-oriented. The people closest to me mean a
            lot to me, and spending time with them is something I truly value.
            They keep me grounded and remind me of what matters most.
          </p>
        </div>
      </ScrollReveal>

      {/* Photo grid — 3 images */}
      <ScrollReveal>
        <div className="mt-10 grid grid-cols-3 gap-3">
          <div className="aspect-[4/3] rounded-2xl bg-surface" />
          <div className="aspect-[4/3] rounded-2xl bg-surface" />
          <div className="aspect-[4/3] rounded-2xl bg-surface" />
        </div>
      </ScrollReveal>

      {/* Music */}
      <ScrollReveal>
        <div id="music" className="mt-10 max-w-2xl scroll-mt-8">
          <p className="text-base leading-[1.85] text-muted">
            Music is also part of my daily rhythm. I usually have a playlist
            playing while I&apos;m working, cooking, or reading. I enjoy
            discovering new songs and building playlists that match different
            moods, often finding music the same way I find ideas, by going down
            unexpected rabbit holes.
          </p>
        </div>
      </ScrollReveal>

      {/* Photo grid — 3 images */}
      <ScrollReveal>
        <div className="mt-10 grid grid-cols-3 gap-3">
          <div className="aspect-[4/3] rounded-2xl bg-surface" />
          <div className="aspect-[4/3] rounded-2xl bg-surface" />
          <div className="aspect-[4/3] rounded-2xl bg-surface" />
        </div>
      </ScrollReveal>

      {/* Let's Connect */}
      <ScrollReveal>
        <div id="lets-connect" className="mt-10 max-w-2xl scroll-mt-8">
          <p className="text-base leading-[1.85] text-muted">
            If any of these things are your kind of thing, feel free to reach
            out and say hello. I&apos;m always happy to talk about books,
            movies, music, or discovering good food. And if you&apos;re curious,
            you can also explore some of the playlists I keep on repeat.
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
