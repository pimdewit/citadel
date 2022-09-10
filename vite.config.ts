import vue from '@vitejs/plugin-vue';
import {visualizer} from 'rollup-plugin-visualizer';
import {defineConfig} from 'vite';
import glsl from 'vite-plugin-glsl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), glsl()],
  server: {
    hmr: false,
  },
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          emitFile: true,
          filename: 'stats.html',
        }),
      ],
    },

    /** If you set esmExternals to true, this plugins assumes that
     all external dependencies are ES modules */

    commonjsOptions: {
      esmExternals: true,
    },
  },
});
