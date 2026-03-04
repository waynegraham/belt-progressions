type NonEmptyArray<T> = [T, ...T[]];
type AnchorHref = `#${string}`;

export interface GuideNavLink {
  href: AnchorHref;
  label: string;
}

export interface GuidePhase {
  week: string;
  items: NonEmptyArray<string>;
}

export interface GuideCallout {
  accentColor: string;
  content: string;
}

export interface WhiteToBlueGuideContent {
  heroIntro: string;
  onPageLinks: NonEmptyArray<GuideNavLink>;
  overview: {
    paragraphs: NonEmptyArray<string>;
    commonMistakes: NonEmptyArray<string>;
    trainingStructure: string;
    sessionFlow: NonEmptyArray<string>;
    nonNegotiable: GuideCallout;
    writeDown: NonEmptyArray<string>;
    betterQuestions: NonEmptyArray<string>;
    closing: string;
  };
  thirtyDayPlan: NonEmptyArray<GuidePhase>;
  sharkTank: {
    paragraph: string;
    callout: GuideCallout;
    priorities: NonEmptyArray<string>;
  };
}

export interface BlueToPurpleGuideContent {
  heroIntro: string;
  onPageLinks: NonEmptyArray<GuideNavLink>;
  overview: {
    paragraphs: NonEmptyArray<string>;
    asks: NonEmptyArray<string>;
  };
  technique: {
    paragraphs: NonEmptyArray<string>;
  };
  showYourGame: {
    paragraphs: NonEmptyArray<string>;
    defineForEveryPosition: NonEmptyArray<string>;
    callout: GuideCallout;
    exampleStructure: NonEmptyArray<{
      title: string;
      steps: NonEmptyArray<string>;
    }>;
    trainingLead: string;
    trainingSteps: NonEmptyArray<string>;
    trainingClosing: string;
  };
  thirtyDayPlan: NonEmptyArray<GuidePhase>;
  sharkTank: {
    paragraph: string;
    priorities: NonEmptyArray<string>;
    callout: GuideCallout;
  };
}

export const whiteToBlueGuideContent = {
  heroIntro:
    "Congratulations, you got the email (or your instructor told you) that it is time to prepare for your test. You already know the moves. This guide helps structure practice sessions so you can ease nerves and perform with control and composure.",
  onPageLinks: [
    { href: "#overview", label: "Overview" },
    { href: "#plan-30-day", label: "30-Day Plan" },
    { href: "#shark-tank", label: "Shark Tank Strategy" },
  ],
  overview: {
    paragraphs: [
      "Almost everyone at this stage feels some imposter syndrome. This test is meant to show how much you have learned and that you can perform while being observed.",
      "The test has two parts: technique and a shark tank. You are being evaluated on clean execution, order, control, and composure.",
      "Select a uke who is close to your size, has completed this test, and can support your prep sessions and test-day logistics.",
    ],
    commonMistakes: [
      "Rushing through techniques",
      "Skipping key positional moments",
    ],
    trainingStructure:
      "Train in the exact order of the list since the test follows this sequence. Repeating the order builds muscle memory.",
    sessionFlow: [
      "Say the technique name out loud",
      "Perform it slowly (about 50% speed)",
      "Reset and repeat 3 times",
      "Move to the next technique",
      "Write down exactly what is giving you trouble",
    ],
    nonNegotiable: {
      accentColor: "#2563eb",
      content:
        "Non-negotiable: After each session, bring specific questions to a higher belt or instructor so errors are corrected quickly.",
    },
    writeDown: [
      "Where you hesitated",
      "What felt awkward",
      "Where you lose pressure",
      "Anything you consistently forget",
    ],
    betterQuestions: [
      "Where should my weight be during this transition?",
      "Why do I lose my balance here?",
    ],
    closing:
      "This test is meant to be uplifting. Train slowly, reflect honestly, and keep it simple. Calm is confidence.",
  },
  thirtyDayPlan: [
    {
      week: "Week 1 - Organize",
      items: [
        "Watch videos to associate names with techniques.",
        "Drill techniques in order with the 3x session flow.",
        "Focus on slow, clean reps.",
        "Write down trouble points each session.",
        "Ask at least one technical question.",
      ],
    },
    {
      week: "Week 2 - Smoothness",
      items: [
        "Perform 10-15 techniques in sequence without stopping.",
        "Track repeated weak spots.",
        "Ask technical questions and refine details.",
      ],
    },
    {
      week: "Week 3 - Simulation",
      items: [
        "Run one mock test early in the week.",
        "Run one full mock test at the end of the week.",
        "Film and review if possible.",
        "Prioritize after-class rolls and open mat.",
      ],
    },
    {
      week: "Week 4 - Calm Rehearsal",
      items: [
        "Complete two full mock tests at controlled pace.",
        "Use live rolls for cardio and composure.",
        "Prioritize breathing and defensive discipline.",
      ],
    },
  ],
  sharkTank: {
    paragraph:
      "After the technique portion, expect two 10-minute rounds with a new partner roughly every 30 seconds. The goal is composure and defensive ability, not domination.",
    callout: {
      accentColor: "#2563eb",
      content: "You do not get a medal for not tapping.",
    },
    priorities: [
      "Frames first",
      "Guard retention",
      "Inside position",
      "Grip discipline",
      "Controlled breathing",
    ],
  },
} satisfies WhiteToBlueGuideContent;

