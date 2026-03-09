import Link from "next/link";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import type { NavSlug } from "@/lib/belt-data";

interface TrackNavProps {
  activeSlug: NavSlug;
  activeClassName: string;
}

const trackLinks: Array<{ slug: NavSlug; label: string; href: string }> = [
  { slug: "home", label: "Home", href: "/" },
  { slug: "white-to-blue", label: "White to Blue", href: "/white-to-blue" },
  { slug: "blue-to-purple", label: "Blue to Purple", href: "/blue-to-purple" },
  {
    slug: "purple-to-brown",
    label: "Purple to Brown",
    href: "/purple-to-brown",
  },
];

export default function TrackNav({
  activeSlug,
  activeClassName,
}: TrackNavProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <nav
        className="flex flex-wrap items-center gap-5 text-sm"
        style={{ color: "var(--nav-text)" }}
      >
        {trackLinks.map((track) => (
          <Link
            key={track.slug}
            href={track.href}
            className={
              activeSlug === track.slug
                ? activeClassName
                : "font-semibold hover:underline"
            }
            aria-current={activeSlug === track.slug ? "page" : undefined}
          >
            {track.label}
          </Link>
        ))}
      </nav>
      <ThemeToggleButton />
    </div>
  );
}
