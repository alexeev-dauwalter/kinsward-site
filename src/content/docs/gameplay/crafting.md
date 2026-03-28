---
title: Crafting
description: Crafting system, recipes, and stations in Kinsward
---

Press **C** to open the crafting panel. The panel header shows the active crafting station (or "Hand" if none nearby). Each recipe displays ingredient counts as have/need (e.g. "2/4 Stick") so you can see what you still need to gather. Recipes are filtered to those available at the current station.

## Crafting Stations

Stations are placeable blocks that unlock advanced recipes. Stand within **2 tiles** of a station to use it.

| Station | How to Get |
|---------|-----------|
| Workbench | Craft at Workbench (2 Plank + 4 Stick) |
| Furnace | Place as block (found in world or via kinswardctl) |
| Sawmill | Craft at Workbench (2 Stick + 1 Stone) |
| Crusher | Craft at Furnace (2 Clay) |

## Recipes

### Hand-crafted (no station)

| Input | Output |
|-------|--------|
| 1 Tree Trunk | 4 Stick |
| 3 Tall Grass | 1 Rope |

### Sawmill

| Input | Output |
|-------|--------|
| 1 Tree Trunk | 4 Plank |

### Crusher

| Input | Output |
|-------|--------|
| 1 Stone | 2 Crushed Stone |

### Workbench

| Input | Output |
|-------|--------|
| 2 Plank + 4 Stick | 1 Workbench |
| 2 Stick + 1 Stone | 1 Sawmill |

### Furnace

| Input | Output |
|-------|--------|
| 1 Iron Ore + 1 Coal | 1 Iron Ingot |
| 1 Copper Ore + 1 Coal | 1 Copper Ingot |
| 1 Gold Ore + 1 Coal | 1 Gold Ingot |
| 1 Clay | 2 Brick |
| 2 Clay | 1 Crusher |
| 1 Sand + 1 Crushed Stone | 1 Glass |

## Items

### Raw Resources

| Item | Source |
|------|--------|
| Tree Trunk | Mine trees |
| Tall Grass | Mine vegetation |
| Clay | Mine clay deposits |
| Iron Ore | Mine iron veins |
| Copper Ore | Mine copper veins |
| Gold Ore | Mine gold veins |
| Coal | Mine coal deposits |

### Processed Resources

| Item | Made At |
|------|---------|
| Plank | Sawmill |
| Stick | Hand-crafted |
| Iron Ingot | Furnace |
| Copper Ingot | Furnace |
| Gold Ingot | Furnace |
| Brick | Furnace |
| Rope | Hand-crafted |
| Crushed Stone | Crusher |
| Glass | Furnace |

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

## kinswardctl Commands

```bash
kinswardctl recipes              # List all recipes
kinswardctl nearby-station       # Check nearby crafting station
kinswardctl craft 1              # Craft recipe #1
```

Recipes and items are defined in `assets/recipes.ron` and `assets/items.ron` (RON format).
