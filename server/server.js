import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";  

dotenv.config({ path: './server/.env' });
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");

const app = express();
app.options("*", cors());
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: "maihph6811@gmail.com", 
    subject: `📩 Tin nhắn từ ${name}`,
    text: `Từ: ${name} (${email})\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "✅ Email đã được gửi thành công!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "❌ Gửi email thất bại!" });
  }
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server đang chạy tại http://localhost:${PORT}`)
);


