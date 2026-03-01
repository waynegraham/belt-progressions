import { notFound } from "next/navigation";
import { Suspense } from "react";
import BeltMovesPage from "@/components/BeltMovesPage";
import { beltTracks, isBeltSlug } from "@/lib/belt-data";

interface BeltPageProps {
  params: Promise<{ belt: string }>;
}

export default async function BeltPage({ params }: BeltPageProps) {
  const resolvedParams = await params;
  if (!isBeltSlug(resolvedParams.belt)) {
    notFound();
  }

  const track = beltTracks[resolvedParams.belt];

  return (
    <Suspense fallback={null}>
      <BeltMovesPage track={track} />
    </Suspense>
  );
}
