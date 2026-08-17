// backend/api/index.js — Vercel serverless entry point. An Express app
// instance is itself a valid (req, res) request handler, so exporting it
// directly is all Vercel's Node.js runtime needs — no app.listen() here.
// vercel.json rewrites every incoming path to this one function; Express's
// own router (in app.js) still dispatches /health and /api/appointments
// from the original request path.
import { app } from '../app.js';

export default app;
