# Accessibility Audit Checklist (Axe + Lighthouse)

Use this checklist before release and after major UI changes.

## Test Setup

- [ ] Run the app locally in production mode (`pnpm build && pnpm start`).
- [ ] Test in Chrome and at least one additional browser.
- [ ] Validate both `light` and `dark` themes.
- [ ] Validate mobile (`390x844`) and desktop (`1440x900`) viewports.

## Automated Axe Checks

- [ ] Open each key route and run Axe DevTools scan:
- [ ] `/`
- [ ] `/white-to-blue`
- [ ] `/blue-to-purple`
- [ ] `/purple-to-brown`
- [ ] `/white-to-blue/training`
- [ ] `/blue-to-purple/training`
- [ ] Record and fix all `critical` and `serious` violations.
- [ ] Confirm no duplicate IDs.
- [ ] Confirm all form controls have accessible names.
- [ ] Confirm dialog/modal content has proper semantics and keyboard support.

## Lighthouse Accessibility Checks

- [ ] Run Lighthouse for each key route (Desktop + Mobile profile).
- [ ] Accessibility score is `>= 95` on all routes.
- [ ] No failed audits related to:
- [ ] color contrast
- [ ] names and labels
- [ ] aria attributes/roles
- [ ] heading order
- [ ] link purpose

## Manual Keyboard Test

- [ ] All interactive elements are reachable with `Tab`.
- [ ] Focus indicator is visible on links, buttons, and inputs.
- [ ] No keyboard traps outside expected modal behavior.
- [ ] Video modal:
- [ ] focus moves into modal on open
- [ ] `Tab`/`Shift+Tab` stays within modal
- [ ] `Escape` closes modal
- [ ] focus returns to triggering control on close

## Screen Reader Smoke Test

- [ ] Page has one clear `h1`.
- [ ] Navigation landmarks are announced meaningfully.
- [ ] Search input announces a useful label.
- [ ] Theme toggle announces state and purpose.
- [ ] Modal announces as a dialog with a clear title.

## Contrast and Theming

- [ ] Body copy meets WCAG AA contrast in light theme.
- [ ] Body copy meets WCAG AA contrast in dark theme.
- [ ] Accent/link colors remain legible in both themes.
- [ ] Hover/focus states remain visible in both themes.

## Exit Criteria

- [ ] No unresolved Axe `critical` or `serious` issues.
- [ ] Lighthouse Accessibility `>= 95` on key routes (desktop + mobile).
- [ ] Keyboard-only path is complete for navigation, search, and modal flows.
