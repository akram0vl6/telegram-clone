"use client";
import { useOnlineContacts, useSelectedUser } from "@/store/userStore";
import { userProps } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function ChatItem({ user, isOnline }: { user: userProps; isOnline: boolean }) {
  //     const [online, setOnline] = useState(false)
  //   const { onlineUsers, setOnlineUsers } = useOnlineContacts();

  const setSelectedUser = useSelectedUser((state) => state.setSelectedUser);
  function handleClick(e: any) {
    document.querySelector(".messages")?.classList.remove("hidden");
    document.querySelector(".messages")?.classList.add("flex");
    document.querySelector(".sidebar")?.classList.add("hidden");
    document.querySelector(".selected-user")?.classList.remove("selected-user");
    e.currentTarget.classList.add("selected-user");
    setSelectedUser(user);
  }

  //   console.log(onlineUsers);
  //   console.log(user);

  //   useEffect(() => {
  //     if (onlineUsers._id ==) {

  //     }
  //   }, [])

  return (
    <>
      <li
        onClick={handleClick}
        className="flex gap-3 cursor-pointer hover:bg-slate-300 p-5 rounded-lg"
      >
        <div className="avatar">
          <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <Image
              src={`https://robohash.org/${user?.imageId}.png` || ""}
              width={256}
              height={256}
              alt="avatar"
            />
            <span
              className={`${
                isOnline &&
                `absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white`
              }`}
            ></span>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <h3 className="font-semibold text-black text-lg">{user?.name}</h3>
          {isOnline ? (
            <p className="text-[#36d399]">online</p>
          ) : (
            <p className="text-[#707991]">offline</p>
          )}
        </div>
      </li>
      <div className="divider my-0"></div>
    </>
  );
}

export default ChatItem;
