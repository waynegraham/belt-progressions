import { beltSlugs } from "@/lib/belt-data";

interface BeltSegmentLayoutProps {
  children: React.ReactNode;
}

export function generateStaticParams() {
  return beltSlugs.map((belt) => ({ belt }));
}

export default function BeltSegmentLayout({
  children,
}: BeltSegmentLayoutProps) {
  return children;
}
