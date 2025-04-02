import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import Sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: "https://vsaarchitect.com",
      routes: [
        "/",
        "/about",
        "/projects",
        "/projects/:id", // Dynamic routes
        "/contact",
      ],
    }),
  ],
});