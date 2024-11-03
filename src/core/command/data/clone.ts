import { blockIdentifier } from "../../../literals/block_identifier";
import { Parameter } from "../parameter";
import { CommandInfo, ParamType } from "../types";

const clone: CommandInfo = {
  command: "clone",
  documentation: "Clones blocks from one region to another.",
  overloads: [
    {
      params: [
        ...Parameter.createPosition("begin"),
        ...Parameter.createPosition("end"),
        ...Parameter.createPosition("destination"),
        {
          value: ["replace", "masked"],
          type: ParamType.keyword,
        },
        {
          value: ["normal", "force", "move"],
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        ...Parameter.createPosition("begin"),
        ...Parameter.createPosition("end"),
        ...Parameter.createPosition("destination"),
        {
          value: ["filtered"],
          type: ParamType.keyword,
        },
        {
          value: ["normal", "force", "move"],
          type: ParamType.keyword,
        },
        {
          // todo: defined blocks
          value: blockIdentifier,
          type: ParamType.keyword,
        },
        {
          // todo: handle this
          value: "blockState",
          type: ParamType.RockideBlockState,
        },
      ],
    },
  ],
};
export default clone;
