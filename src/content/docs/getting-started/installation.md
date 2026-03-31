---
title: Installation
description: How to install and run Kinsward
---

## Installing from a Release

### Linux

```bash
# Extract the archive
tar xzf kinsward-vX.Y.Z-linux-x86_64.tar.gz

# Run the game
./kinsward
```

### Windows

Extract the `.zip` archive and run `kinsward.exe`.

### Directory Structure

The game expects the `assets/` directory to be in the same location as the binary:

```
kinsward          # or kinsward.exe on Windows
assets/
├── blocks.ron    # block definitions
├── items.ron     # item definitions
├── Natural.png   # sprite atlas
├── Civilized.png # sprite atlas
└── People.png    # sprite atlas
```

## Command-Line Options

```
./kinsward [--debug] [COMMAND]
```

| Flag / Subcommand | Description |
|-------------------|-------------|
| `--debug` | Enable debug mode (physics gizmos, F3/F11 debug keys, admin panel) |
| `new [--seed N]` | Create a new world (optional seed); skips main menu |
| `load <name>` | Load a save file; skips main menu |
| *(no subcommand)* | Start at the main menu |

### Environment Variables

| Variable | Description |
|----------|-------------|
| `DEBUG=true` | Same as `--debug` |
| `WORLD_SEED=N` | Fallback seed (`new --seed` takes priority) |

### Examples

```bash
# Start at the main menu
./kinsward

# New world with a specific seed
./kinsward new --seed 42

# Load a save file directly
./kinsward load quicksave

# Debug mode + new world with random seed
./kinsward --debug new

# Seed via environment variable
WORLD_SEED=42 ./kinsward new
```