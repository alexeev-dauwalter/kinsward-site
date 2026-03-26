# Kinsward Site

Documentation and release hosting for [Kinsward](https://kinsward.dwltr.life) — a Dwarf Fortress-inspired 2D colony sim with z-levels, dual game modes, and procedural world generation.

**Live site**: [kinsward.dwltr.life](https://kinsward.dwltr.life)

## Development

```bash
pnpm install    # install dependencies
pnpm dev        # start dev server
pnpm build      # production build
pnpm preview    # preview production build
```

Built with [Astro Starlight](https://starlight.astro.build/).

## Deployment

The site deploys automatically to GitHub Pages on push to `main`.

Game releases are published to this repo's GitHub Releases from the private game repo's CI pipeline.
