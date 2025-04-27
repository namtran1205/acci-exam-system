import { fileURLToPath } from "node:url";
import { configDefaults, coverageConfigDefaults, defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      css: true,
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/**"],
      root: fileURLToPath(new URL("./", import.meta.url)),
      coverage: {
        enabled: true,
        provider: "istanbul",
        exclude: [...coverageConfigDefaults.exclude],
      },
    },
  }),
);
