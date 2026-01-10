import dotenv from "dotenv";
dotenv.config(); // MUST be first

import express from "express";
import cors from "cors";
import { sendEmail } from "./services/emailService.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Munaf AI Email Backend Running 🚀");
});

// Manual test route (admin email only)
app.get("/test-email", async (req, res) => {
  try {
    await sendEmail({
      to: "malikmunaf65@gmail.com",
      subject: "🚀 Test Email from Munaf AI Backend",
      html: `
        <h2>Success!</h2>
        <p>Your SendGrid email system is working perfectly.</p>
      `,
      userEmail: "malikmunaf65@gmail.com",
      userName: "Munaf",
    });

    res.send("Test email sent successfully ✅");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send test email ❌");
  }
});

// ✅ MAIN ROUTE (this connects your website form)
app.post("/send-email", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    await sendEmail({
      to: "malikmunaf65@gmail.com",
      subject: `📩 New Lead from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || "Not provided"}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
      userEmail: email,   // 👈 THIS enables auto-reply
      userName: name      // 👈 This personalizes auto-reply
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Send email error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
