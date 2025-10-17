import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite configuration for the project.
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  /**
   * Configuration for the Vite development server.
   */
  server: {
    /**
     * The port to run the development server on.
     */
    port: 3000,
    /**
     * The host to listen on. '0.0.0.0' makes the server accessible
     * on the local network.
     */
    host: '0.0.0.0',
  },
  /**
   * List of Vite plugins to use.
   */
  plugins: [
    /**
     * Enables React support in Vite.
     * @see https://github.com/vitejs/vite-plugin-react
     */
    react()
  ],
  /**
   * Configuration for module resolution.
   */
  resolve: {
    /**
     * Path aliases for cleaner imports.
     */
    alias: {
      /**
       * Alias for the root directory.
       * Allows imports like `import Component from '@/components/Component.tsx'`
       */
      '@': path.resolve(__dirname, '.'),
    }
  }
});
