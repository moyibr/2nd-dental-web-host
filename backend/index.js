// backend/index.js — Minimal, least-privilege Express API for the appointment
// form. Exposes exactly two routes: GET /health and POST /api/appointments.
// Nothing else — no data reads, no admin routes, no persistence.
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { appointmentsRouter } from './routes/appointments.js';

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

app.use(cors({
    origin(origin, callback) {
        // Allow same-origin/non-browser requests (no Origin header) and configured origins only.
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
        callback(new Error('Not allowed by CORS'));
    },
}));

// Small body limit — appointment payloads are tiny; this blocks oversized abuse payloads.
app.use(express.json({ limit: '10kb' }));

app.get('/health', (_req, res) => res.status(200).json({ ok: true }));

app.use('/api/appointments', appointmentsRouter);

// Generic error handler — never leak stack traces or internals to the client.
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({ ok: false, message: 'Forbidden.' });
    }
    // eslint-disable-next-line no-console
    console.error('[backend] Unhandled error:', err.message);
    res.status(500).json({ ok: false, message: 'Something went wrong.' });
});

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`[backend] Appointments API listening on port ${PORT} (CORS: ${allowedOrigins.join(', ')})`);
});
