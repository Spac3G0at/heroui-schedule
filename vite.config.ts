import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const resolvePath = (p: string) => path.resolve(__dirname, p);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolvePath("./src"),
      "@components": resolvePath("./src/components"),
      "@features": resolvePath("./src/features"),
      "@utils": resolvePath("./src/lib/utils"),
      "@constants": resolvePath("./src/lib/constants"),
      "@lib": resolvePath("./src/lib"),
    },
  },
});
