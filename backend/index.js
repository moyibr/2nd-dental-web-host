// backend/index.js — Local dev / persistent-host entry point. Starts the
// Express app from app.js with app.listen(). Not used on Vercel — see
// backend/api/index.js for the serverless entry point.
import { app, allowedOrigins } from './app.js';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`[backend] Appointments API listening on port ${PORT} (CORS: ${allowedOrigins.join(', ')})`);
});