export const blueToPurpleGuideContent = {
  heroIntro:
    "Congratulations, you got the email (or your instructor told you) that it is time to prepare for your test. This guide gives some tips to help you structure practice sessions to ease your nerves for test day.",
  onPageLinks: [
    { href: "#overview", label: "Overview" },
    { href: "#technique", label: "Technique" },
    { href: "#show-your-game", label: "Show Your Game" },
    { href: "#plan-30-day", label: "30-Day Plan" },
    { href: "#shark-tank", label: "Shark Tank" },
  ],
  overview: {
    paragraphs: [
      "The test is structured much like the White-to-Blue test: you will demonstrate proficiency in the same techniques, plus a few more advanced ones. In addition to the techniques, you will also be asked to show your game.",
      "At this point in your journey, the test is not about adding a few more moves. It is about showing how well you connect and apply them.",
    ],
    asks: [
      "Do you have a system?",
      "Can you transition with intention?",
      "Do you react appropriately?",
    ],
  },
  technique: {
    paragraphs: [
      "The structure is similar to White-to-Blue, but expectations shift. At blue belt, you need to do the move at purple belt. You need to own the move. Be intentional, smooth, and detail-oriented.",
      "You will likely demonstrate all White-to-Blue techniques first, then move to the purple-belt additions.",
    ],
  },
  showYourGame: {
    paragraphs: [
      "This will happen after the technique section and is meant to show that you understand positional advancement, attacking sequences, and appropriate reactions to your opponent's movement. Demonstrate a clear game plan and execute it under pressure.",
      "You will be asked to show your game from specific positions and present your attack chains from each. Build a blueprint for Guard, Half Guard, Side Control, Mount, and Back Control as well as standing. Work with your uke so they can feed realistic reactions that let you demonstrate your system.",
    ],
    defineForEveryPosition: [
      "Primary attack",
      "Secondary attack",
      "Reaction if defended",
      "Transition to the next dominant position",
    ],
    callout: {
      accentColor: "#7c3aed",
      content:
        "This creates decision trees. You are not improvising. You are executing a system.",
    },
    exampleStructure: [
      {
        title: "Closed Guard",
        steps: [
          "Primary choke (for example, cross collar).",
          "Sweep if posture breaks (for example, scissor or flower).",
          "Back take if they defend.",
          "Open guard transition if stacked.",
        ],
      },
      {
        title: "Cross Body",
        steps: [
          "Primary attack (for example, kimura).",
          "Secondary option if they hide the arm (for example, americana).",
          "Switch to the opposite side as needed.",
          "Transition to mount.",
        ],
      },
    ],
    trainingLead: "Twice per week (open mat helps):",
    trainingSteps: [
      "Start in one required position.",
      "Roll only from that position.",
      "Exhaust your options.",
      "Reset and move to the next required position.",
      "Make notes on what is working for you.",
    ],
    trainingClosing: "By week 3, run the full positional sequence in order.",
  },
  thirtyDayPlan: [
    {
      week: "Week 1 - Organize",
      items: [
        "Drill technique clusters in order.",
        "Write out positional blueprints.",
      ],
    },
    {
      week: "Week 2 - System Build",
      items: [
        "Positional sparring from required test positions.",
        "Light-resistance chaining.",
        "Half mock technique run.",
      ],
    },
    {
      week: "Week 3 - Integration",
      items: [
        "Full mock technique test.",
        "Two full show your game simulations.",
        "Before- and after-class rolls.",
      ],
    },
    {
      week: "Week 4 - Pressure",
      items: [
        "Two full mock tests.",
        "Three full positional chain simulations.",
        "Before- and after-class rolls.",
      ],
    },
  ],
  sharkTank: {
    paragraph:
      "You are not being evaluated here. This is to prove you can handle pressure and keep composure. It is not about winning.",
    priorities: [
      "No frantic scrambles.",
      "Defense first.",
      "Heavy top pressure when available.",
      "Intelligent guard recovery.",
      "Structure over strength.",
    ],
    callout: {
      accentColor: "#7c3aed",
      content: "Control your breathing.",
    },
  },
} satisfies BlueToPurpleGuideContent;
