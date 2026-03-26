---
title: Crafting
description: Crafting and items in Kinsward
---

:::caution[Under Development]
The crafting system is not yet implemented. This page documents the current item system and planned crafting features.
:::

## Current Items

Items exist in the game and can be picked up, dropped, and stored in your inventory. Block-type items can be placed in the world.

### Resources

| Item | Group | Stack Size |
|------|-------|-----------|
| Apple | Food | 64 |
| Wood | Resource | 64 |

### Block Items

These items can be placed as blocks using right-click in [Adventure Mode](/gameplay/adventure-mode/) or Build commands in [Overseer Mode](/gameplay/overseer-mode/):

| Item | Places Block |
|------|-------------|
| Stone Wall | WALL_STONE |
| Wood Wall | WALL_WOOD |
| Glass Wall | GLASS_WALL |
| Grass | GRASS |
| Sand | SAND |
| Dirt | DIRT |
| Stone | STONE |
| Snow | SNOW |
| Ice | ICE |
| Mud | MUD |
| Dry Grass | DRY_GRASS |
| Lantern | LANTERN (light source) |
| Stairs Up | STAIRS_UP |
| Stairs Down | STAIRS_DOWN |

Items and blocks are defined in data files (`assets/items.ron` and `assets/blocks.ron`) using the RON format — no recompilation needed to add new types.

## Block Types

The world is built from block types, each with specific properties:

| ID | Name | Blocks Movement | Supports Standing | Notes |
|----|------|:---:|:---:|-------|
| 0 | AIR | | | Empty space |
| 1 | VOID | x | | Impenetrable boundary |
| 2 | HOLE | | | Vertical shaft, see-through |
| 10 | STONE | x | x | Solid rock |
| 11 | DIRT | x | x | Underground fill |
| 20 | GRASS | | x | Surface terrain |
| 21 | SAND | | x | Beach / desert |
| 22 | MUD | | x | Wet terrain |
| 23 | DRY_GRASS | | x | Arid terrain |
| 24 | SNOW | | x | Cold terrain |
| 25 | ICE | x | x | Semi-transparent solid |
| 40 | WALL_STONE | x | | Constructed wall |
| 41 | WALL_WOOD | x | | Constructed wall |
| 42 | GLASS_WALL | x | | Transparent wall |
| 50 | STAIRS_UP | | x | Ascending stairs |
| 51 | STAIRS_DOWN | | x | Descending stairs |
| 60 | DEEP_WATER | x | | Impassable water |
| 61 | SHALLOW_WATER | | x | Wadeable |
| 70 | LANTERN | | | Light source |

**Movement rule**: A tile is passable if the block at feet level does not have `blocks_movement` **and** the block below has `supports_standing`.

## Planned Features

Future phases will introduce:

- **Crafting recipes** — transform raw materials into refined goods
- **Production buildings** — workshops, smelters, sawmills
- **Resource chains** — wood → boards, ore → ingots → tools
- **Farming** — grow crops, manage food supply
