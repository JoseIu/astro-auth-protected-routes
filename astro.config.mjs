// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import node from '@astrojs/node';

import auth from 'auth-astro';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), auth()],
  output: 'server',

  adapter: node({
    mode: 'standalone'
  })
});