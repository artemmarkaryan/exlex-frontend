import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SRC_DIR = path.join(__dirname, 'src');
const ENV_DIR = path.join(__dirname, 'env');

export default defineConfig({
    plugins: [react()],
    root: 'src',
    envDir: ENV_DIR,
    resolve: {
        alias: {
            '@': SRC_DIR,
        },
    },
    server: {
        port: 8080,
    },
    build: {
        outDir: '../dist',
    },
});
