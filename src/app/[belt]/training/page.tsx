import { notFound } from "next/navigation";
import BlueToPurpleGuide from "@/components/training/BlueToPurpleGuide";
import GenericTrainingGuide from "@/components/training/GenericTrainingGuide";
import WhiteToBlueGuide from "@/components/training/WhiteToBlueGuide";
import { beltTracks, isBeltSlug } from "@/lib/belt-data";
import { primaryThemeByTrack } from "@/lib/track-ui";

interface BeltTrainingPageProps {
  params: Promise<{ belt: string }>;
}

export default async function BeltTrainingPage({
  params,
}: BeltTrainingPageProps) {
  const resolvedParams = await params;
  if (!isBeltSlug(resolvedParams.belt)) {
    notFound();
  }

  const track = beltTracks[resolvedParams.belt];
  const primaryTheme = primaryThemeByTrack[track.slug];
  const title = toPreparationTitle(track.label);

  if (track.slug === "white-to-blue") {
    return <WhiteToBlueGuide title={title} primaryTheme={primaryTheme} />;
  }

  if (track.slug === "blue-to-purple") {
    return <BlueToPurpleGuide title={title} primaryTheme={primaryTheme} />;
  }

  return (
    <GenericTrainingGuide
      track={track}
      title={title}
      primaryTheme={primaryTheme}
    />
  );
}

function toPreparationTitle(label: string): string {
  const [from, to] = label.split(" to ").map((part) => part.trim());
  if (!from || !to) {
    return `${label} Test Preparation`;
  }
  return `${to} Belt Test Preparation`;
}
