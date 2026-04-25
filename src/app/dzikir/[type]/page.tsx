import { notFound } from "next/navigation";
import { getDzikrByType } from "@/lib/dzikr";
import ReadingScreen from "@/components/ReadingScreen";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ type: string }>;
};

export async function generateStaticParams() {
  return [{ type: "morning" }, { type: "evening" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params;
  const title =
    type === "morning" ? "Dzikir Pagi" : type === "evening" ? "Dzikir Petang" : "";
  return {
    title: `${title} — Zikra`,
    description: `Baca ${title} dengan fokus dan tenang.`,
  };
}

export default async function DzikrPage({ params }: PageProps) {
  const { type } = await params;

  if (type !== "morning" && type !== "evening") {
    notFound();
  }

  const items = getDzikrByType(type);

  return <ReadingScreen type={type} items={items} />;
}
