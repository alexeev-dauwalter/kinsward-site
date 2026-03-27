---
title: Commands Reference
description: Complete kinswardctl command reference
---

All commands are run as `kinswardctl <command> [args...]`. Add `--json` for raw JSON output.

## Meta

| Command | Description |
|---------|-------------|
| `ping` | Test connection |
| `info` | Server info (version, uptime) |
| `game-info` | Extended game info (seed, player position, loaded chunks) |

```bash
kinswardctl ping
kinswardctl info
kinswardctl game-info
```

## Player State

| Command | Description |
|---------|-------------|
| `state` | Player position, z-level, inventory, hotbar |
| `blocked` | All blocked movement directions |
| `can-move <dir>` | Check if movement in a direction is possible |

```bash
kinswardctl state
kinswardctl blocked
kinswardctl can-move north
```

:::tip
Use `blocked` instead of multiple `can-move` calls — it returns all blocked directions at once.
:::

## Movement

| Command | Description |
|---------|-------------|
| `move <dir>` | Move in a cardinal direction (north/south/east/west) |
| `move-delta <dx> <dy>` | Move by tile offset |
| `stairs <dir>` | Use stairs (up/down) |
| `teleport <x> <y> <z>` | Teleport to coordinates |

```bash
kinswardctl move north
kinswardctl move-delta 3 0
kinswardctl stairs up
kinswardctl teleport 10 5 2
```

## World Queries

| Command | Description |
|---------|-------------|
| `block <x> <y> <z>` | Block info at coordinates |
| `surfaces <x> <y>` | Walkable z-levels at (x, y) |
| `layer -z <z> -x <min>:<max> -y <min>:<max>` | Top-down XY view of a z-level |
| `cross-section -y <y> -x <min>:<max> -z <min>:<max>` | Side XZ view |
| `volume -x <min>:<max> -y <min>:<max> -z <min>:<max>` | 3D volume snapshot |
| `nearby <radius>` | Items near the player |
| `fov <radius>` | Field of view visibility map |

```bash
kinswardctl block 5 5 1
kinswardctl surfaces 0 0
kinswardctl layer -z 1 -x -5:5 -y -5:5
kinswardctl cross-section -y 0 -x -10:10 -z -2:3
kinswardctl volume -x -3:3 -y -3:3 -z 0:2
kinswardctl nearby 5
kinswardctl fov 10
```

## World Modification

| Command | Description |
|---------|-------------|
| `mine-block <x> <y> <z>` | Remove a block |
| `place-block <x> <y> <z> <item_id>` | Place a block from inventory |
| `set-block <x> <y> <z> <block_type>` | Set block type directly |
| `fill -x <min>:<max> -y <min>:<max> -z <z> <block_type>` | Fill area with a block type |
| `rebuild-surfaces` | Rebuild the surface index |

```bash
kinswardctl mine-block 5 5 1
kinswardctl place-block 5 5 1 100
kinswardctl set-block 5 5 1 40
kinswardctl fill -x -5:5 -y -5:5 -z 1 40
kinswardctl rebuild-surfaces
```

## Inventory

| Command | Description |
|---------|-------------|
| `pickup-nearest` | Pick up the nearest item |
| `drop-from-slot <slot> [count]` | Drop items from a slot |
| `select-hotbar <slot>` | Select a hotbar slot (0-9) |

```bash
kinswardctl pickup-nearest
kinswardctl drop-from-slot 0 5
kinswardctl select-hotbar 3
```

## Registry

| Command | Description |
|---------|-------------|
| `registry <kind>` | List all entries (blocks / items / floor-covers) |
| `lookup <kind> <query>` | Search by name or ID |

```bash
kinswardctl registry blocks
kinswardctl registry items
kinswardctl lookup blocks stone
kinswardctl lookup items 100
```

## Units

| Command | Description |
|---------|-------------|
| `units` | List all units |
| `unit-info <entity_id>` | Detailed unit info |
| `unit-move <entity_id> <x> <y> <z>` | Queue move command |
| `unit-build <entity_id> <x> <y> <z> <item_id>` | Queue build command |
| `unit-demolish <entity_id> <x> <y> <z>` | Queue demolish command |
| `unit-pickup <entity_id> <target_entity_id>` | Queue pickup command |
| `unit-plan <entity_id> <waypoints...>` | Multi-waypoint route (x,y,z format) |
| `unit-queue-clear <entity_id>` | Clear command queue |
| `unit-stop <entity_id>` | Immediate stop |
| `unit-cancel-task <entity_id> [--tile x,y,z] [--index N]` | Cancel specific task |
| `unit-follow <follower_id> <target_id>` | Make unit follow another |

```bash
kinswardctl units
kinswardctl unit-info 4294967305
kinswardctl unit-move 4294967305 10 5 1
kinswardctl unit-build 4294967305 10 5 1 100
kinswardctl unit-demolish 4294967305 10 5 1
kinswardctl unit-plan 4294967305 5,0,1 5,5,1 0,5,1
kinswardctl unit-queue-clear 4294967305
kinswardctl unit-follow 4294967305 4294967306
```

