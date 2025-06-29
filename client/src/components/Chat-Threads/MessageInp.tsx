"use client";
import { socket } from "@/lib/socket";
import { useSelectedUser } from "@/store/userStore";
import { SendMsIcon, SmileFaceIcon } from "@/utils/icons";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { io, Socket } from "socket.io-client";

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

function MessageInp() {
  const [inpValue, setInpValue] = useState<string>("");
  const [showEmojies, setShowEmojies] = useState<boolean>(false);
  const selectedUser = useSelectedUser((s) => s.selectedUser);
  const [cookie] = useCookies(["user"]);

  // Создаём ref для аудио
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Идентифицируем сокет один раз
    if (cookie.user) {
      socket.emit("identify", cookie.user);
    }
  }, [cookie.user]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedUser || !inpValue.trim()) return;

    // Эмитим сообщение
    socket.emit("private message", selectedUser.email, inpValue, cookie.user);

    // Воспроизводим звук
    audioRef.current?.play().catch(console.error);

    setInpValue("");
  }

  function onEmojiClick(emojiObject: { emoji: string }) {
    setInpValue((pre) => pre + emojiObject.emoji);
  }

  return (
    <div>
      <audio ref={audioRef} src="/telegram_soundin.mp3" preload="auto" />
      <form className="mt-auto relative" onSubmit={handleSubmit}>
        <div className="w-full relative">
          <input
            type="text"
            placeholder="Message"
            className="input w-full pl-14 input-bordered"
            onChange={(e) => setInpValue(e.target.value)}
            value={inpValue}
          />
        </div>
        <button
          type="button"
          onClick={() => setShowEmojies(!showEmojies)}
          className="absolute top-1/2 left-5 -translate-y-1/2"
        >
          <SmileFaceIcon />
        </button>
        {showEmojies && (
          <div className="absolute bottom-full">
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        )}
        <button
          type="submit"
          className="absolute top-1/2 right-5 -translate-y-1/2"
        >
          <SendMsIcon />
        </button>
      </form>
    </div>
  );
}

export default MessageInp;
