import { catalog, intakeUrl } from "../data/ecosystemCards";
import { lessons } from "../data/lessons";

export type Topic = { id: string; title: string; answer: string; href: string; keywords: string };
const topics: Topic[] = [
  { id: "founder", title: "Who founded NWBL?", href: "/#what-nwbl-does-heading", keywords: "founded founder chey smart created who built mission",
    answer: "Chey Smart founded New World Business Lab to help people turn their skills and ideas into businesses. The Lab serves first-time founders, underserved entrepreneurs, and existing small businesses." },
  { id: "start", title: "Start founder intake", href: intakeUrl, keywords: "start starting started begin join apply idea founder onboarding intake sign up first steps",
    answer: "Start with the founder intake. Bring the skill or problem you want to build around, who you want to serve, and what you’ve tried. Knowledge Forge helps turn those answers into an offer you can test." },
  { id: "funding", title: "How founder funding works", href: intakeUrl, keywords: "cost price pay money capital credit funding investors fee free upfront",
    answer: "Qualified founders can begin with no money up front. NWBL’s fee goes into the investor ask. Intake starts the conversation, and any funding decision depends on the individual project." },
  { id: "proof", title: "Meet the proof-of-concept ventures", href: "/#proof-ventures-heading", keywords: "proof ventures businesses ecosystem difference examples",
    answer: "Front Street tests the Lab’s model with storefront owners. Soul Forge Studio tests it with creative clients. Each is an independent proof-of-concept business with its own intake and work." },
  { id: "field-learning", title: "How lessons return to the Lab", href: "/#field-learning", keywords: "learn lessons reuse recycle feedback playbook practical evidence verified",
    answer: "A venture can propose a practice for another business to test. The Lab records where it came from, who could reuse it, and what evidence would justify calling it verified." },
  ...catalog.filter(card => card.visibility !== "internal").map(card => ({
    id: card.id, title: card.name, answer: card.description + " Status: " + card.status + ".",
    href: card.visibility === "public" && card.route ? card.route : "/#" + card.id,
    keywords: [card.category, ...(card.highlights ?? [])].join(" "),
  })),
  ...lessons.map(lesson => ({
    id: lesson.id, title: lesson.title, answer: lesson.method + " " + (lesson.status === "proposed" ? "Proposed test: " + lesson.check : lesson.result),
    href: "/#field-learning", keywords: "lesson " + lesson.title,
  })),
];

const common = new Set("a an and are as at be by can do does for from give how i in into is it me my of on or our please some tell the their them there this to us we what where which who why will with you your nwbl lab new world business".split(" "));
function words(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().split(/\s+/).filter(word => word.length > 1 && !common.has(word));
}
export function findTopics(question: string, previous?: string): Topic[] {
  const terms = [...new Set(words(question))];
  const query = terms.join(" ");
  const scored = topics.map(topic => {
    const name = words(topic.title);
    const keys = new Set(words(topic.keywords));
    const match = terms.reduce((score, word) => score + (name.includes(word) ? 5 : keys.has(word) ? 2 : 0), 0);
    const phrase = name.length && query.includes(name.join(" ")) ? 12 : 0;
    return { topic, score: match + phrase };
  }).filter(item => item.score > 0).sort((a, b) => b.score - a.score);
  if (scored.length) return scored.slice(0, 3).map(item => item.topic);
  if (previous && /\b(that|this|more|it|next)\b/i.test(question)) return topics.filter(t => t.id === previous);
  return [];
}

export const tourStops = [
  { title: "Founder intake", href: intakeUrl },
  { title: "Meet the ventures", href: "/#proof-ventures-heading" },
  { title: "Follow a lesson", href: "/#field-learning" },
  { title: "Try the Quantum Bridge", href: "/research/quantum-bridge" },
];

export function directoryReply(matches: Topic[]) {
  return {
    mode: "directory" as const,
    answer: matches[0]?.answer ?? "I don’t have a published Lab answer for that yet. Pick a tour stop, or ask about a venture, founder funding, or the Quantum Bridge.",
    links: matches.map(({ id, title, href }) => ({ id, title, href })),
  };
}
