---
title: Units & Companions
description: Unit management and companion system in Kinsward
---

Units are the characters in the world — your colonists, enemies, and neutral NPCs. In [Overseer Mode](/gameplay/overseer-mode/), you select and command units to build, demolish, and explore.

## Factions

Each unit belongs to a faction:

| Faction | Behavior |
|---------|----------|
| Colony | Selectable, commandable, possessable by the player |
| Enemy | Hostile — attacks on sight |
| Neutral | Non-hostile — future trading |

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

## Spawning Units

In debug mode, new units can be spawned via kinswardctl:

```bash
# Spawn a dwarf at position (10, 5, 1)
kinswardctl spawn dwarf 10 5 1 --name "Urist" --faction colony --controlled

# Possess a unit (take direct control)
kinswardctl possess <entity_id>

# Release possession
kinswardctl possess
```

## Possession

You can **possess** a Colony unit to take direct control in Adventure Mode. While possessing a unit, WASD moves that unit instead of the default player character.

:::caution[Under Development]
Non-player AI behaviors (idle routines, enemy aggression, neutral trading) are planned but not yet implemented. Currently, units only act on explicit player commands or task queue assignments.
:::
