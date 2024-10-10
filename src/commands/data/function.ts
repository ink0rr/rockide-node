import { CommandInfo, ParamType } from "../types";

const functionCommand: CommandInfo = {
  command: "function",
  documentation: "Runs commands found in the corresponding function file.",
  overloads: [
    {
      params: [
        {
          // todo: provide defnied function paths
          value: "<name>",
          type: ParamType.string,
        },
      ],
    },
  ],
};
export default functionCommand;
