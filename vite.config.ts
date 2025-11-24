import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // Enable more aggressive optimization
        target: 'esnext',
        minify: 'esbuild', // Use esbuild instead of terser
        rollupOptions: {
          output: {
            // Better chunk splitting strategy
            manualChunks: (id) => {
              // React ecosystem
              if (id.includes('react') || id.includes('react-dom')) {
                return 'react-vendor';
              }
              // Router
              if (id.includes('react-router')) {
                return 'router';
              }
              // Animation library
              if (id.includes('framer-motion')) {
                return 'animation';
              }
              // Icons
              if (id.includes('lucide-react')) {
                return 'icons';
              }
              // Success stories - lazy load this
              if (id.includes('successStories')) {
                return 'stories';
              }
              // UI components and pages
              if (id.includes('/pages/') || id.includes('/components/')) {
                return 'ui';
              }
              // Constants
              if (id.includes('/constants/')) {
                return 'constants';
              }
              // Utils
              if (id.includes('/utils/')) {
                return 'utils';
              }
              // Other vendor
              if (id.includes('node_modules')) {
                return 'vendor';
              }
            },
            // Optimize chunk naming
            chunkFileNames: (chunkInfo) => {
              const facadeModuleId = chunkInfo.facadeModuleId
                ? chunkInfo.facadeModuleId.split('/').pop()?.replace(/\.[^.]*$/, '')
                : 'chunk';
              return `js/[name]-[hash].js`;
            },
            assetFileNames: (assetInfo) => {
              const info = assetInfo.name?.split('.') || [];
              const ext = info[info.length - 1] || '';
              if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name || '')) {
                return `media/[name]-[hash][extname]`;
              }
              if (/\.(png|jpe?g|gif|svg|webp|avif)(\?.*)?$/i.test(assetInfo.name || '')) {
                return `images/[name]-[hash][extname]`;
              }
              if (/\.css(\?.*)?$/i.test(assetInfo.name || '')) {
                return `css/[name]-[hash][extname]`;
              }
              return `assets/[name]-[hash][extname]`;
            },
          },
        },
        // Optimize chunk size
        chunkSizeWarningLimit: 1000,
        // Enable CSS code splitting
        cssCodeSplit: true,
        // Generate source maps for debugging
        sourcemap: mode === 'development',
      },
      // Optimize dependencies
      optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom', 'lucide-react', 'framer-motion'],
        exclude: [],
      },
      // Enable experimental features for better performance
      experimental: {
        renderBuiltUrl(filename, { hostType }) {
          if (hostType === 'js') {
            return { js: `/${filename}` };
          } else {
            return { relative: true };
          }
        },
      },
    };
});
