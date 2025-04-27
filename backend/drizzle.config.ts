import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "src/models",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_CONNECTION!,
    ssl: "prefer",
  },
});
