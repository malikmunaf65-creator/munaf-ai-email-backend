import dotenv from "dotenv";
dotenv.config();

import sgMail from "@sendgrid/mail";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;

console.log("API KEY EXISTS:", !!SENDGRID_API_KEY);
console.log("FROM EMAIL:", FROM_EMAIL);

if (!SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY is missing from environment variables");
}

if (!SENDGRID_API_KEY.startsWith("SG.")) {
  throw new Error("Invalid SendGrid API key (must start with SG.)");
}

if (!FROM_EMAIL) {
  throw new Error("FROM_EMAIL is missing from environment variables");
}

sgMail.setApiKey(SENDGRID_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
  userEmail,
  userName,
}) {
  try {
    await sgMail.send({
      to,
      from: FROM_EMAIL,
      subject,
      html,
    });

    if (userEmail) {
      await sgMail.send({
        to: userEmail,
        from: FROM_EMAIL,
        subject: "Thanks for contacting Munaf Malik 👋",
        html: `
        <div style="background:#f6f9fc;padding:30px;font-family:Arial,sans-serif">
          <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08)">
            
            <div style="background:linear-gradient(135deg,#6366f1,#0ea5e9);padding:28px;color:white">
              <h2 style="margin:0">Munaf Malik</h2>
              <p style="margin:6px 0 0;font-size:14px;opacity:0.9">
                AI Engineer & Full-Stack Developer
              </p>
            </div>

            <div style="padding:28px;color:#111827;font-size:15px;line-height:1.6">
              <h3 style="margin-top:0">Hi ${userName || "there"} 👋</h3>

              <p>
                Thanks for reaching out through my website. I’ve successfully received your message.
              </p>

              <p>
                I personally review every inquiry and will get back to you within 
                <strong>24 hours</strong>.
              </p>

              <div style="background:#f1f5f9;padding:18px;border-radius:10px;margin:22px 0">
                <strong>What I help clients with:</strong>
                <ul style="margin:10px 0 0;padding-left:18px">
                  <li>Premium business websites</li>
                  <li>AI-powered automations</li>
                  <li>Chatbots & SaaS platforms</li>
                  <li>Custom full-stack systems</li>
                </ul>
              </div>

              <p>If your request is urgent, you can simply reply to this email.</p>

              <p style="margin-top:32px">
                Warm regards,<br/>
                <strong>Munaf Malik</strong><br/>
                <span style="color:#6366f1">munafmalik.site</span>
              </p>
            </div>

            <div style="background:#f8fafc;padding:14px;text-align:center;font-size:12px;color:#6b7280">
              © ${new Date().getFullYear()} Munaf Malik — All rights reserved
            </div>
          </div>
        </div>
        `,
      });
    }

    return { success: true };

  } catch (error) {
    console.error("SENDGRID ERROR:", error.response?.body || error.message);
    throw new Error("Failed to send email");
  }
}
