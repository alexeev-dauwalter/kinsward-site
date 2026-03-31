---
title: Changelog
description: Kinsward release history
---

Release notes are also available on the [GitHub Releases page](https://github.com/alexeev-dauwalter/kinsward-site/releases).

## v0.26.1 (Current)

- **Debug guard**: F3 (debug picking toggle), F11 (hover debug info), and physics gizmos now require `--debug` flag — disabled in normal gameplay
- **Physics gizmos sync**: `sync_physics_gizmos_to_debug` ensures physics gizmos match debug UI visibility on startup

## v0.26.0

- **GamePhase state machine**: 4 states — MainMenu → WorldGen / Loading → Playing; UI systems spawn only on `OnEnter(Playing)`
- **CLI subcommands**: `new [--seed N]` creates a new world, `load <name>` loads a save; replaces old `--seed` / `--save` flags
- **Main menu screen**: stub screen with "KINSWARD" title; auto-transitions to WorldGen (or Loading if `load` subcommand used)
- **Loading screen**: displayed on `load <name>`, blocks interaction with `FocusPolicy::Block` + `ZIndex(300)`, transitions to Playing on success
- **UI deferred to Playing**: 12+ UI systems (chat, companions, crafting, hotbar, inventory, FPS, tooltip, admin menu, control hints, creative catalog, HUD, save menu) moved from Startup to `OnEnter(GamePhase::Playing)`

## v0.25.0

- **14 new GameCommand variants**: SwitchMode, SetToolMode, CameraMove, CameraZoom, SelectUnit, DeselectAll, QuerySelection, SetActiveZ, SetFloorCover, RemoveFloorCover, QueryLight, QueryInventory, QueryPerf
- **Command stubs connected**: SaveWorld/LoadWorld wired to SaveIntent/LoadIntent; QueryRecipes/Craft/QueryNearbyStation wired to CraftingRegistry
- **SystemParam bundles**: `SpawnCmd` and `ExtCmd` bundles to work around Bevy's 16-param limit
- **CameraCmdQueue**: dedicated queue + `apply_camera_commands` system for camera commands from TCP
- **kinswardctl**: 12 new subcommands with human-readable formatting (switch-mode, set-tool-mode, camera-move, camera-zoom, select, deselect-all, selection, set-active-z, set-floor-cover, remove-floor-cover, light, perf)

## v0.24.0

- **UI picking migration**: `UiHovered` resource (centralized hover check from `HoverMap` filtered by `Node`) replaces 6 `Query<&PickingInteraction>` guard patterns
- **Observer clicks**: all UI clicks use `On<Pointer<Click>>` observers instead of `Interaction` polling
- **Inventory refactor**: `handle_inventory_interaction` replaced with observer `on_inventory_slot_click` + `handle_inventory_q_drop`
- **Hover via CardBaseColor**: inventory slots and cards use `CardBaseColor` + `Hovered` component instead of manual `PickingInteraction` polling
- **PickingInteraction removed**: completely eliminated from the codebase
- **UiSlotManager**: centralized panel management system
- **DebugPickingPlugin**: behind `cfg(debug)`, toggle with F3; F11 prints HoverMap to stderr
- **bevy_dev_tools**: added under `debug` feature flag

## v0.23.0

- **UI scroll**: mouse-wheel scrolling on all scrollable panels via vendored `bevy_scrollbar`
  - Unit list, companions, creative catalog, crafting, build menu, chat — all scroll with visible scrollbar thumbs
  - Chat: scrollbar visible only when panel open (T key), auto-scroll to bottom on new messages
- **UI picking fix**: removed 5 fullscreen positioning overlays (HotbarUiRoot, BuildMenuOverlay, ToolbarRoot, SettlementBarRoot, OverseerUiRoot) that blocked `bevy_picking` for all UI
- **Hover effects**: `CardBaseColor` component + `Hovered` (CSS-like, includes descendants) for card hover feedback across all panels
- **Build menu redesign**: inventory-style 64×64 grid cards, replaces toolbar when open, 40vh height, grid layout
- **Camera FPS fix**: removed unnecessary `fov_dirty`/`lighting_dirty` flags from overseer camera pan — fixes 180→25 FPS drop during camera movement
- **Sprite/mesh picking disabled**: `require_markers: true` on `SpritePickingSettings`/`MeshPickingSettings` to prevent picking overhead on game world entities
- **Theme constants**: `SCROLLBAR_WIDTH`, `SCROLLBAR_THUMB`, `BORDER_WIDTH` added to `UiTheme`
- **Creative catalog**: proper scroll (only grid scrolls, title fixed), `GlobalZIndex(25)`, width 220px
- **Crafting panel**: scrollbar, `GlobalZIndex(25)`, recipe rebuild cache to prevent per-frame respawn

## v0.22.0

- **Sprite system**: texture atlases, palette, item/unit icons, JetBrains Mono font

## v0.21.0

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
