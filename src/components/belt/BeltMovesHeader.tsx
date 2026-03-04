import Link from "next/link";
import TrackNav from "@/components/TrackNav";
import type { BeltTrack } from "@/lib/belt-data";
import type { TrackPrimaryTheme } from "@/lib/track-ui";

interface BeltMovesHeaderProps {
  track: BeltTrack;
  primaryTheme: TrackPrimaryTheme;
  query: string;
  onQueryChange: (value: string) => void;
  testMode: boolean;
  onToggleTestMode: () => void;
}

export default function BeltMovesHeader({
  track,
  primaryTheme,
  query,
  onQueryChange,
  testMode,
  onToggleTestMode,
}: BeltMovesHeaderProps) {
  return (
    <header className="space-y-4">
      <TrackNav
        activeSlug={track.slug}
        activeClassName={primaryTheme.activeNavClass}
      />

      <h1
        className={`bg-clip-text text-7xl leading-tight font-extrabold text-transparent md:text-7xl print:bg-none print:text-black ${primaryTheme.headingGradientClass}`}
      >
        {track.label}
      </h1>

      <p
        className={`mb-8 inline-block text-2xl font-semibold tracking-tighter ${primaryTheme.textClass}`}
      >
        {toRequirementTitle(track.label)}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onToggleTestMode}
          className={`inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold text-white transition-colors ${primaryTheme.buttonClass}`}
        >
          {testMode ? "Exit Test Mode" : "Test Mode"}
        </button>
        <Link
          href={`/${track.slug}/training`}
          className="inline-flex h-11 items-center justify-center rounded-full border px-5 text-sm font-medium hover:bg-slate-50"
          style={{
            borderColor: "var(--border-1)",
            backgroundColor: "var(--surface-1)",
          }}
        >
          Test Preparation Guide
        </Link>
      </div>
      <p>
        <a
          target="_blank"
          rel="nofollow noopener noreferrer"
          href="https://waynegraham.github.io/bjj-study-guide/gracie-jiu-jitsu_compress.pdf"
          className={`text-sm underline underline-offset-2 ${primaryTheme.textClass}`}
        >
          Reference
        </a>
      </p>
      <label className="block">
        <span className="sr-only">Search techniques</span>
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search"
          aria-label="Search techniques"
          className="w-full rounded-md border px-3 py-2 text-sm ring-sky-400 outline-none focus:ring"
          style={{
            borderColor: "var(--input-border)",
            backgroundColor: "var(--input-bg)",
            color: "var(--input-text)",
          }}
        />
      </label>
    </header>
  );
}

function toRequirementTitle(label: string): string {
  const [from, to] = label.split(" to ").map((part) => part.trim());
  if (!from || !to) {
    return `${label} Test Requirements`;
  }
  return `${to} Belt Test Requirements`;
}
