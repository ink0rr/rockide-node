import { Parameter } from "../parameter";
import { CommandInfo } from "../types";

const setworldspawn: CommandInfo = {
  command: "setworldspawn",
  documentation: "Sets the world spawn.",
  overloads: [
    {
      params: [...Parameter.createPosition("position")],
    },
  ],
};
export default setworldspawn;
