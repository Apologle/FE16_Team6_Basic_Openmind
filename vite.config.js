import path from 'path';
import { fileURLToPath } from 'url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        replaceAttrValues: {
          '#000': 'currentColor',
          '#000000': 'currentColor',
          black: 'currentColor',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@context': path.resolve(__dirname, 'src/context'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@service': path.resolve(__dirname, 'src/service'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@functions': path.resolve(__dirname, 'src/functions'),
    },
  },
});
