---
title: Units & Companions
description: Unit management and companion system in Kinsward
---

Units are the characters in the world — your colonists, enemies, and neutral NPCs. In [Overseer Mode](/gameplay/overseer-mode/), you select and command units to build, demolish, and explore.

## Factions

Each unit has a **race** and a **faction**. Race determines base stats (speed, view radius, sprite) via data-driven `assets/races.ron`. Faction determines behavior class. Any race can belong to any faction.

### Races

| Race | Notes |
|------|-------|
| Dwarf | Colony default. Generated dwarven names. |
| Goblin | Hostile default. Goblin name culture. |
| Skeleton | Hostile default. Uses goblin name culture. |
| Human | Neutral default. Human name culture. |
| Deer | Wild. No generated names. |
| Wolf | Wild. No generated names. |

### Factions

| Faction | Behavior |
|---------|----------|
| Colony | Selectable, commandable, possessable by the player |
| Hostile | Attacks on sight |
| Neutral | Non-hostile — future trading |
| Wild | Passive fauna |

## Unit Commands

Units execute commands from a queue. Available commands:

| Command | Description |
|---------|-------------|
| MoveTo | Pathfind to a target tile |
| Build | Place a block at a tile using an item |
| Demolish | Remove a block at a tile |
| Pickup | Pick up an entity (dropped item) |

Commands are queued sequentially. Hold Shift + right-click in Overseer Mode to append to the queue instead of replacing it.

### Pathfinding

Units use A* pathfinding to navigate to their target. The pathfinder respects:
- Block movement rules (`blocks_movement` property)
- Surface transitions (step up/down, walk, fall)
- Z-level navigation via stairs

### Multi-Waypoint Plans

Using [kinswardctl](/kinswardctl/commands/), you can assign multi-waypoint routes:

```bash
kinswardctl unit-plan <entity_id> 5,0,1 5,5,1 0,5,1
```

## Task System

The global **TaskQueue** holds pending tasks. When a unit becomes idle, it automatically picks the nearest pending task from the queue and pathfinds to execute it.

Task types: Build, Demolish, Pickup.

Tasks can be created by:
- Right-clicking in Overseer Mode
- Zone operations (bulk build/demolish)
- kinswardctl commands (`task-add`, `zone-build`, `zone-demolish`)

## Companions

Companions are Colony units that follow behavioral patterns:

| Behavior | Description |
|----------|-------------|
| Follow | Follow a specific entity (typically the player) |
| Station | Stay in place |

### Managing Companions

Use [kinswardctl companion commands](/kinswardctl/commands/#companions) or the in-game companion system:

```bash
# List all companions
kinswardctl companion-list

# Set a companion to follow
kinswardctl companion-behavior <entity_id> follow

# Call all companions to follow
kinswardctl companion-call-all

# Dismiss all (station in place)
kinswardctl companion-dismiss-all
```

## Traits

Units of sentient races (those with name cultures — Dwarf, Goblin, Skeleton, Human) receive 0–3 random traits at spawn. Traits are descriptive for now — stat modifiers will come with the attribute system.

| Trait | Category | Effect |
|-------|----------|--------|
| Hardy | physical | Tough constitution, resistant to cold and disease |
| Quick Learner | mental | Picks up skills faster |
| Strong Back | physical | Can carry heavier loads |
| Keen | physical | Sharp senses, extended field of view |
| Night Owl | lifestyle | More productive at night |
| Clumsy | physical | Prone to accidents, slower at tasks |
| Frail | physical | Weak constitution, takes more damage |
| Firstborn | birthright | First child of lineage (not randomly assigned) |

Manage traits via kinswardctl:

```bash
kinswardctl traits                          # list all traits
kinswardctl unit-add-trait <ID> hardy       # add trait
kinswardctl unit-remove-trait <ID> clumsy   # remove trait
```

## Names

Sentient units receive generated names from racial syllable tables (defined in `assets/names.ron`). Dwarves get names like "Thorin Ironforge", goblins like "Snagnak Rotfang". Animals get descriptive names ("Deer #1").

The world itself also receives a generated name (e.g. "Stormreach") from the World culture table, visible via `kinswardctl game-info`.

## Spawning Units

In debug mode, new units can be spawned via kinswardctl:

```bash
# Spawn a dwarf colony unit at (10, 5, 1) — name auto-generated
kinswardctl spawn dwarf 10 5 1

# Spawn with explicit name and faction
kinswardctl spawn goblin 5 5 1 --faction hostile --name "Grikash"

# Spawn and possess (take direct control)
kinswardctl spawn dwarf 0 0 1 --controlled
```

Races: `dwarf`, `goblin`, `skeleton`, `human`, `deer`, `wolf`.
Factions: `colony` (default), `hostile`, `neutral`, `wild`.

## Possession

You can **possess** a Colony unit to take direct control in Adventure Mode. While possessing a unit, WASD moves that unit instead of the default player character.

```bash
kinswardctl possess <entity_id>   # take control
kinswardctl possess               # release
```

:::caution[Under Development]
Non-player AI behaviors (idle routines, enemy aggression, neutral trading) are planned but not yet implemented. Currently, units only act on explicit player commands or task queue assignments.
:::
