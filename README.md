# Belt Progressions

A Next.js study and test-prep app for PSBJJ belt demonstrations.

The project unifies curriculum review and preparation workflows for:

- White to Blue
- Blue to Purple
- Purple to Brown

## Features

- Curriculum pages grouped by section with searchable moves and notes
- Video modal playback with YouTube timestamp support
- Fullscreen Test Mode
- Swipe navigation (up/right next, down/left previous)
- Voice commands (`next`, `previous`, `tap out`, `exit`)
- Completion state and restart flow
- belt-specific color themes
- Light/dark mode toggle (persisted in `localStorage`)
- Track-specific training/preparation guide pages
- Print-friendly curriculum layout

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- Jest + Testing Library

## Project Structure

- `src/app/page.tsx`: home page / belt selection
- `src/app/[belt]/page.tsx`: curriculum page per belt
- `src/app/[belt]/training/page.tsx`: training guide per belt
- `src/components/BeltMovesPage.tsx`: searchable move list + video modal + Test Mode entry
- `src/components/MoveTestMode.tsx`: fullscreen test experience
- `src/lib/belt-data.ts`: normalized belt track data, themes, and utilities
- `src/lib/white-belt.json`, `src/lib/blue-belt.json`: source move lists

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the dev server:
```bash
npm run dev
```

3. Open:
`http://localhost:3000`

## Scripts

- `npm run dev`: run local development server
- `npm run build`: production build
- `npm run start`: run production server
- `npm run lint`: run ESLint
- `npm test`: run Jest test suite

## Data and Content Updates

- Update source move lists in `src/lib/white-belt.json` and `src/lib/blue-belt.json`.
- Belt metadata, themes, and derived move mapping live in `src/lib/belt-data.ts`.
- Training guide copy lives in `src/app/[belt]/training/page.tsx`.

### Editing the Test Preparation Guide

The Test Preparation guide content is defined in `src/app/[belt]/training/page.tsx`.

- White to Blue guide: edit the `if (track.slug === "white-to-blue")` block.
- Blue to Purple guide: edit the `if (track.slug === "blue-to-purple")` block.
- 30-day plans: update `whiteToBlueThirtyDayPlan` and `blueToPurpleThirtyDayPlan` at the top of the file.
- Purple to Brown (and any non-custom track): update `trainingRecommendations` in `src/lib/belt-data.ts`.

After making content changes, run the app and verify:

1. Open `http://localhost:3000/<belt>/training` for each affected belt.
2. Confirm section links (for example, `#overview`, `#plan-30-day`) still match their headings.
3. Check spacing and colors in both light and dark mode.

## Notes

- YouTube links in the JSON can include timestamp query params and are normalized for embed playback.
- `MoveTestMode` requests fullscreen/wake-lock where supported and falls back gracefully if blocked.
