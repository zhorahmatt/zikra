import { notFound } from "next/navigation";
import { getItemsBySlug, CATEGORIES } from "@/lib/dzikr";
import ReadingScreen from "@/components/ReadingScreen";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ type: string }>;
};

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ type: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params;
  const cat = CATEGORIES.find((c) => c.slug === type);
  if (!cat) return {};
  return {
    title: `${cat.name} — Dzkrr`,
    description: `Baca ${cat.name} dengan fokus dan tenang.`,
  };
}

export default async function DzikrPage({ params }: PageProps) {
  const { type } = await params;
  const items = getItemsBySlug(type);
  if (!items) notFound();
  return <ReadingScreen type={type} items={items} />;
}
