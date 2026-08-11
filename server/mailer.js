// mailer — Sends the clinic a notification email for each valid appointment
// request. Falls back to a safe, no-PII console notice when SMTP env vars
// aren't set, so the form works out of the box in local development without
// real credentials.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.resolve(__dirname, '../config/clinic.config.json');
const clinicConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const smtpConfigured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

const transporter = smtpConfigured
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
    : null;

const notifyEmail = process.env.NOTIFY_EMAIL || clinicConfig.contact?.email;
const fromAddress = process.env.SMTP_FROM || `Website Booking <no-reply@${clinicConfig.seo?.siteUrl?.replace(/^https?:\/\//, '') || 'example.com'}>`;

/**
 * @param {{fullName: string, email: string, phone: string, date: string, time: string, service: string, message: string}} appointment
 *   Already validated + escaped by middleware/validate.js.
 */
export async function sendAppointmentNotification(appointment) {
    const subject = `New Appointment Request — ${appointment.fullName} (${appointment.service})`;
    const text = [
        `New appointment request from the ${clinicConfig.business.name} website:`,
        '',
        `Name:    ${appointment.fullName}`,
        `Email:   ${appointment.email}`,
        `Phone:   ${appointment.phone}`,
        `Service: ${appointment.service}`,
        `Date:    ${appointment.date}`,
        `Time:    ${appointment.time}`,
        appointment.message ? `\nMessage:\n${appointment.message}` : '',
    ].join('\n');

    if (!transporter) {
        // eslint-disable-next-line no-console
        console.log(`[mailer] SMTP not configured — skipping send. Would have emailed ${notifyEmail || '(no NOTIFY_EMAIL/contact.email set)'}. (id omitted, no PII logged)`);
        return { delivered: false, reason: 'smtp-not-configured' };
    }

    if (!notifyEmail) {
        throw new Error('No NOTIFY_EMAIL configured and no contact.email in clinic.config.json — cannot send.');
    }

    await transporter.sendMail({ from: fromAddress, to: notifyEmail, replyTo: appointment.email, subject, text });
    return { delivered: true };
}
