import { pattern } from "../../constants";
import { JsonHandler } from "../../core/json_handler";
import { featureStore } from "../../store/behavior/feature";
import { featureRuleStore } from "../../store/behavior/feature_rule";

export const featureRuleHandler = new JsonHandler(pattern.featureRule, [
  {
    path: ["minecraft:feature_rules/description/places_feature"],
    matchType: "value",
    provideCompletion: () => featureStore.get("identifier"),
    provideDefinition: () => featureStore.get("identifier"),
    provideRename: () => featureStore.get("identifier").concat(featureRuleStore.get("feature_identifier")),
  },
]);
