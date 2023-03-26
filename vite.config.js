import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    root: 'src',
    resolve: {
        alias: {
            '@': './',
        },
    },
    server: {
        port: 8080,
    },
    build: {
        outDir: '../dist',
    },
});