// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightKbd from 'starlight-kbd';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://kinsward.dwltr.life',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    starlight({
      title: 'Kinsward',
      description: 'A Dwarf Fortress-inspired colony sim with adventure and overseer modes',
      logo: {
        light: './src/assets/logo-light.svg',
        dark: './src/assets/logo-dark.svg',
        replacesTitle: false,
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/alexeev-dauwalter/kinsward-site',
        },
      ],
      customCss: ['./src/styles/custom.css'],
      plugins: [
        starlightKbd({
          types: [
            { id: 'linux', label: 'Linux', detector: 'linux', default: true },
            { id: 'mac', label: 'macOS', detector: 'apple' },
            { id: 'windows', label: 'Windows', detector: 'windows' },
          ],
        }),
      ],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Download', link: '/getting-started/download/' },
            { label: 'Installation', link: '/getting-started/installation/' },
            { label: 'Controls', link: '/getting-started/controls/' },
          ],
        },
        {
          label: 'Gameplay',
          items: [
            { label: 'Adventure Mode', link: '/gameplay/adventure-mode/' },
            { label: 'Overseer Mode', link: '/gameplay/overseer-mode/' },
            { label: 'World Generation', link: '/gameplay/world-generation/' },
            { label: 'Units & Companions', link: '/gameplay/units/' },
            { label: 'Crafting', link: '/gameplay/crafting/' },
          ],
        },
        {
          label: 'kinswardctl',
          items: [
            { label: 'Overview', link: '/kinswardctl/overview/' },
            { label: 'Commands Reference', link: '/kinswardctl/commands/' },
            { label: 'Examples', link: '/kinswardctl/examples/' },
          ],
        },
        {
          label: 'Development',
          items: [
            { label: 'Roadmap', link: '/development/roadmap/' },
            { label: 'Changelog', link: '/development/changelog/' },
            { label: 'Architecture', link: '/development/architecture/' },
          ],
        },
      ],
    }),
  ],
});
