import { CommandInfo, ParamType } from "../types";

const gamerule: CommandInfo = {
  command: "gamerule",
  documentation: "Sets or queries a game rule value.",
  overloads: [
    {
      params: [
        {
          value: [
            "commandblockoutput",
            "dodaylightcycle",
            "doentitydrops",
            "dofiretick",
            "recipesunlock",
            "dolimitedcrafting",
            "domobloot",
            "domobspawning",
            "dotiledrops",
            "doweathercycle",
            "drowningdamage",
            "falldamage",
            "firedamage",
            "keepinventory",
            "mobgriefing",
            "pvp",
            "showcoordinates",
            "showdaysplayed",
            "naturalregeneration",
            "tntexplodes",
            "sendcommandfeedback",
            "doinsomnia",
            "commandblocksenabled",
            "doimmediaterespawn",
            "showdeathmessages",
            "showtags",
            "freezedamage",
            "respawnblocksexplode",
            "showbordereffect",
            "showrecipemessages",
            "projectilescanbreakblocks",
            "tntexplosiondropdecay",
          ],
          signatureValue: "<rule>",
          type: ParamType.enum,
        },
        {
          value: ["true", "false"],
          signatureValue: "<value>",
          type: ParamType.keyword,
        },
      ],
    },
    {
      params: [
        {
          value: [
            "maxcommandchainlength",
            "randomtickspeed",
            "functioncommandlimit",
            "spawnradius",
            "playerssleepingpercentage",
          ],
          signatureValue: "<rule>",
          type: ParamType.enum,
        },
        {
          // todo: dynamic value
          value: "<value>",
          type: ParamType.number,
        },
      ],
    },
  ],
};
export default gamerule;
