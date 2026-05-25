import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import fs from 'fs';

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'save-content-api',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/api/save-content' && req.method === 'POST') {
              let body = '';
              req.on('data', chunk => {
                body += chunk;
              });
              req.on('end', () => {
                try {
                  const data = JSON.parse(body);
                  const contentPath = path.resolve(__dirname, 'src/data-editable.json');
                  fs.writeFileSync(contentPath, JSON.stringify(data, null, 2), 'utf-8');
                  res.writeHead(200, { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                  });
                  res.end(JSON.stringify({ success: true }));
                } catch (err: any) {
                  res.writeHead(500, { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                  });
                  res.end(JSON.stringify({ error: err.message }));
                }
              });
            } else {
              next();
            }
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    appType: 'spa',
  };
});
