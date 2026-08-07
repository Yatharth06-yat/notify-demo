import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Serve the `/api` routes from the dev server.
 *
 * In production these run as a Vercel Serverless Function (api/[...path].js);
 * here the very same handler is mounted as middleware, so `npm run dev` talks
 * to a real Postgres database and there is no second server to start. The
 * module is loaded through Vite's SSR pipeline on each request, so edits under
 * api/ take effect without restarting.
 */
function apiPlugin() {
  return {
    name: "iotify-api",
    apply: "serve",
    configureServer(server) {
      // Connect strips the "/api" prefix from req.url here; the router copes
      // with the path arriving either way.
      server.middlewares.use("/api", async (req, res, next) => {
        try {
          const { handleApiRequest } = await server.ssrLoadModule("/api/_lib/router.js");
          await handleApiRequest(req, res);
        } catch (error) {
          next(error);
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // DATABASE_URL and JWT_SECRET have no VITE_ prefix, so Vite deliberately
  // keeps them out of the client bundle — and out of process.env. The API
  // middleware above runs in Node and needs them.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  return {
    plugins: [react(), apiPlugin()],
  };
});
