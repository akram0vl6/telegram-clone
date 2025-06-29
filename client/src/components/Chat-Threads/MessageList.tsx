"use client";
import { fetchMessages } from "@/lib/fetchers";
import { useMessages, useSelectedUser, useUser } from "@/store/userStore";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import React, { useEffect } from "react";
import { shallow } from "zustand/shallow";
import MessageItem from "./MessageItem";
import { socket } from "@/lib/socket";

function MessageList() {
  const sender = useUser((s) => s.myUser);
  const receiver = useSelectedUser((s) => s.selectedUser);

  const { messages, setMessages } = useMessages((s: any) => ({
    messages: s.messages,
    setMessages: s.setMessages,
  }));

  // 1) Загрузить историю один раз при смене собеседника
  useEffect(() => {
    if (sender?._id && receiver?._id) {
      fetchMessages(sender, receiver, setMessages);
    }
  }, [sender, receiver, setMessages]);

  // 2) Слушаем именно те события, которые эмитит сервер
  useEffect(() => {
    if (!sender?._id || !receiver?._id) return;

    // Функция, которая перезагружает историю
    const reloadHistory = () => {
      fetchMessages(sender, receiver, setMessages);
    };

    // Подписываемся на новые события
    socket.on("new-message", reloadHistory);
    socket.on("message-sent", reloadHistory);

    // Отписываемся при размонтировании или изменении зависимостей
    return () => {
      socket.off("new-message", reloadHistory);
      socket.off("message-sent", reloadHistory);
    };
  }, [sender, receiver, setMessages]);

  // Отметить доставку сообщений
  useEffect(() => {
    if (
      !sender?._id ||
      !receiver?._id ||
      !Array.isArray(messages) ||
      messages.length === 0
    )
      return;

    messages.forEach((msg: any) => {
      if (msg.sender !== sender._id && msg.status !== "delivered") {
        socket.emit("message-delivered", msg._id, sender._id, receiver._id);
      }
    }); 
  }, [messages, sender, receiver]);

  useEffect(() => {
    if (
      !sender?._id ||
      !receiver?._id ||
      !Array.isArray(messages) ||
      messages.length === 0
    )
      return;

    messages.forEach((msg: any) => {
      if (msg.sender !== sender._id && msg.status !== "read") {
        socket.emit("message-read", msg._id, sender._id, receiver._id);
      }
    });
  }, [messages, sender, receiver]);

  useEffect(() => {
    const handleStatusUpdate = ({
      messageId,
      status,
    }: {
      messageId: string;
      status: string;
    }) => {
      setMessages((prevMessages: any[]) =>
        prevMessages.map((msg) =>
          msg._id === messageId ? { ...msg, status } : msg
        )
      );
    };

    socket.on("message-status-update", handleStatusUpdate);

    return () => {
      socket.off("message-status-update", handleStatusUpdate);
    };
  }, [setMessages]);

  // console.log(messages);

  return (
    <div
      // ref={parent}
      className="w-full mb-10 flex flex-col max-h-[75vh] overflow-auto no-scrollbar"
    >
      {Array.isArray(messages) && messages.length > 0
        ? messages.map((item: any, i: number) => (
            <MessageItem
              key={i}
              user={sender._id === item.sender}
              message={item.message}
              status={item.status}
            />
          ))
        : null}

    </div>
  );
}

export default MessageList;
