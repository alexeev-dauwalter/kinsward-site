This is an Astro Starlight documentation site for the Kinsward game.

- Content pages are in `src/content/docs/`
- Use `.md` for static pages, `.mdx` when using `<Kbd>` component from `starlight-kbd/components`
- Changelog format: H2 heading with version, bullet list of changes grouped by category
- Roadmap uses checkboxes: `- [x]` for done, `- [ ]` for planned
- Build and verify: `pnpm run build`
- Sidebar is defined explicitly in `astro.config.mjs` — update it when adding new pages
- Use Starlight admonitions: `:::tip`, `:::note`, `:::caution[Under Development]`
- The game source code is private — do not add links to it or build-from-source instructions
