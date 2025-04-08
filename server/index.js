import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });
const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "..")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.post("/send-mail", async (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log(
    "EMAIL_PASS:",
    process.env.EMAIL_PASS ? "Cargado correctamente" : "No definido"
  );
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: "facuvartorelli@gmail.com",
      subject: `${subject} / ${email}`,
      text: message,
    });

    res
      .status(200)
      .send({ message: "Correo enviado", messageId: info.messageId });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    res.status(500).send({ error: "Error al enviar el correo" });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(
    `Servidor funcionando en http://0.0.0.0:${port} - http://localhost:10000`
  );
});
