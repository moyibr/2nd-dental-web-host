// routes/appointments.js — POST /api/appointments
// Pipeline: rate-limit -> honeypot -> validate -> send. Least privilege: this
// router does nothing else — no reads, no other data exposed.
import { Router } from 'express';
import { appointmentsRateLimit } from '../middleware/rateLimit.js';
import { honeypot } from '../middleware/honeypot.js';
import { validateAppointment } from '../middleware/validate.js';
import { sendAppointmentNotification } from '../mailer.js';

export const appointmentsRouter = Router();

appointmentsRouter.post('/', appointmentsRateLimit, honeypot, validateAppointment, async (req, res) => {
    try {
        await sendAppointmentNotification(req.appointment);
        // Never log the raw appointment payload (name/email/phone/message = PII).
        // eslint-disable-next-line no-console
        console.log('[appointments] New appointment request received and processed.');
        res.status(200).json({ ok: true, message: 'Appointment request received.' });
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('[appointments] Failed to process appointment request:', err.message);
        res.status(502).json({ ok: false, message: 'Could not send your request right now. Please call us instead.' });
    }
});
