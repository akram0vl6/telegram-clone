"use client";

import { FaTelegram } from "react-icons/fa";
import StateAuth from "./_component/state";
import Social from "./_component/social";
import { ModeToggle } from "@/components/shared/modeToggle";

const page = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="max-w-md w-full flex flex-col items-center space-y-4">
        <FaTelegram size={120} className="text-blue-500" />
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold">Telegram</h1>
          <ModeToggle />
        </div> 

        <StateAuth />
        <Social />
      </div>
    </div>
  );
};

export default page;
