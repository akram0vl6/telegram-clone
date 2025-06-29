import { Request, Response, } from "express";
const jwt = require("jsonwebtoken");  
import "dotenv/config";
import nodemailer from "nodemailer";
import { User } from "../userModel";

const otpStore = new Map<string, { code: string; expires: number }>();

class AuthController {
  async sendOtp(req: Request, res: Response) {
    try {
      const { name, email, imageId } = req.body;

      if (!email) return res.status(400).json({ message: "Email is required" });

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expires = Date.now() + 5 * 60 * 1000; // 5 минут

      otpStore.set(email, { code: otp, expires });

      console.log(otp);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      try {
        await transporter.sendMail({
          from: `"Chatgram" <${process.env.MAIL_USER}>`,
          to: email,
          subject: "Ваш код подтверждения",
          text: `Здравствуйте, ${
            name || "пользователь"
          }! Ваш код подтверждения: ${otp}`,
        });

        res.json({ message: "OTP отправлен на email" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при отправке OTP" });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async verify(req: Request, res: Response) {
    const { name, email, imageId, code } = req.body;

    const record = otpStore.get(email);

    if (!record || record.code !== code || Date.now() > record.expires) {
      return res.status(401).json({ message: "Неверный или просроченный код" });
    }

    otpStore.delete(email); // очищаем после успешной проверки

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, imageId });
      await user.save();
    }

    const accessToken = jwt.sign(
      user.toObject(),
      process.env.ACCESS_TOKEN_SECRET!
    );
    res.setHeader("Set-Cookie", `user=${accessToken}; Path=/`);
    res.json({ message: "Авторизация прошла успешно", token: accessToken });
  }
}

export default new AuthController();
