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

// Manual test route (sends test email)
app.get("/test-email", async (req, res) => {
  try {
    await sendEmail({
      to: "malikmunaf65@gmail.com",
      subject: "🚀 Test Email from Munaf AI Backend",
      html: `
        <h2>Success!</h2>
        <p>Your SendGrid email system is working perfectly.</p>
      `,
    });

    res.send("Test email sent successfully ✅");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send test email ❌");
  }
});

// ✅ MAIN API ROUTE (THIS FIXES YOUR ISSUE)
app.post("/send-email", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await sendEmail({
      to: "malikmunaf65@gmail.com",
      subject: `New message from ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Send email error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Render port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
