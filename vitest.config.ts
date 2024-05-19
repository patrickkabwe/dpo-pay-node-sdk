import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  root: ".",
  esbuild: {
    tsconfigRaw: "{}",
  },
  test: {
    clearMocks: true,
    globals: true,
    env: {
      DPO_PAYMENT_URL: "https://secure.3gdirectpay.com/payv3.php",
    },
    exclude: ["node_modules", "lib", "examples"],
    coverage: {
      exclude: ["node_modules", "lib", "examples"],
    },
  },
  resolve: {
    alias: [{ find: "~", replacement: resolve(__dirname, "src") }],
  },
});
