import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../backend/app/build', // Output to FastAPI's expected directory
    assetsDir: 'static', // Place assets in 'static' folder
  },
});