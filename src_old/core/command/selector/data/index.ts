import { dx } from "./dx";
import { dy } from "./dy";
import { dz } from "./dz";
import { family } from "./family";
import { has_item } from "./has_item";
import { has_property } from "./has_property";
import { l } from "./l";
import { lm } from "./lm";
import { m } from "./m";
import { name } from "./name";
import { r } from "./r";
import { rm } from "./rm";
import { rx } from "./rx";
import { rxm } from "./rxm";
import { ry } from "./ry";
import { rym } from "./rym";
import { scores } from "./scores";
import { tag } from "./tag";
import { type } from "./type";
import { x } from "./x";
import { y } from "./y";
import { z } from "./z";

export const selectorData = [
  x,
  y,
  z,
  dx,
  dy,
  dz,
  family,
  has_property,
  has_item,
  l,
  lm,
  m,
  name,
  r,
  rm,
  rx,
  rxm,
  ry,
  rym,
  scores,
  tag,
  type,
] as const;
