import { engines } from "./catalog/engines";
import { ventures } from "./catalog/ventures";
import { models } from "./catalog/models";
import { builds } from "./catalog/builds";
import { research } from "./catalog/research";

export const cardGroups = [engines, ventures, models, builds, research];
export const catalog = cardGroups.flatMap(group => group.cards);
export const publishedCards = catalog.filter(card => card.visibility === "public");
export const intakeUrl = "https://nwbl.kapuai.chatgpt.site/start/";
