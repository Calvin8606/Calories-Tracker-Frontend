import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "src",
  server: {
    port: 3000, // Default: 3000
    open: true, // Automatically open the browser
  },
});
