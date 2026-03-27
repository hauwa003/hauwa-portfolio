/**
 * Colorful accent tag classes for category pills.
 * Deep vibrant colors on white background.
 */

const colorMap: Record<string, string> = {
  // Project categories
  Healthcare:     "bg-emerald-600 text-white border-emerald-600",
  Fintech:        "bg-amber-500 text-white border-amber-500",
  "Real Estate":  "bg-sky-600 text-white border-sky-600",
  Web3:           "bg-violet-600 text-white border-violet-600",
  SaaS:           "bg-orange-500 text-white border-orange-500",
  Edtech:         "bg-rose-500 text-white border-rose-500",

  // Exploration / project type categories
  "Mobile App":        "bg-pink-500 text-white border-pink-500",
  "Web App":           "bg-sky-600 text-white border-sky-600",
  "Chrome Extension":  "bg-orange-500 text-white border-orange-500",
  Dashboard:           "bg-teal-600 text-white border-teal-600",
  Web:                 "bg-indigo-600 text-white border-indigo-600",
  Branding:            "bg-fuchsia-500 text-white border-fuchsia-500",
};

const fallback = "bg-gray-600 text-white border-gray-600";

export function getTagColor(category: string): string {
  return colorMap[category] ?? fallback;
}
