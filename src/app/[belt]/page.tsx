import { notFound } from "next/navigation";
import BeltMovesPage from "@/components/BeltMovesPage";
import { beltSlugs, beltTracks, isBeltSlug } from "@/lib/belt-data";

interface BeltPageProps {
  params: Promise<{ belt: string }>;
}

export function generateStaticParams() {
  return beltSlugs.map((belt) => ({ belt }));
}

export default async function BeltPage({ params }: BeltPageProps) {
  const resolvedParams = await params;
  if (!isBeltSlug(resolvedParams.belt)) {
    notFound();
  }

  const track = beltTracks[resolvedParams.belt];

  return <BeltMovesPage track={track} />;
}

