import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      host: env.VITE_SERVER_HOST || "localhost",
      port: parseInt(env.VITE_SERVER_PORT) || 8082,
      strictPort: true, // Fail if port is already in use
      open: false, // Don't auto-open browser
    },
    plugins: [
      react(),
      mode === "development" && componentTagger()
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Ensure clean build
    build: {
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: mode === "development",
    },
    // Environment variables
    define: {
      __DEV__: mode === "development",
    },
  };
});
