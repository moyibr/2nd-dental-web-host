// rateLimit — Per-IP limit on the appointments endpoint to blunt spam/abuse.
import rateLimit from 'express-rate-limit';

const windowMinutes = Number(process.env.RATE_LIMIT_WINDOW_MINUTES) || 10;
const max = Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 5;

export const appointmentsRateLimit = rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { ok: false, message: 'Too many requests. Please try again later or call us directly.' },
});
