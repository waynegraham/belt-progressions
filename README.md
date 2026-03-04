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
- `src/app/[belt]/training/page.tsx`: training guide route coordinator per belt
- `src/components/BeltMovesPage.tsx`: searchable move list + video modal + Test Mode entry
- `src/components/MoveTestMode.tsx`: fullscreen test experience
- `src/components/TrackNav.tsx`: shared belt navigation + theme toggle
- `src/components/training/*.tsx`: belt-specific and generic training guide layouts/content
- `src/lib/belt-data.ts`: normalized belt track data, themes, and utilities
- `src/lib/track-ui.ts`: shared track theme classes for curriculum/training pages
- `src/lib/training-guide-content.ts`: structured long-form training guide copy and 30-day plans
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
- `npm run test:e2e`: run Playwright smoke tests
- `npm run test:e2e:headed`: run Playwright smoke tests in headed mode

## Testing

Current automated coverage includes:

- Component behavior tests in `src/components/__tests__/`:
  - `BeltMovesPage.test.tsx`
  - `MoveTestMode.test.tsx`
  - `ThemeToggleButton.test.tsx`
- Training route coordinator tests in `src/app/__tests__/belt-training-page.test.tsx`
- Modal hook tests in `src/hooks/__tests__/useVideoModal.test.tsx`
- YouTube parsing utility tests in `src/lib/__tests__/youtube.test.tsx`
- Training content contract tests in `src/lib/__tests__/training-guide-content.test.tsx`
- E2E smoke tests in `e2e/` using Playwright

For first-time Playwright setup, install browsers:

```bash
npx playwright install
```

When adding features, place tests near the related layer (component, app route, hook, or lib utility) to keep scope focused.

## Data and Content Updates

- Update source move lists in `src/lib/white-belt.json` and `src/lib/blue-belt.json`.
- Belt metadata, themes, and derived move mapping live in `src/lib/belt-data.ts`.
- Shared track page theme classes live in `src/lib/track-ui.ts`.
- Training guide copy/sections/plans live in `src/lib/training-guide-content.ts`.
- Training guide rendering/layout lives in `src/components/training/`.

### Editing the Test Preparation Guide

The route entry point is `src/app/[belt]/training/page.tsx`, which selects the proper guide component.

- White to Blue guide: edit `src/components/training/WhiteToBlueGuide.tsx`.
- Blue to Purple guide: edit `src/components/training/BlueToPurpleGuide.tsx`.
- Guide copy and 30-day plans: update `src/lib/training-guide-content.ts`.
- Purple to Brown (and any non-custom track): update `trainingRecommendations` in `src/lib/belt-data.ts` and the generic layout in `src/components/training/GenericTrainingGuide.tsx` as needed.

After making content changes, run the app and verify:

1. Open `http://localhost:3000/<belt>/training` for each affected belt.
2. Confirm section links (for example, `#overview`, `#plan-30-day`) still match their headings.
3. Check spacing and colors in both light and dark mode.

## Notes

- YouTube links in the JSON can include timestamp query params and are normalized for embed playback.
- `MoveTestMode` requests fullscreen/wake-lock where supported and falls back gracefully if blocked.
