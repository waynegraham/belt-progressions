import blueBeltData from "@/lib/blue-belt.json";
import brownBeltData from "@/lib/brown-belt.json";
import whiteBeltData from "@/lib/white-belt.json";

export type BeltSlug = "white-to-blue" | "blue-to-purple" | "purple-to-brown";

export interface BeltMove {
  id: string;
  name: string;
  summary: string;
  order: number;
  tags: string[];
  youtubeUrl: string;
}

export interface TrainingRecommendation {
  title: string;
  notes: string[];
}

export interface BeltMoveCategory {
  id: string;
  label: string;
  moves: BeltMove[];
}

export interface BeltTheme {
  pageBg: string;
  cardBg: string;
  border: string;
  accent: string;
  accentMuted: string;
  text: string;
  trackBar: string;
}

export interface BeltTrack {
  slug: BeltSlug;
  label: string;
  subtitle: string;
  theme: BeltTheme;
  moves: BeltMove[];
  moveCategories?: BeltMoveCategory[];
  trainingRecommendations: TrainingRecommendation[];
}

interface RawMoveCategory {
  label: string;
  moves: Array<{
    name: string;
    note: string;
    youtube: string;
  }>;
}

function mapRawMoveCategories(
  rawCategories: RawMoveCategory[],
  prefix: string,
): BeltMoveCategory[] {
  let order = 0;

  return rawCategories.map((category, categoryIndex) => ({
    id: toSlug(category.label),
    label: category.label,
    moves: category.moves.map((move, moveIndex) => {
      order += 1;

      return {
        id: `${prefix}-${categoryIndex + 1}-${moveIndex + 1}`,
        name: move.name,
        summary: move.note || "No notes provided.",
        order,
        tags: [category.label],
        youtubeUrl: toYoutubeUrl(move.youtube),
      };
    }),
  }));
}

const whiteToBlueCategories = mapRawMoveCategories(
  whiteBeltData as RawMoveCategory[],
  "w2b",
);
const blueToPurpleCategories = mapRawMoveCategories(
  blueBeltData as RawMoveCategory[],
  "b2p",
);
const purpleToBrownCategories = mapRawMoveCategories(
  brownBeltData as RawMoveCategory[],
  "p2b",
);

const whiteToBlue: BeltTrack = {
  slug: "white-to-blue",
  label: "White to Blue",
  subtitle: "Core survival, escapes, and foundational attacks.",
  theme: {
    pageBg: "from-zinc-100 via-[#071326] to-[#070b12]",
    cardBg: "bg-[#0b1222]/75",
    border: "border-[#1f2f4d]",
    accent: "bg-blue-700 hover:bg-blue-800",
    accentMuted: "bg-blue-700/25 text-blue-100",
    text: "text-zinc-100",
    trackBar: "from-zinc-100 to-blue-700",
  },
  moves: whiteToBlueCategories.flatMap((category) => category.moves),
  moveCategories: whiteToBlueCategories,
  trainingRecommendations: [
    {
      title: "Escape Priority Rounds",
      notes: [
        "Start from mount and side control for 4 x 3 minute rounds.",
        "Focus on one escape chain per round before switching.",
        "Track successful escapes and failed attempts in your notes.",
      ],
    },
    {
      title: "Guard Retention Reps",
      notes: [
        "Perform 50 technical stand ups and 50 hip escapes before class.",
        "Use flow rounds to recover guard before attacking.",
        "Film one round each week to review posture mistakes.",
      ],
    },
  ],
};

const blueToPurple: BeltTrack = {
  slug: "blue-to-purple",
  label: "Blue to Purple",
  subtitle: "Link attacks with transitions and positional control.",
  theme: {
    pageBg: "from-blue-300 via-[#0f1026] to-[#070b12]",
    cardBg: "bg-[#111126]/75",
    border: "border-[#2a2b52]",
    accent: "bg-purple-800 hover:bg-purple-700",
    accentMuted: "bg-purple-800/25 text-purple-100",
    text: "text-zinc-100",
    trackBar: "from-blue-300 to-purple-800",
  },
  moves: blueToPurpleCategories.flatMap((category) => category.moves),
  moveCategories: blueToPurpleCategories,
  trainingRecommendations: [
    {
      title: "Chain-Attack Rounds",
      notes: [
        "Build 3-move chains from pass to submission and repeat for 20 minutes.",
        "Do situational rounds from headquarters, half guard top, and turtle.",
        "Score rounds by completed sequences, not single finishes.",
      ],
    },
    {
      title: "Competition Pace Blocks",
      notes: [
        "Add two 6-minute rounds at near competition intensity.",
        "Use active recovery between rounds with grip and posture drills.",
        "Log heart-rate recovery and identify where pace drops.",
      ],
    },
  ],
};

const purpleToBrown: BeltTrack = {
  slug: "purple-to-brown",
  label: "Purple to Brown",
  subtitle: "Refine decision-making, pressure, and high-percentage finishes.",
  theme: {
    pageBg: "from-purple-800 via-[#1a1310] to-[#070b12]",
    cardBg: "bg-[#1a1310]/75",
    border: "border-[#4a3a2d]",
    accent: "bg-yellow-900 hover:bg-yellow-800",
    accentMuted: "bg-yellow-900/25 text-yellow-100",
    text: "text-zinc-100",
    trackBar: "from-purple-500 to-yellow-900",
  },
  moves: purpleToBrownCategories.flatMap((category) => category.moves),
  moveCategories: purpleToBrownCategories,
  trainingRecommendations: [
    {
      title: "Constraint-Based Sparring",
      notes: [
        "Run 5-minute rounds where you can only score from one family of attacks.",
        "Rotate constraints weekly: passing, back takes, and mount finishes.",
        "Review round footage and annotate decision points.",
      ],
    },
    {
      title: "Teaching-to-Learn",
      notes: [
        "Teach one move sequence each week to a lower belt training partner.",
        "Aim for concise cueing and clear troubleshooting checkpoints.",
        "Update your notes with the most common sticking points.",
      ],
    },
  ],
};

export const beltTracks: Record<BeltSlug, BeltTrack> = {
  "white-to-blue": whiteToBlue,
  "blue-to-purple": blueToPurple,
  "purple-to-brown": purpleToBrown,
};

export const beltTrackList = Object.values(beltTracks);

export const beltSlugs = Object.keys(beltTracks) as BeltSlug[];

export function isBeltSlug(value: string): value is BeltSlug {
  return beltSlugs.includes(value as BeltSlug);
}

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toYoutubeUrl(value: string): string {
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  const [videoId, query] = value.split("?");
  return query
    ? `https://www.youtube.com/watch?v=${videoId}&${query}`
    : `https://www.youtube.com/watch?v=${videoId}`;
}
