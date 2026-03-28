---
title: Roadmap
description: Kinsward development roadmap and progress
---

## Phase 0 — Foundation (Current)

Core engine and gameplay loop.

### Implemented

- [x] Adventure mode — direct WASD character control
- [x] Overseer mode — RTS-style camera, unit selection, commands
- [x] Mode switching (Adventure / Overseer)
- [x] Procedural world generation with 16-step climate pipeline
- [x] 22 biome types
- [x] Z-level navigation with stairs
- [x] Block mining and placement with z-level targeting
- [x] Inventory and hotbar system
- [x] Unit commands — MoveTo, Build, Demolish, Pickup
- [x] A* pathfinding for units
- [x] Global task queue with auto-assignment to idle units
- [x] Companion system — Follow, Station behaviors
- [x] Shadowcasting field of view
- [x] Dynamic lighting with light sources
- [x] Surface index and grounding system
- [x] TCP debug server and kinswardctl CLI (40+ commands)
- [x] Region map export (PNG, ASCII, stats)
- [x] Headless world generation binary (worldgen)
- [x] Data-driven blocks and items (RON format)
- [x] Zone operations (bulk build/demolish)
- [x] Unit possession (control any Colony unit)
- [x] Save/Load system (async save, entity persistence, autosave rotation)
- [x] Crafting system (12 recipes, 4 stations, proximity detection)
- [x] Race system — data-driven races (Dwarf, Goblin, Skeleton, Human, Deer, Wolf)
- [x] Trait system — 8 innate traits assigned at spawn
- [x] Name generation — compound names from racial syllable tables
- [x] World name — procedurally generated, used as default save name
- [x] UI system — dark theme, floating panels, HUD, InputRegistry, UiAnimator
- [x] Map view — dedicated mode with layer switching, zoom, and pan
- [x] Admin menu — debug-only panel for game administration

### In Progress

- [ ] Vegetation rendering (trees, bushes, tall grass)
- [ ] Expanded block type library

## Phase 1 — Crafting & Resources

- [x] Crafting recipe system
- [x] Production buildings (workshops, smelters, sawmills)
- [x] Resource processing chains (wood → boards, ore → ingots)
- [ ] Textured tile rendering (replace color-based sprites)
- [ ] Expanded item types

## Phase 2 — Colony Management

- [x] Overseer UI panels — Settlement Bar, Toolbar, Unit List, Unit Detail, Build Menu
- [ ] Building blueprints and templates
- [ ] Stockpile zones
- [ ] Farming and food production

## Phase 3 — Living World

- [ ] Non-player AI behaviors (idle routines, needs)
- [ ] Enemy AI (aggression, raiding)
- [ ] Neutral NPCs and trading
- [ ] Animal husbandry
- [ ] Weather and seasonal cycles
- [ ] Fall damage
- [ ] Ramps and ladders
