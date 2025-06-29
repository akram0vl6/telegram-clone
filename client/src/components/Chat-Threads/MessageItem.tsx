import React from "react";

interface MessageItemProps {
  user?: boolean;
  message?: string;
  status?: "sent" | "delivered" | "read";
}

function MessageItem({ user, message, status }: MessageItemProps) {
  // Иконки галочек, можно заменить на свои svg или иконки из библиотеки
  const renderStatusIcon = () => {
    switch (status) {
      case "sent":
        return <span style={{ color: "gray" }}>✓</span>; // одна галочка
      case "delivered":
        return (
          <span style={{ color: "gray" }}>
            ✓✓
          </span>
        ); // две серые галочки
      case "read":
        return (
          <span style={{ color: "blue" }}>
            ✓✓
          </span>
        ); // две синие галочки
      default:
        return null;
    }
  };

  return (
    <div className={`chat ${user ? "chat-end" : "chat-start"}`}>
      <div className={`flex gap-2 chat-bubble ${user ? "chat-bubble" : "chat-bubble-primary"}`}>
        {message}
        {/* Показываем статус только если сообщение своё */}
        {user && <div style={{ fontSize: 10, marginTop: 12 }} className="text-end">{renderStatusIcon()}</div>}
      </div>
    </div>
  );
}

export default MessageItem;