## Traits

| Command | Description |
|---------|-------------|
| `traits` | List all available traits |
| `unit-add-trait <entity_id> <trait_id>` | Add a trait to a unit |
| `unit-remove-trait <entity_id> <trait_id>` | Remove a trait from a unit |

Trait IDs: `hardy`, `quicklearner`, `clumsy`, `nightowl`, `strongback`, `keen`, `frail`, `firstborn`.

```bash
kinswardctl traits
kinswardctl unit-add-trait 4294967305 hardy
kinswardctl unit-remove-trait 4294967305 clumsy
```

## Spawning

| Command | Description |
|---------|-------------|
| `spawn <race> <x> <y> <z> [options]` | Spawn a unit |
| `possess [entity_id]` | Possess a unit (no ID = release) |

Races: `dwarf`, `goblin`, `skeleton`, `human`, `deer`, `wolf`.

Options for `spawn`: `--name <name>`, `--faction <faction>` (default: colony), `--controlled`.
Factions: `colony`, `hostile`, `neutral`, `wild`.

```bash
kinswardctl spawn dwarf 10 5 1 --name "Urist" --faction colony --controlled
kinswardctl spawn goblin 5 5 1 --faction hostile
kinswardctl possess 4294967305
kinswardctl possess
```

## Zone Operations

| Command | Description |
|---------|-------------|
| `zone-demolish --units <ids> -x <min>:<max> -y <min>:<max> -z <z> [--append]` | Bulk demolish |
| `zone-build --units <ids> -x <min>:<max> -y <min>:<max> -z <z> --item <id> [--append]` | Bulk build |
| `zone-cancel [--units <ids>] -x <min>:<max> -y <min>:<max> -z <z>` | Cancel zone tasks |

```bash
kinswardctl zone-demolish --units 4294967305,4294967306 -x -5:5 -y -5:5 -z 1
kinswardctl zone-build --units 4294967305 -x 0:10 -y 0:10 -z 1 --item 100
kinswardctl zone-cancel -x -5:5 -y -5:5 -z 1
```

Use `--append` to add to existing task queues instead of replacing them.

## Companions

| Command | Description |
|---------|-------------|
| `companion-list` | List all companions |
| `companion-behavior <entity_id> <behavior>` | Set behavior (follow/station) |
| `companion-call-all` | Set all companions to Follow |
| `companion-dismiss-all` | Set all companions to Station |

```bash
kinswardctl companion-list
kinswardctl companion-behavior 4294967305 follow
kinswardctl companion-call-all
kinswardctl companion-dismiss-all
```

## Tasks

| Command | Description |
|---------|-------------|
| `tasks [--status <filter>]` | List tasks (all/pending/assigned/blocked) |
| `task-add <kind> <x> <y> <z> [--item <id>] [--target <id>]` | Create a task |
| `task-cancel <task_id>` | Cancel a task |
| `task-cancel-zone -x <min>:<max> -y <min>:<max> -z <z>` | Cancel all tasks in zone |

```bash
kinswardctl tasks
kinswardctl tasks --status pending
kinswardctl task-add build 10 5 1 --item 100
kinswardctl task-add demolish 10 5 1
kinswardctl task-cancel 42
kinswardctl task-cancel-zone -x -5:5 -y -5:5 -z 1
```

## Region Map

| Command | Description |
|---------|-------------|
| `region-map <layer> [options]` | Export region map layer |

Layers: `elevation`, `temperature`, `rainfall`, `wind`, `drainage`, `rivers`, `geology`, `fertility`, `vegetation`, `plates`, `biome`.

Options: `--format <png/ascii/stats>`, `--path <output>`, `--size <N>`, `--width <N>`, `-x <N>`, `-y <N>`.

```bash
kinswardctl region-map elevation
kinswardctl region-map elevation --format png --path elevation.png --size 1024
kinswardctl region-map rivers --format ascii
kinswardctl region-map biome --format stats
```

## Crafting

| Command | Description |
|---------|-------------|
| `recipes` | List all crafting recipes |
| `nearby-station` | Check which crafting station is nearby |
| `craft <recipe_id>` | Craft a recipe by ID |

```bash
kinswardctl recipes
kinswardctl nearby-station
kinswardctl craft 1
```

## Save & Load

| Command | Description |
|---------|-------------|
| `save [name]` | Save the world (default: `world_{seed}`) |
| `load <name>` | Load a saved world |
| `saves` | List all save slots |
| `delete-save <name>` | Delete a save slot |

```bash
kinswardctl save
kinswardctl save my_world
kinswardctl saves
kinswardctl load quicksave
kinswardctl delete-save old_save
```

## Raw Command

Send arbitrary JSON directly to the TCP server:

```bash
kinswardctl raw '{"cmd":"Ping"}'
kinswardctl raw '{"cmd":"QueryState"}'
```
