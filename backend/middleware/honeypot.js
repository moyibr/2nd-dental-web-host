// honeypot — Silent spam trap. Real users never see or fill the `website`
// field (see src/components/AppointmentForm.jsx). Bots that fill every
// input on the page populate it, so we respond as if the submission
// succeeded and simply never process it further — no error message that
// would tip a bot off to retry differently.
export function honeypot(req, res, next) {
    if (typeof req.body?.website === 'string' && req.body.website.trim() !== '') {
        return res.status(200).json({ ok: true });
    }
    next();
}
