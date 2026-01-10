import dotenv from "dotenv";
dotenv.config(); // MUST be first

import express from "express";
import cors from "cors";
import { sendEmail } from "./services/emailService.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Munaf AI Email Backend Running 🚀");
});

app.get("/test-email", async (req, res) => {
  try {
    await sendEmail({
      to: "malikmunaf65@gmail.com",
      subject: "🎉 Test Email from Munaf AI Backend",
      html: "<h2>Success!</h2><p>Your SendGrid email setup is working perfectly.</p>",
    });

    res.send("Test email sent successfully ✅");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email ❌");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
