import express from "express";
import "dotenv/config";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router/router";
import { Server } from "socket.io";
import { User } from "./userModel";
import jwt from "jsonwebtoken";

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI!);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to mongodb");
  server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// 🟢 Добавляем Map для онлайн-пользователей
const onlineUsers = new Map<string, Set<string>>();

async function updateMessageStatus(userId: string, messageId: string, newStatus: string) {
  await User.updateOne(
    { _id: userId, "messages._id": messageId },
    { $set: { "messages.$.status": newStatus } }
  );
}

io.on("connection", (socket) => {
  // 🔷 Авторизация пользователя через сокет
  socket.on("identify", (token: string) => {
    try {
      const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
      const userId = decoded.id || decoded._id;
      socket.join(userId);

      // Добавляем сокет в onlineUsers
      if (!onlineUsers.has(userId)) {
        onlineUsers.set(userId, new Set());
      }
      onlineUsers.get(userId)!.add(socket.id);

      console.log(`🔵 ${userId} is now online`);
    } catch (err) {
      console.warn("Invalid identify token", err);
    }
  });

  // 🔷 Запрос онлайн-контактов
  socket.on("get-online-contacts", async (token: string) => {
    try {
      const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
      const userId = decoded.id || decoded._id;
      const user = await User.findById(userId).populate("connections");

      if (!user) return;

      const onlineContacts = user.connections
        .filter((contact: any) => onlineUsers.has(contact._id.toString()))
        .map((contact: any) => ({
          _id: contact._id,
          username: contact.username,
          email: contact.email,
        }));

      socket.emit("online-contacts", onlineContacts);
    } catch (err) {
      console.error("get-online-contacts error:", err);
    }
  });

  // 🔷 Обработка отключения сокета
  socket.on("disconnect", () => {
    for (const [userId, sockets] of onlineUsers.entries()) {
      sockets.delete(socket.id);
      if (sockets.size === 0) {
        onlineUsers.delete(userId);
        console.log(`🔴 ${userId} is now offline`);
      }
    }
  });

  // 🔷 Отправка личного сообщения
  socket.on(
    "private message",
    async (toEmail: string, text: string, token: string) => {
      try {
        const decoded: any = jwt.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET!
        );
        const senderId = decoded.id || decoded._id;
        const sender = await User.findById(senderId);
        if (!sender) return;

        const recipient = await User.findOne({ email: toEmail });
        if (!recipient) return;

        if (!sender.connections.includes(recipient._id)) {
          sender.connections.push(recipient._id);
        }
        if (!recipient.connections.includes(sender._id)) {
          recipient.connections.push(sender._id);
        }

        const msg: any = {
          _id: new mongoose.Types.ObjectId(),
          message: text,
          sender: sender._id,
          reciver: recipient._id,
          time: new Date(),
          status: "sent",
        };

        sender.messages.push(msg);
        recipient.messages.push(msg);

        await sender.save();
        await recipient.save();

        io.to(senderId).emit("message-sent", msg);
        io.to(recipient._id.toString()).emit("new-message", msg);
      } catch (err) {
        console.error("Error on private message:", err);
      }
    }
  );

  socket.on("message-delivered", async (messageId, senderId, receiverId) => {
    try {
      // Обновляем статус в отправителе
      await updateMessageStatus(senderId, messageId, "delivered");
      // Обновляем статус в получателе
      await updateMessageStatus(receiverId, messageId, "delivered");

      // Оповещаем пользователей
      io.to(senderId).emit("message-status-update", {
        messageId,
        status: "delivered",
      });
      io.to(receiverId).emit("message-status-update", {
        messageId,
        status: "delivered",
      });
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("message-read", async (messageId, senderId, receiverId) => {
    try {
      await updateMessageStatus(senderId, messageId, "read");
      await updateMessageStatus(receiverId, messageId, "read");

      io.to(senderId).emit("message-status-update", {
        messageId,
        status: "read",
      });
      io.to(receiverId).emit("message-status-update", {
        messageId,
        status: "read",
      });
    } catch (err) {
      console.error(err);
    }
  });
});

app.use("/", router);
