---
title: Changelog
description: Kinsward release history
---

Release notes are also available on the [GitHub Releases page](https://github.com/alexeev-dauwalter/kinsward-site/releases).

## v0.20.0 (Current)

- **Race system**: UnitKind replaced with data-driven Race enum (Dwarf, Goblin, Skeleton, Human, Deer, Wolf) + RaceRegistry from `assets/races.ron`
- **Trait system**: 8 innate traits (Hardy, Keen, Clumsy, etc.) randomly assigned at spawn, managed via kinswardctl
- **Name generation**: compound names from racial syllable tables (`assets/names.ron`) — dwarven, goblin, and human cultures
- **World name**: procedurally generated from World culture table, used as default save name
- **New commands**: QueryTraits, UnitAddTrait, UnitRemoveTrait; race and traits in QueryUnits/QueryUnitInfo
- **SpawnUnit**: accepts `race` + mandatory `faction` instead of `kind`

## v0.19.0

- **Async save**: no frame drops during save — data extracted on main thread, I/O on background thread
- **Entity save/load**: units, player, world items, inventories, and companion state fully persist
- **Quick Save/Load**: F5 to save, F9 to load
- **Save menu**: Escape opens menu with Save World and Load (sub-menu listing all saves with dates)
- **Autosave rotation**: 5 slots (autosave_1 through autosave_5), every 5 minutes
- **Load list fix**: save list now displays correctly on every open
- **Crafting UI fix**: "No recipes available" no longer duplicates every frame

## v0.18.0

- **Save/Load system**: serialization of WorldMap (bincode+zstd per z-level), RegionMap, TaskQueue, entity snapshots
- **Atomic saves**: write to temp dir, rename on completion
- **Crafting system**: 12 recipes, 4 crafting stations (Workbench, Furnace, Sawmill, Crusher)
- **Crafting UI**: C key toggles recipe panel, filtered by inventory and nearby station
- **NearbyStation**: proximity-based station detection (2-tile radius)
- **New items**: ores (Iron, Copper, Gold, Coal, Clay), processed resources (Plank, Stick, Ingots, Brick, Rope, Glass)
- **kinswardctl**: save, load, saves, delete-save, recipes, craft, nearby-station commands
- **Autosave**: every 5 minutes

## v0.17.4

- **Dual game modes**: Adventure (direct control) and Overseer (RTS-style)
- **Procedural world generation**: 16-step climate pipeline with 22 biomes
- **Z-level world**: multiple vertical levels with stairs navigation
- **Block system**: 20+ block types with mining and placement
- **Unit management**: command queues, A* pathfinding, task system
- **Companion system**: follow and station behaviors
- **Visibility**: shadowcasting FOV and dynamic lighting
- **Debug tools**: kinswardctl CLI with 40+ commands, TCP protocol
- **Data-driven**: block and item definitions in RON files
- **Cross-platform**: Linux and Windows builds

---

*Detailed per-version changelogs will be added as tagged releases are published.*
