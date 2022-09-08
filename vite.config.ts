import {defineConfig} from 'vite';
import {visualizer} from 'rollup-plugin-visualizer';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
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
