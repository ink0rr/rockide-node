import { CommandInfo, ParamType } from "../types";

const project: CommandInfo = {
  command: "project",
  documentation: "Manipulate the currently loaded project",
  overloads: [
    {
      params: [
        {
          value: ["export"],
          signatureValue: "<subcommand>",
          type: ParamType.keyword,
        },
        {
          value: ["project", "template", "world"],
          signatureValue: "<exportType>",
          type: ParamType.keyword,
        },
      ],
    },
  ],
};
export default project;
