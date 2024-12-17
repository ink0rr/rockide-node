import { pattern } from "../../constants";
import { JsonStore } from "../../core/json_store";

export const featureRuleStore = new JsonStore(pattern.featureRule, [
  {
    id: "identifier",
    path: ["minecraft:feature_rules/description/identifier"],
  },
  {
    id: "feature_identifier",
    path: ["minecraft:feature_rules/description/places_feature"],
  },
]);
