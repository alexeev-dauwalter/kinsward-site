---
title: Examples
description: Practical kinswardctl usage examples
---

## Quick Connection Test

Verify the game is running and the debug server is reachable:

```bash
kinswardctl ping
```

Or test directly with netcat:

```bash
echo '{"cmd":"Ping"}' | nc -q1 127.0.0.1 9999
```

## Exploration

### Check Your Position

```bash
kinswardctl state
```

Returns player position (x, y, z), current block, inventory contents, and hotbar state.

### Survey the Area

```bash
# Top-down view of z-level 1, 11x11 area around origin
kinswardctl layer -z 1 -x -5:5 -y -5:5

# Side view (cross-section) along y=0
kinswardctl cross-section -y 0 -x -10:10 -z -2:3

# Find items nearby
kinswardctl nearby 10

# Check visibility
kinswardctl fov 15
```

### Check Movement Options

```bash
# See all blocked directions at once
kinswardctl blocked

# Check a specific direction
kinswardctl can-move north
```

## Building

### Place Blocks Manually

```bash
# Select a block item in the hotbar
kinswardctl select-hotbar 0

# Place it at a specific position
kinswardctl place-block 5 5 1 100
```

### Automate with Zone Commands

Build a 10x10 stone wall floor at z=1:

```bash
# First, list your units
kinswardctl units

# Issue zone build to all Colony units
kinswardctl zone-build --units 4294967305,4294967306 -x 0:10 -y 0:10 -z 1 --item 100
```

Clear a rectangular area:

```bash
kinswardctl zone-demolish --units 4294967305 -x -5:5 -y -5:5 -z 1
```

### Direct World Editing

For testing or debugging, modify blocks directly (bypasses inventory):

```bash
# Set a block type
kinswardctl set-block 5 5 1 40  # Stone wall

# Fill an area
kinswardctl fill -x -5:5 -y -5:5 -z 0 20  # Grass floor

# Rebuild surface index after manual edits
kinswardctl rebuild-surfaces
```

## Unit Management

### Multi-Waypoint Patrol

Send a unit on a patrol route through multiple waypoints:

```bash
kinswardctl unit-plan 4294967305 5,0,1 5,5,1 0,5,1 0,0,1
```

### Task Queue Workflow

Create tasks and let idle units pick them up:

```bash
# Add build tasks
kinswardctl task-add build 10 5 1 --item 100
kinswardctl task-add build 11 5 1 --item 100
kinswardctl task-add build 12 5 1 --item 100

# Check task status
kinswardctl tasks --status pending

# Cancel if needed
kinswardctl task-cancel-zone -x 10:12 -y 5:5 -z 1
```

## Companion Management

```bash
# See who's following you
kinswardctl companion-list

# Call everyone to follow
kinswardctl companion-call-all

# Send everyone to station (stay put)
kinswardctl companion-dismiss-all

# Set individual behavior
kinswardctl companion-behavior 4294967305 station
```

## Map Export

Export world data for analysis or visualization:

```bash
# Elevation as PNG
kinswardctl region-map elevation --format png --path elevation.png --size 1024

# River network as ASCII art
kinswardctl region-map rivers --format ascii

# Biome statistics
kinswardctl region-map biome --format stats

# Temperature distribution
kinswardctl region-map temperature --format png --path temp.png
```

## Scripting with JSON Mode

Use `--json` for machine-readable output, perfect for scripting:

```bash
# Get player state as JSON
kinswardctl --json state

# Pipe through jq for specific fields
kinswardctl --json state | jq '.data.position'

# Script a sequence of moves
for dir in north north east east; do
  kinswardctl --json move $dir
  sleep 0.5
done
```

## Spawning & Testing

Set up a test scenario quickly:

```bash
# Spawn units (names auto-generated from syllable tables)
kinswardctl spawn dwarf 5 5 1 --faction colony
kinswardctl spawn goblin 10 5 1 --faction hostile

# Spawn with explicit name
kinswardctl spawn dwarf 5 5 1 --name "Builder" --controlled

# Check unit traits and info
kinswardctl units
kinswardctl unit-info 4294967305
kinswardctl traits

# Possess a unit to control directly
kinswardctl possess 4294967305

# Release control
kinswardctl possess

# Look up block/item info
kinswardctl lookup blocks stone
kinswardctl lookup items wall
kinswardctl registry items
```
