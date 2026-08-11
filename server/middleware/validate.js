// validate — Server-side validation & sanitization for POST /api/appointments.
// Never trust the client: this re-checks everything the frontend already
// validated, independently. The `service` field is checked against an
// allow-list read straight from ../config/clinic.config.json, so it can
// never carry arbitrary/injected text — only one of the clinic's own
// configured service names.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import validator from 'validator';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.resolve(__dirname, '../../config/clinic.config.json');
const clinicConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const ALLOWED_SERVICES = new Set((clinicConfig.services || []).map((s) => s.title));

const NAME_PATTERN = /^[\p{L}\s.'-]{2,80}$/u;
const PHONE_PATTERN = /^[+]?[\d\s()-]{7,15}$/;
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

function todayISO() {
    return new Date().toISOString().slice(0, 10);
}

export function validateAppointment(req, res, next) {
    const body = req.body || {};
    const errors = {};

    const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
    if (!NAME_PATTERN.test(fullName)) {
        errors.fullName = 'Enter a valid full name (2–80 characters, letters only).';
    }

    const email = typeof body.email === 'string' ? body.email.trim() : '';
    if (!validator.isEmail(email)) {
        errors.email = 'Enter a valid email address.';
    }

    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    if (!PHONE_PATTERN.test(phone)) {
        errors.phone = 'Enter a valid phone number.';
    }

    const date = typeof body.date === 'string' ? body.date.trim() : '';
    if (!validator.isISO8601(date, { strict: true }) || date < todayISO()) {
        errors.date = 'Choose a valid, future appointment date.';
    }

    const time = typeof body.time === 'string' ? body.time.trim() : '';
    if (!TIME_PATTERN.test(time)) {
        errors.time = 'Choose a valid appointment time.';
    }

    const service = typeof body.service === 'string' ? body.service.trim() : '';
    if (!ALLOWED_SERVICES.has(service)) {
        errors.service = 'Choose a service from the list.';
    }

    const messageRaw = typeof body.message === 'string' ? body.message.trim() : '';
    if (messageRaw.length > 500) {
        errors.message = 'Message is too long (max 500 characters).';
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ ok: false, message: 'Please correct the highlighted fields.', errors });
    }

    // Escape before this ever reaches an email body / any future storage — defense in depth
    // even though the current mailer only sends plain text.
    req.appointment = {
        fullName: validator.escape(fullName),
        email: validator.normalizeEmail(email) || email,
        phone: validator.escape(phone),
        date,
        time,
        service: validator.escape(service),
        message: validator.escape(messageRaw),
    };

    next();
}
