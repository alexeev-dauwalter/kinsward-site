---
title: Changelog
description: Kinsward release history
---

Release notes are also available on the [GitHub Releases page](https://github.com/alexeev-dauwalter/kinsward-site/releases).

## v0.21.0 (Current)

- **UI redesign**: complete dark theme with floating semi-transparent panels replacing the old embedded UI
- **HUD**: top-left floating overlay with level badge, HP bar, EP bar (no background)
- **InputRegistry**: centralized input binding system with 21 keybindings across 5 contexts (Global, Adventure, Overseer, Inventory, Map View)
- **Control hints**: dynamic context-aware keybinding hints in the bottom-right corner
- **Settlement Bar**: top-center bar showing settlement name, population count, day, and season
- **Overseer Toolbar**: 5-button toolbar (Dig, Build, Pickup, Cancel, Auto) with live task count badges
- **Build Menu**: 8 categories (Walls, Stairs, Stations, Light, Plants, Resources, Water, Terrain) in card layout with inventory counts
- **Unit List panel**: N key toggle, scrollable Colony unit cards with name, race, status, level, HP/EP bars; double-click to possess
- **Unit Detail panel**: right-side inspector with name, level bars, race/trait pills, current task, command queue preview
- **Inventory redesign**: 4x10 grid (40 slots), equipment slot placeholders (Head, Weapon, Body, Shield, Legs, Accessory), stat display (STR, DEX, CON, INT, WIS, CHA), trait pills
- **Craft panel**: station indicator header, ingredient have/need display
- **Admin Menu**: debug-only (`~`) panel with Teleport Home, Spawn Colonist/Enemy, Debug UI toggle, Day/Night, Creative mode, Reveal Map
- **Creative Catalog**: debug+creative mode item browser for spawning items into inventory
- **Pause Menu**: redesigned ESC menu with Continue, Save World, Load (browse saves), Quit
- **Map View**: dedicated map mode (M key) with layer switching (Tab), zoom (Scroll), and pan (WASD)
- **QuickPeek**: hold B for 0.3s+ in Adventure mode to temporarily view Overseer mode with zoom overlay
- **Unit stats**: Health, Energy, and UnitLevel components with per-race base values
- **Panel animations**: slide-in/fade transitions for all floating panels (UiAnimator system)

## v0.20.0

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
