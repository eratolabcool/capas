import { defineConfig } from 'astro';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://capas.pt',
  output: 'static',
  integrations: [sitemap()],
});
