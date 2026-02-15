import Link from "next/link";
import { notFound } from "next/navigation";
import { beltTracks, isBeltSlug } from "@/lib/belt-data";

interface BeltTrainingPageProps {
  params: Promise<{ belt: string }>;
}

export default async function BeltTrainingPage({ params }: BeltTrainingPageProps) {
  const resolvedParams = await params;
  if (!isBeltSlug(resolvedParams.belt)) {
    notFound();
  }

  const track = beltTracks[resolvedParams.belt];

  return (
    <main className={`min-h-screen bg-gradient-to-br ${track.theme.pageBg} p-4 text-zinc-100 md:p-8`}>
      <div className="mx-auto max-w-4xl space-y-6">
        <header
          className={`rounded-2xl border p-6 shadow-[0_0_60px_rgba(14,165,233,0.12)] backdrop-blur ${track.theme.cardBg} ${track.theme.border}`}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Preparation</p>
          <h1 className={`mt-1 text-3xl font-bold ${track.theme.text}`}>
            {track.label} Training Recommendations
          </h1>
          <p className="mt-2 text-sm text-zinc-300">
            Use this page to structure weekly sessions and prepare for evaluation.
          </p>
          <Link
            href={`/${track.slug}`}
            className="mt-4 inline-flex h-10 items-center justify-center rounded-md border border-zinc-600 bg-zinc-900 px-4 text-sm font-semibold text-zinc-100 hover:bg-zinc-800"
          >
            Back to Move List
          </Link>
        </header>

        <section className={`rounded-2xl border p-4 backdrop-blur md:p-6 ${track.theme.cardBg} ${track.theme.border}`}>
          <ul className="space-y-4">
            {track.trainingRecommendations.map((recommendation) => (
              <li key={recommendation.title} className="rounded-xl border border-zinc-700 bg-zinc-900/80 p-5">
                <h2 className={`text-xl font-semibold ${track.theme.text}`}>{recommendation.title}</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-300">
                  {recommendation.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
