import type { BeltMoveCategory } from "@/lib/belt-data";
import type { TrackPrimaryTheme } from "@/lib/track-ui";

interface MoveCategoryListProps {
  categories: BeltMoveCategory[];
  currentPathname: string;
  linkClassName: TrackPrimaryTheme["linkClass"];
  onOpenVideo: (videoId: string) => void;
}

export default function MoveCategoryList({
  categories,
  currentPathname,
  linkClassName,
  onOpenVideo,
}: MoveCategoryListProps) {
  return (
    <section className="space-y-5">
      {categories.map((category) => (
        <section key={category.id} id={category.id} className="scroll-mt-24">
          <h3 className="my-3 text-xl text-[var(--foreground)] print:my-0">{category.label}</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-base marker:text-[var(--foreground)]">
            {category.moves.map((move) => (
              <li key={move.id}>
                <a
                  href={`${currentPathname}?video=${move.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onOpenVideo(move.id);
                  }}
                  className={`font-medium ${linkClassName}`}
                >
                  {move.name}
                </a>
                {" - "}
                <span style={{ color: "var(--text-muted)" }}>{move.summary}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </section>
  );
}
