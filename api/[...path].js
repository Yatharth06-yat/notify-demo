import { handleApiRequest } from "./_lib/router.js";

/**
 * Vercel Serverless Function covering every `/api/*` route.
 *
 * One function rather than a file per endpoint: it keeps a single warm
 * Postgres pool instead of one per route, and it stays within the function
 * count on Vercel's Hobby plan.
 *
 * The same `handleApiRequest` is mounted as Vite dev-server middleware in
 * vite.config.js, so `npm run dev` and production run identical code.
 */
export default function handler(req, res) {
  return handleApiRequest(req, res);
}

export const config = {
  api: {
    // The router reads and validates raw bodies itself — image uploads must
    // not be run through Vercel's JSON body parser.
    bodyParser: false,
  },
};
