import { Request, Response, } from "express";

import { User } from "../userModel";
const jwt = require("jsonwebtoken");

class UserController {
  async connections(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;

      const currentUser = await User.findById(userId).populate("connections");

      if (!currentUser) {
        return res.status(404).json({ message: "User connections not found" });
      }

      // Вернуть список контактов (connections)
      res.json(currentUser.connections || []);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (err) {
      console.log(err);
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const data = jwt.verify(
        req.headers.authorization,
        process.env.ACCESS_TOKEN_SECRET
      );
      const user = await User.find({ email: data?.email });
      res.send(user);
    } catch (err) {
      console.log(err);
    }
  }

  async getMessages(req: Request, res: Response) {
    const { senderId, reciverId } = req.query as {
      senderId: string;
      reciverId: string;
    };

    // Находим отправителя
    const senderUser = await User.findById(senderId);
    if (!senderUser) {
      return res.status(404).json({ message: "Sender not found" });
    }

    // Фильтруем его сообщения по диалогу с reciverId
    const conversation = senderUser.messages
      .filter((msg: any) => {
        const s = msg.sender.toString();
        const r = msg.reciver?.toString() || msg.reciver; // с учётом опечатки
        return (
          (s === senderId && r === reciverId) ||
          (s === reciverId && r === senderId)
        );
      })
      .sort((a: any, b: any) => a.time.getTime() - b.time.getTime());

    res.json(conversation);
  }
}

export default new UserController();
