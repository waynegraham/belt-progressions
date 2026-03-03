import type { BeltSlug } from "@/lib/belt-data";

export interface TrackPrimaryTheme {
  textClass: string;
  headingGradientClass: string;
  activeNavClass: string;
  buttonClass: string;
  linkClass: string;
}

export const primaryThemeByTrack: Record<BeltSlug, TrackPrimaryTheme> = {
  "white-to-blue": {
    textClass: "text-blue-700",
    headingGradientClass: "bg-gradient-to-r from-zinc-100 to-blue-700",
    activeNavClass: "font-semibold text-blue-700 underline underline-offset-4",
    buttonClass: "bg-blue-700 hover:bg-blue-600 shadow-[0_8px_22px_rgba(29,78,216,0.35)]",
    linkClass: "text-blue-700 hover:underline dark:text-blue-300",
  },
  "blue-to-purple": {
    textClass: "text-purple-700",
    headingGradientClass: "bg-gradient-to-r from-blue-400 to-purple-800",
    activeNavClass: "font-semibold text-purple-700 underline underline-offset-4",
    buttonClass: "bg-purple-700 hover:bg-purple-600 shadow-[0_8px_22px_rgba(126,34,206,0.35)]",
    linkClass: "text-purple-700 hover:underline dark:text-purple-300",
  },
  "purple-to-brown": {
    textClass: "text-yellow-900",
    headingGradientClass: "bg-gradient-to-r from-purple-400 to-yellow-900",
    activeNavClass: "font-semibold text-yellow-900 underline underline-offset-4",
    buttonClass: "bg-yellow-900 hover:bg-yellow-800 shadow-[0_8px_22px_rgba(146,64,14,0.35)]",
    linkClass: "text-yellow-900 hover:underline dark:text-yellow-300",
  },
};
