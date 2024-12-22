import { biomeTags } from "../literals/biome_tag";
import { equipmentSlots } from "../literals/equipment_slot";
import { blockStore } from "../store/behavior/block";
import { entityStore } from "../store/behavior/entity";
import { itemStore } from "../store/behavior/item";
import { Reference } from "./reference";

export type MolangData = {
  name: string;
  signature: string;
  description: string;
  deprecated?: boolean;
};

export const molangPrefixes = ["context", "math", "query", "temp", "variable"];

export const molangTypes: Record<string, string[] | (() => Reference[])> = {
  BiomeTag: biomeTags,
  EquipmentSlot: equipmentSlots,
  BlockTag: () => blockStore.get("tag"),
  BlockAndItemTag: () => blockStore.get("tag").concat(itemStore.get("tag")),
  EntityIdentifier: () => entityStore.get("identifier"),
  EntityProperty: () => entityStore.get("property"),
  TypeFamily: () => entityStore.get("family"),
  ItemIdentifier: () => itemStore.get("identifier"),
  ItemTag: () => itemStore.get("tag"),
};

const molangQueries: MolangData[] = [
  {
    name: "above_top_solid",
    signature: "(x: number, z: number): number",
    description:
      "Returns the height of the block immediately above the highest solid block at the input (x,z) position",
  },
  {
    name: "actor_count",
    signature: ": number",
    description: "Returns the number of actors rendered in the last frame.",
  },
  {
    name: "all",
    signature: "(arg0: boolean, arg1: boolean, ...argv: boolean[]): boolean",
    description:
      "Requires at least 3 arguments. Evaluates the first argument, then returns 1.0 if all of the following arguments evaluate to the same value as the first. Otherwise it returns 0.0.",
  },
  {
    name: "all_animations_finished",
    signature: ": boolean",
    description:
      "Only valid in an animation controller. Returns 1.0 if all animations in the current animation controller state have played through at least once, else it returns 0.0.",
  },
  {
    name: "all_tags",
    signature: "(...tags: BlockAndItemTag[]): boolean",
    description: "Returns if the item or block has all of the tags specified.",
  },
  {
    name: "anger_level",
    signature: ": boolean",
    description:
      "Returns the anger level of the actor (0,n). On errors or if the actor has no anger level, returns 0. Available on the Server only.",
  },
  {
    name: "anim_time",
    signature: ": number",
    description:
      "Returns the time in seconds since the current animation started, else 0.0 if not called within an animation.",
  },
  {
    name: "any",
    signature: "(arg0: boolean, arg1: boolean, ...argv: boolean[]): boolean",
    description:
      "Requires at least 3 arguments. Evaluates the first argument, then returns 1.0 if any of the following arguments evaluate to the same value as the first. Otherwise it returns 0.0.",
  },
  {
    name: "any_animation_finished",
    signature: ": boolean",
    description:
      "Only valid in an animation controller. Returns 1.0 if any animation in the current animation controller state has played through at least once, else it returns 0.0.",
  },
  {
    name: "any_tag",
    signature: "(...tags: BlockAndItemTag[]): boolean",
    description: "Returns if the item or block has any of the tags specified.",
  },
  {
    name: "approx_eq",
    signature: "(...argv: number[]): boolean",
    description: "Returns 1.0 if all of the arguments are within 0.000000 of each other, else 0.0.",
  },
  {
    name: "armor_color_slot",
    signature: "(slotIndex: number): unknown",
    description:
      "Takes the armor slot index as a parameter, and returns the color of the armor in the requested slot. The valid values for the armor slot index are 0 (head), 1 (chest), 2 (legs), 3 (feet) and 4 (body).",
  },
  {
    name: "armor_damage_slot",
    signature: "(slotIndex: number): number",
    description:
      "Takes the armor slot index as a parameter, and returns the damage value of the requested slot. The valid values for the armor slot index are 0 (head), 1 (chest), 2 (legs), 3 (feet) and 4 (body). Support for entities other than players may be limited, as the damage value is not always available on clients.",
  },
  {
    name: "armor_material_slot",
    signature: "(slotIndex: number): unknown",
    description:
      "Takes the armor slot index as a parameter, and returns the armor material type in the requested armor slot. The valid values for the armor slot index are 0 (head), 1 (chest), 2 (legs) and 3 (feet).",
  },
  {
    name: "armor_texture_slot",
    signature: "(slotIndex: number): unknown",
    description:
      "Takes the armor slot index as a parameter, and returns the texture type of the requested slot. The valid values for the armor slot index are 0 (head), 1 (chest), 2 (legs), 3 (feet) and 4 (body).",
  },
  {
    name: "average_frame_time",
    signature: "(n?: number): number",
    description:
      "Returns the time in *seconds* of the average frame time over the last 'n' frames. If an argument is passed, it is assumed to be the number of frames in the past that you wish to query. 'query.average_frame_time' (or the equivalent 'query.average_frame_time(0)') will return the frame time of the frame before the current one. 'query.average_frame_time(1)' will return the average frame time of the previous two frames. Currently we store the history of the last 30 frames, although note that this may change in the future. Asking for more frames will result in only sampling the number of frames stored.",
  },
  {
    name: "block_face",
    signature: ": number",
    description:
      "Returns the block face for this (only valid for certain triggers such as placing blocks, or interacting with block) (Down=0.0, Up=1.0, North=2.0, South=3.0, West=4.0, East=5.0, Undefined=6.0).",
  },
  {
    name: "block_has_all_tags",
    signature: "(origin: vector3, ...tags: BlockTag[]): boolean",
    description:
      "Takes a world-origin-relative position and one or more tag names, and returns either 0 or 1 based on if the block at that position has all of the tags provided.",
  },
  {
    name: "block_has_any_tag",
    signature: "(origin: vector3, ...tags: BlockTag[]): boolean",
    description:
      "Takes a world-origin-relative position and one or more tag names, and returns either 0 or 1 based on if the block at that position has any of the tags provided.",
  },
  {
    name: "block_neighbor_has_all_tags",
    signature: "(origin: vector3, ...tags: BlockTag[]): boolean",
    description:
      "Takes a block-relative position and one or more tag names, and returns either 0 or 1 based on if the block at that position has all of the tags provided.",
  },
  {
    name: "block_neighbor_has_any_tag",
    signature: "(origin: vector3, ...tags: BlockTag[]): boolean",
    description:
      "Takes a block-relative position and one or more tag names, and returns either 0 or 1 based on if the block at that position has any of the tags provided.",
  },
  {
    name: "block_property",
    signature: "(identifier: string): string | number | boolean",
    description:
      "(No longer available in pack min_engine_version 1.20.40.) Returns the value of the associated block's Block State.",
    deprecated: true,
  },
  {
    name: "block_state",
    signature: ": string | number | boolean",
    description: "Returns the value of the associated block's Block State.",
  },
  {
    name: "blocking",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is blocking, else it returns 0.0.",
  },
  {
    name: "body_x_rotation",
    signature: ": number",
    description: "Returns the body pitch rotation if called on an actor, else it returns 0.0.",
  },
  {
    name: "body_y_rotation",
    signature: ": number",
    description: "Returns the body yaw rotation if called on an actor, else it returns 0.0.",
  },
  {
    name: "bone_aabb",
    signature: "(bone: string): { min: vector3, max: vector3 }",
    description:
      "Returns the axis aligned bounding box of a bone as a struct with members '.min', '.max', along with '.x', '.y', and '.z' values for each.",
  },
  {
    name: "bone_orientation_matrix",
    signature: "(bone: string): unknown",
    description:
      "Takes the name of the bone as an argument. Returns the bone orientation (as a matrix) of the desired bone provided it exists in the queryable geometry of the mob, else this returns the identity matrix and throws a content error.",
  },
  {
    name: "bone_orientation_trs",
    signature: "(bone: string): { t: vector3, r: vector3, s: vector3}",
    description:
      "TRS stands for Translate/Rotate/Scale. Takes the name of the bone as an argument. Returns the bone orientation matrix decomposed into the component translation/rotation/scale parts of the desired bone provided it exists in the queryable geometry of the mob, else this returns the identity matrix and throws a content error. The returned value is returned as a variable of type 'struct' with members '.t', '.r', and '.s', each with members '.x', '.y', and '.z', and can be accessed as per the following example: v.my_variable = q.bone_orientation_trs('rightarm'); return v.my_variable.r.x;",
  },
  {
    name: "bone_origin",
    signature: ": vector3",
    description: "Returns the initial (from the .geo) pivot of a bone as a struct with members '.x', '.y', and '.z'.",
  },
  {
    name: "bone_rotation",
    signature: ": vector3",
    description:
      "Returns the initial (from the .geo) rotation of a bone as a struct with members '.x', '.y', and '.z' in degrees.",
  },
  {
    name: "camera_distance_range_lerp",
    signature: "(a: number, b: number): number",
    description:
      "Takes two distances (any order) and return a number from 0 to 1 based on the camera distance between the two ranges clamped to that range. For example, 'query.camera_distance_range_lerp(10, 20)' will return 0 for any distance less than or equal to 10, 0.2 for a distance of 12, 0.5 for 15, and 1 for 20 or greater. If you pass in (20, 10), a distance of 20 will return 0.0.",
  },
  {
    name: "camera_rotation",
    signature: "(axis: number): number",
    description:
      "Returns the rotation of the camera. Requires one argument representing the rotation axis you would like (0 for x, 1 for y).",
  },
  {
    name: "can_climb",
    signature: ": boolean",
    description: "Returns 1.0 if the entity can climb, else it returns 0.0.",
  },
  {
    name: "can_damage_nearby_mobs",
    signature: ": boolean",
    description: "Returns 1.0 if the entity can damage nearby mobs, else it returns 0.0.",
  },
  {
    name: "can_dash",
    signature: ": boolean",
    description: "Returns 1.0 if the entity can dash, else it returns 0.0",
  },
  {
    name: "can_fly",
    signature: ": boolean",
    description: "Returns 1.0 if the entity can fly, else it returns 0.0.",
  },
  {
    name: "can_power_jump",
    signature: ": boolean",
    description: "Returns 1.0 if the entity can power jump, else it returns 0.0.",
  },
  {
    name: "can_swim",
    signature: ": boolean",
    description: "Returns 1.0 if the entity can swim, else it returns 0.0.",
  },
  {
    name: "can_walk",
    signature: ": boolean",
    description: "Returns 1.0 if the entity can walk, else it returns 0.0.",
  },
  {
    name: "cape_flap_amount",
    signature: ": number",
    description: "Returns value between 0.0 and 1.0 with 0.0 meaning cape is fully down and 1.0 is cape is fully up.",
  },
  {
    name: "cardinal_block_face_placed_on",
    signature: ": number",
    description:
      "DEPRECATED (please use query.block_face instead) Returns the block face for this (only valid for on_placed_by_player trigger) (Down=0.0, Up=1.0, North=2.0, South=3.0, West=4.0, East=5.0, Undefined=6.0).",
    deprecated: true,
  },
  {
    name: "cardinal_facing",
    signature: ": number",
    description:
      "Returns the current facing of the player (Down=0.0, Up=1.0, North=2.0, South=3.0, West=4.0, East=5.0, Undefined=6.0).",
  },
  {
    name: "cardinal_facing_2d",
    signature: ": number",
    description:
      "Returns the current facing of the player ignoring up/down part of the direction (North=2.0, South=3.0, West=4.0, East=5.0, Undefined=6.0).",
  },
  {
    name: "cardinal_player_facing",
    signature: ": number",
    description:
      "Returns the current facing of the player (Down=0.0, Up=1.0, North=2.0, South=3.0, West=4.0, East=5.0, Undefined=6.0).",
  },
  {
    name: "combine_entities",
    signature: "(...entities: entity[]): entity",
    description:
      "Combines any valid entity references from all arguments into a single array. Note that order is not preserved, and duplicates and invalid values are removed.",
  },
  {
    name: "cooldown_time",
    signature: "(slotName: EquipmentSlot, slotIndex?: number): number",
    description:
      "Returns the total cooldown time in seconds for the item held or worn by the specified equipment slot name (and if required second numerical slot id), otherwise returns 0. Uses the same name and id that the replaceitem command takes when querying entities.",
  },
  {
    name: "cooldown_time_remaining",
    signature: "(slotName: EquipmentSlot, slotIndex?: number): number",
    description:
      "Returns the cooldown time remaining in seconds for specified cooldown type or the item held or worn by the specified equipment slot name (and if required second numerical slot id), otherwise returns 0. Uses the same name and id that the replaceitem command takes when querying entities. Returns highest cooldown if no parameters are supplied.",
  },
  {
    name: "count",
    signature: "(arr: any[]): number",
    description:
      "Counts the number of things passed to it (arrays are counted as the number of elements they contain; non-arrays count as 1).",
  },
  {
    name: "current_squish_value",
    signature: ": number",
    description: "Returns the squish value for the current entity, or 0.0 if this doesn't make sense.",
  },
  {
    name: "dash_cooldown_progress",
    signature: ": number",
    description:
      "(No longer available in pack min_engine_version 1.20.50.) DEPRECATED. DO NOT USE AFTER 1.20.40. Please see camel.entity.json script.pre_animation for example of how to now process dash cooldown. Returns dash cooldown progress if the entity can dash, else it returns 0.0.",
    deprecated: false,
  },
  {
    name: "day",
    signature: ": number",
    description: "Returns the day of the current level.",
  },
  {
    name: "death_ticks",
    signature: ": number",
    description: "Returns the elapsed ticks since the mob started dying.",
  },
  {
    name: "debug_output",
    signature: ": void",
    description: "debug log a value to the output debug window for builds that have one",
  },
  {
    name: "delta_time",
    signature: ": number",
    description: "Returns the time in seconds since the previous frame.",
  },
  {
    name: "distance_from_camera",
    signature: ": number",
    description: "Returns the distance of the root of this actor or particle emitter from the camera.",
  },
  {
    name: "effect_emitter_count",
    signature: ": number",
    description: "Returns the total number of active emitters of the callee's particle effect type.",
  },
  {
    name: "effect_particle_count",
    signature: ": number",
    description: "Returns the total number of active particles of the callee's particle effect type.",
  },
  {
    name: "equipment_count",
    signature: ": number",
    description:
      "Returns the number of equipped armor pieces for an actor from 0 to 5, not counting items held in hands. (To query for hand slots, use query.is_item_equipped or query.is_item_name_any).",
  },
  {
    name: "equipped_item_all_tags",
    signature: "(slotName: EquipmentSlot, ...tags: ItemTag[]): boolean",
    description:
      "Takes a slot name followed by any tag you want to check for in the form of 'tag_name' and returns 1 if all of the tags are on that equipped item, 0 otherwise.",
  },
  {
    name: "equipped_item_any_tag",
    signature: "(slotName: EquipmentSlot, ...tags: ItemTag[]): boolean",
    description:
      "Takes a slot name followed by any tag you want to check for in the form of 'tag_name' and returns 0 if none of the tags are on that equipped item or 1 if at least 1 tag exists.",
  },
  {
    name: "equipped_item_is_attachable",
    signature: "(slot: number): boolean",
    description:
      "Takes the desired hand slot as a parameter (0 or 'main_hand' for main hand, 1 or 'off_hand' for off hand), and returns whether the item is an attachable or not.",
  },
  {
    name: "eye_target_x_rotation",
    signature: ": number",
    description: "Returns the X eye rotation of the entity if it makes sense, else it returns 0.0.",
  },
  {
    name: "eye_target_y_rotation",
    signature: ": number",
    description: "Returns the Y eye rotation of the entity if it makes sense, else it returns 0.0.",
  },
  {
    name: "facing_target_to_range_attack",
    signature: ": boolean",
    description:
      "Returns 1.0 if the entity is attacking from range (i.e. minecraft:behavior.ranged_attack), else it returns 0.0.",
  },
  {
    name: "frame_alpha",
    signature: ": number",
    description: "Returns the ratio (from 0 to 1) of how much between AI ticks this frame is being rendered.",
  },
  {
    name: "get_actor_info_id",
    signature: ": string",
    description: "Returns the integer id of an actor by its string name.",
  },
  {
    name: "get_animation_frame",
    signature: ": number",
    description: "Returns the current texture of the item",
  },
  {
    name: "get_default_bone_pivot",
    signature: "(bone: string, orientation: number): number",
    description: "Gets specified axis of the specified bone orientation pivot.",
  },
  {
    name: "get_equipped_item_name",
    signature: ": string",
    description:
      "DEPRECATED (Use query.is_item_name_any instead if possible so names can be changed later without breaking content.) Takes one optional hand slot as a parameter (0 or 'main_hand' for main hand, 1 or 'off_hand' for off hand), and a second parameter (0=default) if you would like the equipped item or any non-zero number for the currently rendered item, and returns the name of the item in the requested slot (defaulting to the main hand if no parameter is supplied) if there is one, otherwise returns ''.",
    deprecated: true,
  },
  {
    name: "get_locator_offset",
    signature: ": unknown", // TODO: undocumented
    description: "Gets specified axis of the specified locator offset.",
  },
  {
    name: "get_name",
    signature: ": string",
    description:
      "DEPRECATED (Use query.is_name_any instead if possible so names can be changed later without breaking content.)Get the name of the mob if there is one, otherwise return ''.",
    deprecated: true,
  },
  {
    name: "get_root_locator_offset",
    signature: ": unknown", // TODO: undocumented
    description: "Gets specified axis of the specified locator offset of the root model.",
  },
  {
    name: "ground_speed",
    signature: ": number",
    description: "Returns the ground speed of the entity in meters/second.",
  },
  {
    name: "had_component_group",
    signature: "(componentGroup: string): boolean",
    description:
      "Usable only in behavior packs when determining the default value for an entity's Property. Requires one string argument. If the entity is being loaded from data that was last saved with a component_group with the specified name, returns 1.0, otherwise returns 0.0. The purpose of this query is to allow entity definitions to change and still be able to load the correct state of entities.",
  },
  {
    name: "has_any_family",
    signature: "(...families: TypeFamily[]): boolean",
    description: "Returns 1 if the entity has any of the specified families, else 0.",
  },
  {
    name: "has_armor_slot",
    signature: "(slotIndex: number): boolean",
    description:
      "Takes the armor slot index as a parameter, and returns 1.0 if the entity has armor in the requested slot, else it returns 0.0. The valid values for the armor slot index are 0 (head), 1 (chest), 2 (legs) and 3 (feet).",
  },
  {
    name: "has_biome_tag",
    signature: "(tag: BiomeTag): boolean",
    description: "Returns whether or not a Block Placement Target has a specific biome tag",
  },
  {
    name: "has_block_property",
    signature: "(identifier: string): boolean",
    description:
      "(No longer available in pack min_engine_version 1.20.40.) Returns 1.0 if the associated block has the given block state or 0.0 if not.",
    deprecated: true,
  },
  {
    name: "has_block_state",
    signature: "(name: string): boolean",
    description: "Returns 1.0 if the associated block has the given block state or 0.0 if not.",
  },
  {
    name: "has_cape",
    signature: ": boolean",
    description: "Returns 1.0 if the player has a cape, else it returns 0.0.",
  },
  {
    name: "has_collision",
    signature: ": boolean",
    description: "Returns 1.0 if the entity has collisions enabled, else it returns 0.0.",
  },
  {
    name: "has_dash_cooldown",
    signature: ": boolean",
    description: "Returns 1.0 if the entity has cooldown on its dash, else it returns 0.0",
  },
  {
    name: "has_gravity",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is affected by gravity, else it returns 0.0.",
  },
  {
    name: "has_head_gear",
    signature: ": boolean",
    description:
      "Returns boolean whether an Actor has an item in their head armor slot or not, or false if no actor in current context",
  },
  {
    name: "has_owner",
    signature: ": boolean",
    description: "Returns true if the entity has an owner ID else it returns false",
  },
  {
    name: "has_player_rider",
    signature: ": boolean",
    description: "Returns 1 if the entity has a player riding it in any seat, else it returns 0.",
  },
  {
    name: "has_property",
    signature: "(identifier: EntityProperty): boolean",
    description:
      "Takes one argument: the name of the property on the Actor. Returns 1.0 if a property with the given name exists, 0 otherwise.",
  },
  {
    name: "has_rider",
    signature: ": boolean",
    description: "Returns 1.0 if the entity has a rider, else it returns 0.0",
  },
  {
    name: "has_target",
    signature: ": boolean",
    description: "Returns 1.0 if the entity has a target, else it returns 0.0",
  },
  {
    name: "head_roll_angle",
    signature: ": number",
    description: "Returns the roll angle of the head of the entity if it makes sense, else it returns 0.0.",
  },
  {
    name: "head_x_rotation",
    signature: "(n: number): number",
    description:
      "Takes one argument as a parameter. Returns the nth head x rotation of the entity if it makes sense, else it returns 0.0.",
  },
  {
    name: "head_y_rotation",
    signature: "(n: number, maxRotation?: number): number",
    description:
      "Takes one argument as a parameter. Returns the nth head y rotation of the entity if it makes sense, else it returns 0.0. Horses, zombie horses, skeleton horses, donkeys and mules require a second parameter that clamps rotation in degrees.",
  },
  {
    name: "health",
    signature: ": number",
    description: "Returns the health of the entity, or 0.0 if it doesn't make sense to call on this entity.",
  },
  {
    name: "heartbeat_interval",
    signature: ": number",
    description: "Returns the heartbeat interval of the actor in seconds. Returns 0 when the actor has no heartbeat.",
  },
  {
    name: "heartbeat_phase",
    signature: ": number",
    description:
      "Returns the heartbeat phase of the actor. 0.0 if at start of current heartbeat, 1.0 if at the end. Returns 0 on errors or when the actor has no heartbeat. Available on the Client (Resource Packs) only.",
  },
  {
    name: "heightmap",
    signature: "(x: number, z: number): number", // TODO: undocumented
    description: "Queries Height Map",
  },
  {
    name: "hurt_direction",
    signature: ": number",
    description: "Returns the hurt direction for the actor, otherwise returns 0.",
  },
  {
    name: "hurt_time",
    signature: ": number",
    description: "Returns the hurt time for the actor, otherwise returns 0.",
  },
  {
    name: "in_range",
    signature: "(value: number, min: number, max: number): boolean",
    description:
      "Requires 3 numerical arguments: some value, a minimum, and a maximum. If the first argument is between the minimum and maximum (inclusive), returns 1.0. Otherwise returns 0.0.",
  },
  {
    name: "invulnerable_ticks",
    signature: ": number",
    description:
      "Returns the number of ticks of invulnerability the entity has left if it makes sense, else it returns 0.0.",
  },
  {
    name: "is_admiring",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is admiring, else it returns 0.0.",
  },
  {
    name: "is_alive",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is alive, and 0.0 if it's dead.",
  },
  {
    name: "is_angry",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is angry, else it returns 0.0.",
  },
  {
    name: "is_attached",
    signature: ": boolean",
    description:
      "Returns 1.0 if the entity is attached to another entity (such as being held or worn), else it will return 0.0. Available only with resource packs.",
  },
  {
    name: "is_attached_to_entity",
    signature: ": boolean",
    description: "Returns 1.0 if the actor is attached to an entity, else it will return 0.0.",
  },
  {
    name: "is_avoiding_block",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is fleeing from a block, else it returns 0.0.",
  },
  {
    name: "is_avoiding_mobs",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is fleeing from mobs, else it returns 0.0.",
  },
  {
    name: "is_baby",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is a baby, else it returns 0.0.",
  },
  {
    name: "is_breathing",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is breathing, else it returns 0.0.",
  },
  {
    name: "is_bribed",
    signature: ": boolean",
    description: "Returns 1.0 if the entity has been bribed, else it returns 0.0.",
  },
  {
    name: "is_carrying_block",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is carrying a block, else it returns 0.0.",
  },
  {
    name: "is_casting",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is casting, else it returns 0.0.",
  },
  {
    name: "is_celebrating",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is celebrating, else it returns 0.0.",
  },
  {
    name: "is_celebrating_special",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is doing a special celebration, else it returns 0.0.",
  },
  {
    name: "is_charged",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is charged, else it returns 0.0.",
  },
  {
    name: "is_charging",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is charging, else it returns 0.0.",
  },
  {
    name: "is_chested",
    signature: ": boolean",
    description: "Returns 1.0 if the entity has chests attached to it, else it returns 0.0.",
  },
  {
    name: "is_cooldown_type",
    signature: "(cooldownType: string, slotName: EquipmentSlot, slotIndex?: number): boolean",
    description:
      "Returns 1.0 if the specified held or worn item has the specified cooldown type name, otherwise returns 0.0. First argument is the cooldown name to check for, second argument is the equipment slot name, and if required third argument is the numerical slot id. For second and third arguments, uses the same name and id that the replaceitem command takes when querying entities.",
  },
  {
    name: "is_crawling",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is crawling, else it returns 0.0",
  },
  {
    name: "is_critical",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is critical, else it returns 0.0.",
  },
  {
    name: "is_croaking",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is croaking, else it returns 0.0.",
  },
  {
    name: "is_dancing",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is dancing, else it returns 0.0.",
  },
  {
    name: "is_delayed_attacking",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is attacking using the delayed attack, else it returns 0.0.",
  },
  {
    name: "is_digging",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is digging, else it returns 0.0.",
  },
  {
    name: "is_eating",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is eating, else it returns 0.0.",
  },
  {
    name: "is_eating_mob",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is eating a mob, else it returns 0.0.",
  },
  {
    name: "is_elder",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is an elder version of it, else it returns 0.0.",
  },
  {
    name: "is_emerging",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is emerging, else it returns 0.0.",
  },
  {
    name: "is_emoting",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is emoting, else it returns 0.0.",
  },
  {
    name: "is_enchanted",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is enchanted, else it returns 0.0.",
  },
  {
    name: "is_feeling_happy",
    signature: ": boolean",
    description:
      "(No longer available in pack min_engine_version 1.20.50.) DEPRECATED after 1.20.40. Returns 1.0 if behavior.timer_flag_2 is running, else it returns 0.0.",
    deprecated: true,
  },
  {
    name: "is_fire_immune",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is immune to fire, else it returns 0.0.",
  },
  {
    name: "is_first_person",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is being rendered in first person mode, else it returns 0.0.",
  },
  {
    name: "is_ghost",
    signature: ": boolean",
    description: "Returns 1.0 if an entity is a ghost, else it returns 0.0.",
  },
  {
    name: "is_gliding",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is gliding, else it returns 0.0.",
  },
  {
    name: "is_grazing",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is grazing, or 0.0 if not.",
  },
  {
    name: "is_idling",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is idling, else it returns 0.0.",
  },
  {
    name: "is_ignited",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is ignited, else it returns 0.0.",
  },
  {
    name: "is_illager_captain",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is an illager captain, else it returns 0.0.",
  },
  {
    name: "is_in_contact_with_water",
    signature: ": boolean",
    description:
      "Returns 1.0 if the entity is in contact with any water (water, rain, splash water bottle), else it returns 0.0.",
  },
  {
    name: "is_in_lava",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is in lava, else it returns 0.0.",
  },
  {
    name: "is_in_love",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is in love, else it returns 0.0.",
  },
  {
    name: "is_in_ui",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is rendered as part of the UI, else it returns 0.0.",
  },
  {
    name: "is_in_water",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is in water, else it returns 0.0.",
  },
  {
    name: "is_in_water_or_rain",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is in water or rain, else it returns 0.0.",
  },
  {
    name: "is_interested",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is interested, else it returns 0.0.",
  },
  {
    name: "is_invisible",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is invisible, else it returns 0.0.",
  },
  {
    name: "is_item_equipped",
    signature: "(slot?: number): boolean",
    description:
      "Takes one optional hand slot as a parameter (0 or 'main_hand' for main hand, 1 or 'off_hand' for off hand), and returns 1.0 if there is an item in the requested slot (defaulting to the main hand if no parameter is supplied), otherwise returns 0.0.",
  },
  {
    name: "is_item_name_any",
    signature: "(slotName: EquipmentSlot, slotIndex: number, ...identifiers: ItemIdentifier[]): boolean",
    description:
      "Takes an equipment slot name (see the replaceitem command) and an optional slot index value. (The slot index is required for slot names that have multiple slots, for example 'slot.hotbar'.) After that, takes one or more full name (with 'namespace:') strings to check for. Returns 1.0 if an item in the specified slot has any of the specified names, otherwise returns 0.0. An empty string '' can be specified to check for an empty slot. Note that querying slot.enderchest, slot.saddle, slot.armor, or slot.chest will only work in behavior packs. A preferred query to query.get_equipped_item_name, as it can be adjusted by Mojang to avoid breaking content if names are changed.",
  },
  {
    name: "is_jump_goal_jumping",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is doing a jump goal jump, else it returns 0.0.",
  },
  {
    name: "is_jumping",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is jumping, else it returns 0.0.",
  },
  {
    name: "is_laying_down",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is laying down, else it returns 0.0.",
  },
  {
    name: "is_laying_egg",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is laying an egg, else it returns 0.0.",
  },
  {
    name: "is_leashed",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is leashed to something, else it returns 0.0.",
  },
  {
    name: "is_levitating",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is levitating, else it returns 0.0.",
  },
  {
    name: "is_lingering",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is lingering, else it returns 0.0.",
  },
  {
    name: "is_local_player",
    signature: ": boolean",
    description:
      "Takes no arguments. Returns 1.0 if the entity is the local player for the current game window, else it returns 0.0. In splitscreen returns 0.0 for the other local players for other views. Always returns 0.0 if used in a behavior pack.",
  },
  {
    name: "is_moving",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is moving, else it returns 0.0.",
  },
  {
    name: "is_name_any",
    signature: "(...names: string[]): boolean",
    description:
      "Takes one or more arguments. If the entity's name is any of the specified string values, returns 1.0. Otherwise returns 0.0. A preferred query to query.get_name, as it can be adjusted by Mojang to avoid breaking content if names are changed.",
  },
  {
    name: "is_on_fire",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is on fire, else it returns 0.0.",
  },
  {
    name: "is_on_ground",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is on the ground, else it returns 0.0.",
  },
  {
    name: "is_on_screen",
    signature: ": boolean",
    description:
      "Returns 1.0 if this is called on an entity at a time when it is known if it is on screen, else it returns 0.0.",
  },
  {
    name: "is_onfire",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is on fire, else it returns 0.0.",
  },
  {
    name: "is_orphaned",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is orphaned, else it returns 0.0.",
  },
  {
    name: "is_owner_identifier_any",
    signature: "(...identifiers: EntityIdentifier[]): boolean",
    description:
      "Takes one or more arguments. Returns whether the root actor identifier is any of the specified strings. A preferred query to query.owner_identifier, as it can be adjusted by Mojang to avoid breaking content if names are changed.",
  },
  {
    name: "is_persona_or_premium_skin",
    signature: ": boolean",
    description: "Returns 1.0 if the player has a persona or premium skin, else it returns 0.0.",
  },
  {
    name: "is_playing_dead",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is playing dead, else it returns 0.0.",
  },
  {
    name: "is_powered",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is powered, else it returns 0.0.",
  },
  {
    name: "is_pregnant",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is pregnant, else it returns 0.0.",
  },
  {
    name: "is_ram_attacking",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is using a ram attack, else it returns 0.0.",
  },
  {
    name: "is_resting",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is resting, else it returns 0.0.",
  },
  {
    name: "is_riding",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is riding, else it returns 0.0.",
  },
  {
    name: "is_rising",
    signature: ": boolean",
    description:
      "(No longer available in pack min_engine_version 1.20.50.) DEPRECATED after 1.20.40. Returns 1.0 if behavior.timer_flag_2 is running, else it returns 0.0.",
    deprecated: true,
  },
  {
    name: "is_roaring",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is currently roaring, else it returns 0.0.",
  },
  {
    name: "is_rolling",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is rolling, else it returns 0.0.",
  },
  {
    name: "is_saddled",
    signature: ": boolean",
    description: "Returns 1.0 if the entity has a saddle, else it returns 0.0.",
  },
  {
    name: "is_scared",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is scared, else it returns 0.0.",
  },
  {
    name: "is_scenting",
    signature: ": boolean",
    description:
      "(No longer available in pack min_engine_version 1.20.50.) DEPRECATED after 1.20.40. Returns 1.0 if behavior.timer_flag_1 is running, else it returns 0.0.",
    deprecated: true,
  },
  {
    name: "is_searching",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is searching, else it returns 0.0.",
  },
  {
    name: "is_selected_item",
    signature: ": boolean",
    description: "Returns true if the player has selected an item in the inventory, else it returns 0.0.",
  },
  {
    name: "is_shaking",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is casting, else it returns 0.0.",
  },
  {
    name: "is_shaking_wetness",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is shaking water off, else it returns 0.0.",
  },
  {
    name: "is_sheared",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is able to be sheared and is sheared, else it returns 0.0.",
  },
  {
    name: "is_shield_powered",
    signature: ": boolean",
    description: "Returns 1.0f if the entity has an active powered shield if it makes sense, else it returns 0.0.",
  },
  {
    name: "is_silent",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is silent, else it returns 0.0.",
  },
  {
    name: "is_sitting",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is sitting, else it returns 0.0.",
  },
  {
    name: "is_sleeping",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is sleeping, else it returns 0.0.",
  },
  {
    name: "is_sneaking",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is sneaking, else it returns 0.0.",
  },
  {
    name: "is_sneezing",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is sneezing, else it returns 0.0.",
  },
  {
    name: "is_sniffing",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is sniffing, else it returns 0.0.",
  },
  {
    name: "is_sonic_boom",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is using sonic boom, else it returns 0.0.",
  },
  {
    name: "is_spectator",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is spectator, else it returns 0.0.",
  },
  {
    name: "is_sprinting",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is sprinting, else it returns 0.0.",
  },
  {
    name: "is_stackable",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is stackable, else it returns 0.0.",
  },
  {
    name: "is_stalking",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is stalking, else it returns 0.0.",
  },
  {
    name: "is_standing",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is standing, else it returns 0.0.",
  },
  {
    name: "is_stunned",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is currently stunned, else it returns 0.0.",
  },
  {
    name: "is_swimming",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is swimming, else it returns 0.0.",
  },
  {
    name: "is_tamed",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is tamed, else it returns 0.0.",
  },
  {
    name: "is_transforming",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is transforming, else it returns 0.0.",
  },
  {
    name: "is_using_item",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is using an item, else it returns 0.0.",
  },
  {
    name: "is_wall_climbing",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is climbing a wall, else it returns 0.0.",
  },
  {
    name: "item_in_use_duration",
    signature: ": number",
    description:
      "Returns the amount of time an item has been in use in seconds up to the maximum duration, else 0.0 if it doesn't make sense.",
  },
  {
    name: "item_is_charged",
    signature: "(slot?: number): boolean",
    description:
      "Takes one optional hand slot as a parameter (0 or 'main_hand' for main hand, 1 or 'off_hand' for off hand), and returns 1.0 if the item is charged in the requested slot (defaulting to the main hand if no parameter is supplied), otherwise returns 0.0.",
  },
  {
    name: "item_max_use_duration",
    signature: ": number",
    description: "Returns the maximum amount of time the item can be used, else 0.0 if it doesn't make sense.",
  },
  {
    name: "item_remaining_use_duration",
    signature: "(slotName: EquipmentSlot): number",
    description:
      "Returns the amount of time an item has left to use, else 0.0 if it doesn't make sense. Item queried is specified by the slot name 'main_hand' or 'off_hand'. Time remaining is normalized using the normalization value, only if one is given, else it is returned in seconds.",
  },
  {
    name: "item_slot_to_bone_name",
    signature: "(slotName: EquipmentSlot): string",
    description:
      "query.item_slot_to_bone_name requires one parameter: the name of the equipment slot. This function returns the name of the bone this entity has mapped to that slot.",
  },
  {
    name: "key_frame_lerp_time",
    signature: ": number",
    description: "Returns the ratio between the previous and next key frames.",
  },
  {
    name: "last_frame_time",
    signature: "(prevFrame?: number): number",
    description:
      "Returns the time in *seconds* of the last frame. If an argument is passed, it is assumed to be the number of frames in the past that you wish to query. 'query.last_frame_time' (or the equivalent 'query.last_frame_time(0)') will return the frame time of the frame before the current one. 'query.last_frame_time(1)' will return the frame time of two frames ago. Currently we store the history of the last 30 frames, although note that this may change in the future. Passing an index more than the available data will return the oldest frame stored.",
  },
  {
    name: "last_hit_by_player",
    signature: ": boolean",
    description:
      "Returns 1.0 if the entity was last hit by the player, else it returns 0.0. If called by the client always returns 0.0.",
  },
  {
    name: "lie_amount",
    signature: ": number",
    description: "Returns the lie down amount for the entity.",
  },
  {
    name: "life_span",
    signature: ": number",
    description: "Returns the limited life span of an entity, or 0.0 if it lives forever",
  },
  {
    name: "life_time",
    signature: ": number",
    description:
      "Returns the time in seconds since the current animation started, else 0.0 if not called within an animation.",
  },
  {
    name: "lod_index",
    signature: "(...distances: number[]): number",
    description:
      "Takes an array of distances and returns the zero - based index of which range the actor is in based on distance from the camera. For example, 'query.lod_index(10, 20, 30)' will return 0, 1, or 2 based on whether the mob is less than 10, 20, or 30 units away from the camera, or it will return 3 if it is greater than 30.",
  },
  {
    name: "log",
    signature: ": void",
    description: "debug log a value to the content log",
  },
  {
    name: "main_hand_item_max_duration",
    signature: ": number",
    description: "Returns the use time maximum duration for the main hand item if it makes sense, else it returns 0.0.",
  },
  {
    name: "main_hand_item_use_duration",
    signature: ": number",
    description: "Returns the use time for the main hand item.",
  },
  {
    name: "mark_variant",
    signature: ": number",
    description: "Returns the entity's mark variant",
  },
  {
    name: "max_durability",
    signature: ": number",
    description: "Returns the max durability an item can take.",
  },
  {
    name: "max_health",
    signature: ": number",
    description: "Returns the maximum health of the entity, or 0.0 if it doesn't make sense to call on this entity.",
  },
  {
    name: "max_trade_tier",
    signature: ": number",
    description: "Returns the maximum trade tier of the entity if it makes sense, else it returns 0.0",
  },
  {
    name: "maximum_frame_time",
    signature: "(prevFrame?: number): number",
    description:
      "Returns the time in *seconds* of the most expensive frame over the last 'n' frames. If an argument is passed, it is assumed to be the number of frames in the past that you wish to query. 'query.maximum_frame_time' (or the equivalent 'query.maximum_frame_time(0)') will return the frame time of the frame before the current one. 'query.maximum_frame_time(1)' will return the maximum frame time of the previous two frames. Currently we store the history of the last 30 frames, although note that this may change in the future. Asking for more frames will result in only sampling the number of frames stored.",
  },
  {
    name: "minimum_frame_time",
    signature: "(prevFrame?: number): number",
    description:
      "Returns the time in *seconds* of the least expensive frame over the last 'n' frames. If an argument is passed, it is assumed to be the number of frames in the past that you wish to query. 'query.minimum_frame_time' (or the equivalent 'query.minimum_frame_time(0)') will return the frame time of the frame before the current one. 'query.minimum_frame_time(1)' will return the minimum frame time of the previous two frames. Currently we store the history of the last 30 frames, although note that this may change in the future. Asking for more frames will result in only sampling the number of frames stored.",
  },
  {
    name: "model_scale",
    signature: ": number",
    description: "Returns the scale of the current entity.",
  },
  {
    name: "modified_distance_moved",
    signature: ": number",
    description:
      "Returns the total distance the entity has moved horizontally in meters (since the entity was last loaded, not necessarily since it was originally created) modified along the way by status flags such as is_baby or on_fire.",
  },
  {
    name: "modified_move_speed",
    signature: ": number",
    description: "Returns the current walk speed of the entity modified by status flags such as is_baby or on_fire.",
  },
  {
    name: "moon_brightness",
    signature: ": number",
    description:
      "Returns the brightness of the moon (FULL_MOON=1.0, WANING_GIBBOUS=0.75, FIRST_QUARTER=0.5, WANING_CRESCENT=0.25, NEW_MOON=0.0, WAXING_CRESCENT=0.25, LAST_QUARTER=0.5, WAXING_GIBBOUS=0.75).",
  },
  {
    name: "moon_phase",
    signature: ": number",
    description:
      "Returns the phase of the moon (FULL_MOON=0, WANING_GIBBOUS=1, FIRST_QUARTER=2, WANING_CRESCENT=3, NEW_MOON=4, WAXING_CRESCENT=5, LAST_QUARTER=6, WAXING_GIBBOUS=7).",
  },
  {
    name: "movement_direction",
    signature: ": number",
    description: "Returns the specified axis of the normalized position delta of the entity.",
  },
  {
    name: "noise",
    signature: "(...argv: number[]): number",
    description: "Queries Perlin Noise Map",
  },
  {
    name: "on_fire_time",
    signature: ": number",
    description: "Returns the time that the entity is on fire, else it returns 0.0.",
  },
  {
    name: "out_of_control",
    signature: ": boolean",
    description: "Returns 1.0 if the entity is out of control, else it returns 0.0.",
  },
  {
    name: "overlay_alpha",
    signature: ": number",
    description: "DEPRECATED (Do not use - this function is deprecated and will be removed).",
    deprecated: true,
  },
  {
    name: "owner_identifier",
    signature: ": string",
    description:
      "DEPRECATED (Use query.is_owner_identifier_any instead if possible so names can be changed later without breaking content.) Returns the root actor identifier.",
    deprecated: true,
  },
  {
    name: "player_level",
    signature: ": number",
    description: "Returns the players level if the actor is a player, otherwise returns 0.",
  },
  {
    name: "position",
    signature: "(axis: number): number",
    description:
      "Returns the absolute position of an actor. Takes one argument that represents the desired axis (0 == x-axis, 1 == y-axis, 2 == z-axis).",
  },
  {
    name: "position_delta",
    signature: "(axis: number): number",
    description:
      "Returns the position delta for an actor. Takes one argument that represents the desired axis (0 == x-axis, 1 == y-axis, 2 == z-axis).",
  },
  {
    name: "previous_squish_value",
    signature: ": number",
    description: "Returns the previous squish value for the current entity, or 0.0 if this doesn't make sense.",
  },
  {
    name: "property",
    signature: "(identifier: EntityProperty): string | number | boolean",
    description:
      "Takes one argument: the name of the property on the entity. Returns the value of that property if it exists, else 0.0 if not.",
  },
  {
    name: "relative_block_has_all_tags",
    signature: "(position: vector3, ...tags: BlockTag[]): number", // TODO: undocumented
    description:
      "Takes an entity-relative position and one or more tag names, and returns either 0 or 1 based on if the block at that position has all of the tags provided.",
  },
  {
    name: "relative_block_has_any_tag",
    signature: "(position: vector3, ...tags: BlockTag[]): number", // TODO: undocumented
    description:
      "Takes an entity-relative position and one or more tag names, and returns either 0 or 1 based on if the block at that position has any of the tags provided.",
  },
  {
    name: "remaining_durability",
    signature: ": number",
    description: "Returns how much durability an item has remaining.",
  },
  {
    name: "ride_body_x_rotation",
    signature: ": number",
    description: "Returns the body pitch world-rotation of the ride an entity, else it returns 0.0.",
  },
  {
    name: "ride_body_y_rotation",
    signature: ": number",
    description: "Returns the body yaw world-rotation of the ride of on an entity, else it returns 0.0.",
  },
  {
    name: "ride_head_x_rotation",
    signature: ": number",
    description: "Returns the head x world-rotation of the ride of an entity, else it returns 0.0.",
  },
  {
    name: "ride_head_y_rotation",
    signature: "(maxRotation?: number): number",
    description:
      "Takes one optional argument as a parameter. Returns the head y world-rotation of the ride of an entity, else it returns 0.0. First parameter only for horses, zombie horses, skeleton horses, donkeys and mules that clamps rotation in degrees.",
  },
  {
    name: "rider_body_x_rotation",
    signature: "(index: number): number",
    description:
      "Returns the body pitch world-rotation of a valid rider at the provided index if called on an entity, else it returns 0.0.",
  },
  {
    name: "rider_body_y_rotation",
    signature: "(index: number): number",
    description:
      "Returns the body yaw world-rotation of a valid rider at the provided index if called on an entity, else it returns 0.0.",
  },
  {
    name: "rider_head_x_rotation",
    signature: "(index: number): number",
    description:
      "Takes one argument as a parameter. Returns the head x world-rotation of the rider entity at the provided index, else it returns 0.0.",
  },
  {
    name: "rider_head_y_rotation",
    signature: "(index: number, maxRotation?: number): number",
    description:
      "Takes one or two arguments as parameters. Returns the head y world-rotation of the rider entity at the provided index, else it returns 0.0. Horses, zombie horses, skeleton horses, donkeys and mules require a second parameter that clamps rotation in degrees.",
  },
  {
    name: "roll_counter",
    signature: ": number",
    description: "Returns the roll counter of the entity.",
  },
  {
    name: "rotation_to_camera",
    signature: "(axis: number): number",
    description:
      "Returns the rotation required to aim at the camera. Requires one argument representing the rotation axis you would like (0 for x, 1 for y).",
  },
  {
    name: "scoreboard",
    signature: "(objective: string): number",
    description:
      "Takes one argument - the name of the scoreboard entry for this entity. Returns the specified scoreboard value for this entity. Available only with behavior packs.",
  },
  {
    name: "shake_angle",
    signature: ": number",
    description: "Returns the shaking angle of the entity if it makes sense, else it returns 0.0.",
  },
  {
    name: "shake_time",
    signature: ": number",
    description: "Returns the shake time of the entity.",
  },
  {
    name: "shield_blocking_bob",
    signature: ": number",
    description: "Returns the how much the offhand shield should translate down when blocking and being hit.",
  },
  {
    name: "show_bottom",
    signature: ": boolean",
    description: "Returns 1.0 if we render the entity's bottom, else it returns 0.0.",
  },
  {
    name: "sit_amount",
    signature: ": number",
    description: "Returns the current sit amount of the entity.",
  },
  {
    name: "skin_id",
    signature: ": number",
    description: "Returns the entity's skin ID",
  },
  {
    name: "sleep_rotation",
    signature: ": number",
    description: "Returns the rotation of the bed the player is sleeping on.",
  },
  {
    name: "sneeze_counter",
    signature: ": number",
    description: "Returns the sneeze counter of the entity.",
  },
  {
    name: "spellcolor",
    signature: ": rgba",
    description:
      "Returns a struct representing the entity spell color for the specified entity. The struct contains '.r' '.g' '.b' and '.a' members, each 0.0 to 1.0. If no actor is specified, each member value will be 0.0.",
  },
  {
    name: "standing_scale",
    signature: ": number",
    description: "Returns the scale of how standing up the entity is.",
  },
  {
    name: "state_time",
    signature: ": number",
    description:
      "Only valid in an animation controller. Returns the time in seconds in the current animation controller state.",
  },
  {
    name: "structural_integrity",
    signature: ": number",
    description: "Returns the structural integrity for the actor, otherwise returns 0.",
  },
  {
    name: "surface_particle_color",
    signature: ": rgba",
    description:
      "Returns the particle color for the block located in the surface below the actor (scanned up to 10 blocks down). The struct contains '.r' '.g' '.b' and '.a' members, each 0.0 to 1.0. If no actor is specified or if no surface is found, each member value is set to 0.0. Available on the Client (Resource Packs) only.",
  },
  {
    name: "surface_particle_texture_coordinate",
    signature: ": { u: number, v: number }",
    description:
      "Returns the texture coordinate for generating particles for the block located in the surface below the actor (scanned up to 10 blocks down) in a struct with 'u' and 'v' keys. If no actor is specified or if no surface is found, u and v will be 0.0. Available on the Client (Resource Packs) only.",
  },
  {
    name: "surface_particle_texture_size",
    signature: ": { u: number, v: number }",
    description:
      "Returns the texture size for generating particles for the block located in the surface below the actor (scanned up to 10 blocks down). If no actor is specified or if no surface is found, each member value will be 0.0. Available on the Client (Resource Packs) only.",
  },
  {
    name: "swell_amount",
    signature: ": number",
    description: "Returns how swollen the entity is.",
  },
  {
    name: "swelling_dir",
    signature: ": number",
    description: "Returns the swelling direction of the entity if it makes sense, else it returns 0.0.",
  },
  {
    name: "swim_amount",
    signature: ": number",
    description: "Returns the amount the current entity is swimming.",
  },
  {
    name: "tail_angle",
    signature: ": number",
    description: "Returns the angle of the tail of the entity if it makes sense, else it returns 0.0.",
  },
  {
    name: "target_x_rotation",
    signature: ": number",
    description:
      "Returns the x rotation required to aim at the entity's current target if it has one, else it returns 0.0.",
  },
  {
    name: "target_y_rotation",
    signature: ": number",
    description:
      "Returns the y rotation required to aim at the entity's current target if it has one, else it returns 0.0.",
  },
  {
    name: "texture_frame_index",
    signature: ": number",
    description: "Returns the icon index of the experience orb.",
  },
  {
    name: "time_of_day",
    signature: ": number",
    description:
      "Returns the time of day (midnight=0.0, sunrise=0.25, noon=0.5, sunset=0.75) of the dimension the entity is in.",
  },
  {
    name: "time_since_last_vibration_detection",
    signature: ": number",
    description:
      "Returns the time in seconds since the last vibration detected by the actor. On errors or if no vibration has been detected yet, returns -1. Available on the Client (Resource Packs) only.",
  },
  {
    name: "time_stamp",
    signature: ": number",
    description: "Returns the current time stamp of the level",
  },
  {
    name: "timer_flag_1",
    signature: ": number",
    description: "Returns 1.0 if behavior.timer_flag_1 is running, else it returns 0.0.",
  },
  {
    name: "timer_flag_2",
    signature: ": number",
    description: "Returns 1.0 if behavior.timer_flag_2 is running, else it returns 0.0.",
  },
  {
    name: "timer_flag_3",
    signature: ": number",
    description: "Returns 1.0 if behavior.timer_flag_3 is running, else it returns 0.0.",
  },
  {
    name: "total_emitter_count",
    signature: ": number",
    description: "Returns the total number of active emitters in the world.",
  },
  {
    name: "total_particle_count",
    signature: ": number",
    description: "Returns the total number of active particles in the world.",
  },
  {
    name: "trade_tier",
    signature: ": number",
    description: "Returns the trade tier of the entity if it makes sense, else it returns 0.0",
  },
  {
    name: "unhappy_counter",
    signature: ": number",
    description:
      "Always returns zero. (Was originally meant to indicate Panda unhappiness but due to an early code change it has always only returned zero)",
  },
  {
    name: "variant",
    signature: ": number",
    description: "Returns the entity's variant index",
  },
  {
    name: "vertical_speed",
    signature: ": number",
    description: "Returns the speed of the entity up or down in meters/second, where positive is up.",
  },
  {
    name: "walk_distance",
    signature: ": number",
    description: "Returns the total distance traveled by an entity while on the ground and not sneaking.",
  },
  {
    name: "wing_flap_position",
    signature: ": number",
    description: "Returns the wing flap position of the entity, or 0.0 if this doesn't make sense.",
  },
  {
    name: "wing_flap_speed",
    signature: ": number",
    description: "Returns the wing flap speed of the entity, or 0.0 if this doesn't make sense.",
  },
  {
    name: "yaw_speed",
    signature: ": number",
    description: "Returns the entity's yaw speed",
  },
];

