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
  trainingRecommendations: TrainingRecommendation[];
}

const whiteToBlue: BeltTrack = {
  slug: "white-to-blue",
  label: "White to Blue",
  subtitle: "Core survival, escapes, and foundational attacks.",
  theme: {
    pageBg: "from-zinc-100 via-[#071326] to-[#070b12]",
    cardBg: "bg-[#0b1222]/75",
    border: "border-[#1f2f4d]",
    accent: "bg-blue-900 hover:bg-blue-800",
    accentMuted: "bg-blue-900/25 text-blue-100",
    text: "text-zinc-100",
    trackBar: "from-zinc-100 to-blue-900",
  },
  moves: [
    {
      id: "w2b-1",
      name: "Technical Stand Up",
      summary: "Build distance and stand without exposing your hips.",
      order: 1,
      tags: ["defense", "movement"],
      youtubeUrl: "https://www.youtube.com/watch?v=0JjQfPAnN0w",
    },
    {
      id: "w2b-2",
      name: "Bridge and Roll Escape",
      summary: "Trap arm and foot from mount to reverse top position.",
      order: 2,
      tags: ["mount escape"],
      youtubeUrl: "https://www.youtube.com/watch?v=lXQIcqKf5Uw",
    },
    {
      id: "w2b-3",
      name: "Elbow-Knee Escape",
      summary: "Recover half guard or full guard from low mount pressure.",
      order: 3,
      tags: ["mount escape", "guard recovery"],
      youtubeUrl: "https://www.youtube.com/watch?v=THP0QAbA2Nw",
    },
    {
      id: "w2b-4",
      name: "Closed Guard Hip Bump Sweep",
      summary: "Sit up sweep when opponent posts or pressures forward.",
      order: 4,
      tags: ["sweep", "closed guard"],
      youtubeUrl: "https://www.youtube.com/watch?v=v3f9M4Jf1Dk",
    },
    {
      id: "w2b-5",
      name: "Cross Collar Choke from Guard",
      summary: "Build deep collar grip sequence to finish from closed guard.",
      order: 5,
      tags: ["submission", "closed guard"],
      youtubeUrl: "https://www.youtube.com/watch?v=t2XnG8x8Udk",
    },
  ],
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
  moves: [
    {
      id: "b2p-1",
      name: "Knee Cut Pass",
      summary: "Pin the shield and control upper body to pass to side control.",
      order: 1,
      tags: ["guard pass", "pressure"],
      youtubeUrl: "https://www.youtube.com/watch?v=WWQ8sA2Q4sQ",
    },
    {
      id: "b2p-2",
      name: "Back Take from Turtle",
      summary: "Insert hooks and secure seatbelt while removing base posts.",
      order: 2,
      tags: ["back control", "transition"],
      youtubeUrl: "https://www.youtube.com/watch?v=PBh0I4TGqeg",
    },
    {
      id: "b2p-3",
      name: "Bow and Arrow Choke",
      summary: "Use collar and leg extension for a high-control back finish.",
      order: 3,
      tags: ["submission", "back control"],
      youtubeUrl: "https://www.youtube.com/watch?v=tc4Q0Mda2_I",
    },
    {
      id: "b2p-4",
      name: "Kimura Trap to Back",
      summary: "Chain kimura control into sweep or back exposure.",
      order: 4,
      tags: ["kimura", "transition"],
      youtubeUrl: "https://www.youtube.com/watch?v=vZz17N7coMc",
    },
    {
      id: "b2p-5",
      name: "Single Leg X Sweep",
      summary: "Off-balance and elevate to come up into top position.",
      order: 5,
      tags: ["sweep", "open guard"],
      youtubeUrl: "https://www.youtube.com/watch?v=Jf6xgXN7f5c",
    },
  ],
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
    accent: "bg-stone-500 hover:bg-stone-400",
    accentMuted: "bg-stone-500/25 text-stone-100",
    text: "text-zinc-100",
    trackBar: "from-purple-800 to-stone-500",
  },
  moves: [
    {
      id: "p2b-1",
      name: "Body Lock Pass",
      summary: "Collapse hips and advance to chest-to-chest side control.",
      order: 1,
      tags: ["guard pass", "pressure"],
      youtubeUrl: "https://www.youtube.com/watch?v=goA0k9zQ2Q0",
    },
    {
      id: "p2b-2",
      name: "Arm Triangle from Mount",
      summary: "Force head-and-arm alignment and finish with shoulder pressure.",
      order: 2,
      tags: ["submission", "mount"],
      youtubeUrl: "https://www.youtube.com/watch?v=E6Mqs7Q9f8A",
    },
    {
      id: "p2b-3",
      name: "North-South Choke",
      summary: "Set chest angle and lat pressure from dominant top control.",
      order: 3,
      tags: ["submission", "north-south"],
      youtubeUrl: "https://www.youtube.com/watch?v=QNEOwQ0vPrM",
    },
    {
      id: "p2b-4",
      name: "Crab Ride Back Take",
      summary: "Use leg hooks and hip control to expose and secure the back.",
      order: 4,
      tags: ["back take", "transition"],
      youtubeUrl: "https://www.youtube.com/watch?v=ZzIevQ6Jr3g",
    },
    {
      id: "p2b-5",
      name: "Berimbolo Entry",
      summary: "Invert with control to off-balance and spin behind the hips.",
      order: 5,
      tags: ["inversion", "back take"],
      youtubeUrl: "https://www.youtube.com/watch?v=2Q6YIqV8Sm0",
    },
  ],
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
