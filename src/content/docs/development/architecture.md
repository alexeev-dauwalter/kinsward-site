---
title: Architecture
description: Kinsward technical architecture and design
---

## Technology Stack

| Component | Technology |
|-----------|-----------|
| Language | Rust |
| Game engine | Bevy 0.18 (ECS) |
| Physics | Avian2D |
| Serialization | serde + serde_json, RON |
| Noise | noise crate (Perlin FBM) |
| CLI | clap (derive) |

## System Execution Order

Systems run in a defined order via `GameSet`:

```
Input → Commands → Movement → Fov → Lighting → Barriers → Render
```

| Set | Responsibility |
|-----|---------------|
| Input | Keyboard, mouse, controller input |
| Commands | TCP server commands, overseer actions |
| Movement | Player/unit movement, stairs, terrain sync |
| Fov | Shadowcasting field of view computation |
| Lighting | Light source propagation |
| Barriers | Elevation barrier updates |
| Render | Tile sprite rendering |

Dependencies: Movement runs after Input. Fov runs after Movement. Lighting and Barriers run after Fov. Render runs last.

## World Model

```
WorldMap
  └─ HashMap<i32, Layer>           z-level → Layer
     └─ HashMap<IVec2, Chunk>      chunk pos → Chunk (32×32)
        ├─ Vec<BlockVolume>        dense block storage
        ├─ HashMap<(u8,u8), FloorCoverId>    sparse floor covers
        └─ HashMap<(u8,u8), CeilingCoverId>  sparse ceiling covers
```

### Constants

| Constant | Value |
|----------|-------|
| `CHUNK_SIZE` | 32×32 tiles |
| `TILE_SIZE_PX` | 32.0 pixels |
| Z range | -100 to +100 |

### Coordinate System

- **X** = East (+) / West (-)
- **Y** = North (+) / South (-)
- **Z** = Vertical levels (up +)
- Player at z=N stands on a solid block at z=N-1

## Block System

`BlockType` is a `u16` newtype (not an enum) for extensibility — supports up to 65,535 block types.

`BlockRegistry` uses a flat `Vec<Option<BlockProps>>` indexed by the u16 ID for O(1) lookup. Block properties include:

- `blocks_movement` — whether the block blocks horizontal movement
- `supports_standing` — whether units can stand on it
- `vision_transmittance` — FOV light pass-through (0.0–1.0)
- `light_transmittance` — lighting pass-through (0.0–1.0)
- `placeable`, `mineable` — interaction rules
- Sprite atlas coordinates and color fallback

## Data-Driven Design

Block and item definitions live in RON files, loaded at startup:

- `assets/blocks.ron` — block types, properties, sprite mappings
- `assets/items.ron` — item definitions (id, name, group, stack size)

Atlases: `Natural.png` (20×22 grid), `Civilized.png` (24×18 grid), `People.png`.

No recompilation needed to add or modify blocks and items.

## Key Patterns

### Dirty Flags

A `DirtyFlags` resource tracks what needs recomputation:

- `render_dirty` — tile sprites need refresh
- `lighting_dirty` — light values changed
- `fov_dirty` — visibility needs recalculation
- `barriers_dirty` — elevation barriers changed
- `chunks_generated` — new chunks were created

Systems check dirty flags and skip work when nothing changed.

### Command System

`GameCommand` is a serde-tagged enum routed through a `CommandQueue`. Commands come from:
- TCP server (kinswardctl)
- Overseer mode UI
- Internal game systems

The command executor processes the queue each frame in the Commands system set.

### Task System

A global `TaskQueue` holds Build, Demolish, and Pickup tasks. Tasks are created by overseer commands or zone operations. Idle Colony units automatically pick the nearest pending task.

### State Machine

`InputMode` tracks the current game mode:
- `Adventure` — direct player control
- `Overseer` — RTS-style unit management

Mode switching triggers camera transitions and input handler swaps.

### Surface Index

Maps `(x, y)` columns to walkable z-levels. Used by pathfinding and grounding to determine where units can stand. Rebuilt when blocks change.

## Rendering

Tile-based rendering: one Bevy entity per visible tile. Sprites come from 10px-cell texture atlases scaled 3.2× to fill the 32px tile size.

Final tile color formula:

```
color = base_color × depth_factor × light_value × visibility
```

## Module Layout

| Module | Responsibility |
|--------|---------------|
| `src/world/` | WorldMap, blocks, chunks, layers, surfaces, grounding |
| `src/commands/` | GameCommand, executor, TCP server, region-map export |
| `src/render/` | Viewport, sprites, FPS display |
| `src/fov/` | Shadowcasting FOV, visibility maps |
| `src/lighting/` | Light propagation |
| `src/generation/` | Procedural generation, climate pipeline (16 modules) |
| `src/units/` | Unit components, spawner, possession, movement |
| `src/overseer/` | RTS mode: camera, selection, commands, pathfinding, tasks |
| `src/companions/` | Companion behaviors |
| `src/ui/` | UI animation system |
| `src/schedule.rs` | GameSet definition and ordering |

## Binaries

| Binary | Purpose |
|--------|---------|
| `kinsward` | Main game |
| `kinswardctl` | CLI debug tool |
| `worldgen` | Headless world generation |
