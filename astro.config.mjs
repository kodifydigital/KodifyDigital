// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://kodifydigital.com',
  server: {
    host: '127.0.0.1',
    port: 4500,
  },
  integrations: [vue(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
