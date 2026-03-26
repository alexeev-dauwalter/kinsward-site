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

| Flag | Description |
|------|-------------|
| `--debug` | Enable debug mode (physics gizmos, test items, admin panel) |
| `--seed <N>` | Set world generation seed |

### Environment Variables

| Variable | Description |
|----------|-------------|
| `DEBUG=true` | Same as `--debug` |
| `WORLD_SEED=N` | Fallback seed (CLI `--seed` takes priority) |

### Examples

```bash
# Normal run
./kinsward

# Debug mode with a specific seed
./kinsward --debug --seed 42

# Seed via environment variable
WORLD_SEED=42 ./kinsward
```