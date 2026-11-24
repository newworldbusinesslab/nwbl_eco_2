import { notFound } from "next/navigation";
import { publishedCards } from "@/data/ecosystemCards";
import { CatalogPage } from "@/components/shared/CatalogPage";

export const dynamicParams = false;
export function generateStaticParams() {
  return publishedCards.filter(card => card.route).map(card => ({ entry: card.route!.slice(1).split("/") }));
}
type Props = { params: Promise<{ entry: string[] }> };
async function resolveCard(params: Props["params"]) {
  const path = "/" + (await params).entry.join("/");
  return publishedCards.find(card => card.route === path) ?? notFound();
}
export async function generateMetadata({ params }: Props) {
  const card = await resolveCard(params);
  return { title: card.name + " | New World Business Lab", description: card.description };
}
export default async function Page({ params }: Props) { return <CatalogPage card={await resolveCard(params)} />; }
