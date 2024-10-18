import { CommandInfo, ParamType } from "../types";

const reload: CommandInfo = {
  command: "reload",
  documentation: "Reloads all function and script files from all behavior packs.",
  overloads: [
    {
      params: [
        {
          value: ["all"],
          signatureValue: "[all]",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default reload;
