import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    fileParallelism: false,
    clearMocks: true,
    reporters: [process.env.CI ? "github-actions" : "basic"],
    coverage: {
      exclude: [...coverageConfigDefaults.exclude, "src/index.ts", "src/models/*.ts"],
      enabled: true,
      provider: "istanbul",
      reporter: ["text"],
      thresholds: {
        functions: 80,
        branches: 80,
      },
    },
  },
});
