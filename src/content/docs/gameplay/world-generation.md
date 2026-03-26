---
title: World Generation
description: Procedural world generation in Kinsward
---

Kinsward generates worlds procedurally using noise-based terrain and a 16-step climate simulation pipeline. Each world is unique based on its seed.

## Seeds

Set a world seed for reproducible generation:

```bash
./kinsward --seed 42
# or
WORLD_SEED=42 ./kinsward
```

If no seed is provided, one is generated randomly.

## Noise-Based Terrain

The base terrain uses Fractal Brownian Motion (FBM) Perlin noise:

| Noise Layer | Octaves | Scale | Determines |
|-------------|---------|-------|------------|
| Elevation | 6 | 0.008 | Terrain shape, z-level |
| Moisture | 4 | 0.012 | Biome type (grass/mud/sand) |
| Temperature | 1 | 0.006 | Climate (snow/ice) |
| Cave | 3 | 0.05 | Underground caverns |

### Elevation to Z-Level

| Elevation Value | Z-Level | Terrain |
|-----------------|---------|---------|
| < ~0.12 | -2 | Deep water |
| < 0.35 | -1 | Shallow water |
| < 0.55 | 0 | Plains |
| < 0.70 | 1 | Hills |
| < 0.85 | 2 | Mountains |
| >= 0.85 | 3 | Peaks |

Water z-levels use a continuous formula for smooth depth transitions. Shore zones (elevation 0.35–0.40) generate Sand or Ice blocks at z=0.

Generation depth: 5 blocks below and 4 above the active z-level. Stairs are auto-placed at elevation transitions.

## Climate Pipeline

The region map uses a 16-step simulation that runs on a 1024x1024 grid (each cell = 16x16 tiles):

### 1. Plates & Elevation
Voronoi tectonic plates with boundary uplift and detail noise. Determines the base continental structure.

### 2. Terrain Conditioning
Thermal erosion and smoothing passes to create natural-looking terrain.

### 3. Sea Level
Ocean, coast, and land classification via BFS. Computes `ocean_distance` for each cell.

### 4. Temperature
Derived from latitude, lapse rate (elevation cooling), and ocean proximity (maritime moderation).

### 5. Pressure
Hadley cell circulation + thermal pressure + barometric effects + noise + pressure centers.

### 6. Wind
Pressure gradient force + Coriolis effect + terrain deflection + surface drag.

### 7. Rainfall
Evaporation from oceans + advection by wind + orographic lift + rain shadow effects.

### 8. Geology
Rock type assignment from tectonic context. Eight rock types: Granite, Basalt, Sandstone, Limestone, Marble, Slate, Gneiss, Quartzite.

### 9. Depression Fill
Priority-flood algorithm to remove micro-sinks and ensure water can drain.

### 10. Drainage
Computed from elevation gradients, slope, and rock permeability.

### 11. Proto-Rivers
Flow accumulation with lake filling to trace initial river paths.

### 12. Fluvial Erosion
River valley carving modulated by rock hardness. Harder rocks resist erosion.

### 13. Final Rivers
Recomputed on the eroded terrain for accurate river placement.

### 14. Biomes
Assigned from temperature x rainfall x elevation x drainage. 22 biome types (see below).

### 15. Fertility
Soil fertility derived from rainfall + temperature + drainage + elevation + river proximity.

### 16. Vegetation
Plant density from biome type + rainfall + temperature + noise variation.

## Biomes

The world features 22 biome types:

| Biome | Description |
|-------|-------------|
| Ocean | Open water |
| Deep Ocean | Far from shore |
| Beach | Coastal sand |
| Glacier | Permanent ice |
| Tundra | Frozen plains |
| Taiga | Boreal conifer |
| Boreal Forest | Cold dense forest |
| Temperate Grassland | Moderate plains |
| Temperate Forest | Deciduous woodland |
| Temperate Rainforest | Wet temperate forest |
| Steppe | Dry grassland |
| Shrubland | Sparse bushes |
| Savanna | Tropical grassland |
| Tropical Forest | Warm woodland |
| Tropical Rainforest | Dense tropical jungle |
| Desert | Arid wasteland |
| Wetland | Swamp/marsh |
| Floodplain | River-adjacent flat |
| Montane Forest | Mountain woodland |
| Alpine | High-altitude meadow |
| Snow Peak | Mountain summit |
| Lake | Inland water body |

## Headless World Generation

The `worldgen` binary generates worlds without launching the game:

```bash
# Generate with a specific seed
worldgen --seed 42

# Export region map layers as PNG
worldgen --seed 42 --layers elevation --format png --out elevation.png

# Export as ASCII
worldgen --layers rivers --format ascii

# JSON output
worldgen --seed 42 --json
```

Available layers for export: `elevation`, `temperature`, `rainfall`, `wind`, `drainage`, `rivers`, `geology`, `fertility`, `vegetation`, `plates`, `biome`.

You can also export region maps from a running game using [kinswardctl region-map](/gamectl/commands/#region-map).