const molangMath: MolangData[] = [
  {
    name: "abs",
    signature: "(value: number): number",
    description: "Absolute value of value",
  },
  {
    name: "acos",
    signature: "(value: number): number",
    description: "arccos of value",
  },
  {
    name: "asin",
    signature: "(value: number): number",
    description: "arcsin of value",
  },
  {
    name: "atan",
    signature: "(value: number): number",
    description: "arctan of value",
  },
  {
    name: "atan2",
    signature: "(y: number, x: number): number",
    description: "arctan of y/x. NOTE: the order of arguments!",
  },
  {
    name: "ceil",
    signature: "(value: number): number",
    description: "Round value up to nearest integral number",
  },
  {
    name: "clamp",
    signature: "(value: number, min: number, max: number): number",
    description: "Clamp value to between min and max inclusive",
  },
  {
    name: "cos",
    signature: "(value: number): number",
    description: "Cosine (in degrees) of value",
  },
  {
    name: "die_roll",
    signature: "(num: number, low: number, high: number): number",
    description:
      "returns the sum of 'num' random numbers, each with a value from low to high`. Note: the generated random numbers are not integers like normal dice. For that, use `math.die_roll_integer`.",
  },
  {
    name: "die_roll_integer",
    signature: "(num: number, low: number, high: number): number",
    description:
      "returns the sum of 'num' random integer numbers, each with a value from low to high`. Note: the generated random numbers are integers like normal dice.",
  },
  {
    name: "exp",
    signature: "(value: number): number",
    description: "Calculates e to the value'th power",
  },
  {
    name: "floor",
    signature: "(value: number): number",
    description: "Round value down to nearest integral number",
  },
  {
    name: "hermite_blend",
    signature: "(value: number): number",
    description:
      "Useful for simple smooth curve interpolation using one of the Hermite Basis functions: `3t^2 - 2t^3`. Note that while any valid float is a valid input, this function works best in the range [0,1].",
  },
  {
    name: "lerp",
    signature: "(start: number, end: number, 0_to_1: number): number",
    description: "Lerp from start to end via 0_to_1",
  },
  {
    name: "lerprotate",
    signature: "(start: number, end: number, 0_to_1: number): number",
    description: "Lerp the shortest direction around a circle from start degrees to end degrees via 0_to_1",
  },
  {
    name: "ln",
    signature: "(value: number): number",
    description: "Natural logarithm of value",
  },
  {
    name: "max",
    signature: "(A: number, B: number): number",
    description: "Return highest value of A or B",
  },
  {
    name: "min",
    signature: "(A: number, B: number): number",
    description: "Return lowest value of A or B",
  },
  {
    name: "min_angle",
    signature: "(value: number): number",
    description: "Minimize angle magnitude (in degrees) into the range [-180, 180]",
  },
  {
    name: "mod",
    signature: "(value: number, denominator: number): number",
    description: "Return the remainder of value / denominator",
  },
  {
    name: "pi",
    signature: ": number",
    description: "Returns the float representation of the constant pi.",
  },
  {
    name: "pow",
    signature: "(base: number, exponent: number): number",
    description: "Elevates `base` to the `exponent`'th power",
  },
  {
    name: "random",
    signature: "(low: number, high: number): number",
    description: "Random value between low and high inclusive",
  },
  {
    name: "random_integer",
    signature: "(low: number, high: number): number",
    description: "Random integer value between low and high inclusive",
  },
  {
    name: "round",
    signature: "(value: number): number",
    description: "Round value to nearest integral number",
  },
  {
    name: "sin",
    signature: "(value: number): number",
    description: "Sine (in degrees) of value",
  },
  {
    name: "sqrt",
    signature: "(value: number): number",
    description: "Square root of value",
  },
  {
    name: "trunc",
    signature: "(value: number): number",
    description: "Round value towards zero",
  },
];

export function getMolangData(prefix: string) {
  if (prefix.match(/(q|query)/)) {
    return molangQueries;
  }
  if (prefix.match(/[Mm]ath/)) {
    return molangMath;
  }
}
