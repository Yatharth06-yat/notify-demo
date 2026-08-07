/**
 * Load `.env` into process.env for the standalone CLI scripts.
 * Vite does this itself for `npm run dev`; plain `node scripts/…` does not.
 */
export function loadDotEnv() {
  try {
    process.loadEnvFile(new URL("../.env", import.meta.url).pathname);
  } catch {
    // No .env file — the variables may already be set in the environment.
  }
}
