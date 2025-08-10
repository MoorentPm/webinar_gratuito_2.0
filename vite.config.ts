import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  // Questa riga è corretta per GitHub Pages
  base: "/webinar_gratuito_2.0/", 
  
  plugins: [
    react(),
    // Rimosse le parti relative a Replit che causavano l'errore
  ],
  
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  
  root: path.resolve(import.meta.dirname, "client"),
  
  build: {
    // Questa riga è corretta per la tua struttura
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
