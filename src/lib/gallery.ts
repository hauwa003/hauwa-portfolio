export interface GalleryItem {
  src: string;
  alt: string;
  project: string;
  width: number;
  height: number;
  hoverEffect: "zoom" | "lift" | "tilt" | "reveal";
}

export const galleryItems: GalleryItem[] = [
  {
    src: "/images/projects/budgio-screens.png",
    alt: "Budgio mobile app screens",
    project: "Budgio",
    width: 5000,
    height: 3600,
    hoverEffect: "zoom",
  },
  {
    src: "/images/projects/onboarding.png",
    alt: "Onboarding flow design",
    project: "Onboarding",
    width: 2672,
    height: 2258,
    hoverEffect: "lift",
  },
  {
    src: "/images/projects/brix.png",
    alt: "Brix design system",
    project: "Brix",
    width: 2672,
    height: 2258,
    hoverEffect: "tilt",
  },
  {
    src: "/images/projects/memory-bird.png",
    alt: "Memory Bird app interface",
    project: "Memory Bird",
    width: 3526,
    height: 2952,
    hoverEffect: "reveal",
  },
  {
    src: "/images/projects/basketball.png",
    alt: "Basketball app concept",
    project: "Basketball",
    width: 640,
    height: 941,
    hoverEffect: "zoom",
  },
  {
    src: "/images/projects/tennis.png",
    alt: "Tennis app concept",
    project: "Tennis",
    width: 1280,
    height: 1882,
    hoverEffect: "lift",
  },
  {
    src: "/images/projects/football.png",
    alt: "Football app concept",
    project: "Football",
    width: 1280,
    height: 1882,
    hoverEffect: "tilt",
  },
];
