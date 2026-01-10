import dotenv from "dotenv";
dotenv.config(); // 

import sgMail from "@sendgrid/mail";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;

if (!SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY is missing from .env");
}

if (!SENDGRID_API_KEY.startsWith("SG.")) {
  throw new Error("Invalid SendGrid API key (must start with SG.)");
}

sgMail.setApiKey(SENDGRID_API_KEY);

export async function sendEmail({ to, subject, html }) {
  await sgMail.send({
    to,
    from: FROM_EMAIL,
    subject,
    html,
  });
}
