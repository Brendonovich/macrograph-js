import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import tsconfigPaths from "vite-tsconfig-paths";
import commonJsExternals from "vite-plugin-commonjs-externals";
import { builtins } from "./config/externals";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    tsconfigPaths(),
    commonJsExternals({
      externals: builtins,
    }),
  ],
});
