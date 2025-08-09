import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: '/webinar_gratuito_2.0/',
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      // Questo alias era già corretto
      "@": path.resolve(import.meta.dirname, "client", "src"),
      // MODIFICA: Aggiunto l'alias mancante per la cartella "shared".
      // Questo risolverà l'errore di build.
      "@shared": path.resolve(import.meta.dirname, "shared"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
