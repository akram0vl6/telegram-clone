"use client";

import React, { FC } from "react";
import { IUser } from "@/types";
import Setting from "./setting";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useRouter } from "next/navigation";
import { useCurrentContact } from '@/hooks/use-current';

import { set } from "zod/v4";
import { log } from "console";
import { cn } from "@/lib/utils";

interface ChatListProps {
  contact: IUser[];
}

const ChatList: FC<ChatListProps> = ({ contact }) => {
  const route = useRouter();
  const { currentContact, setCurrentContact } = useCurrentContact();

  const renderContacts = (contact: IUser) => {
  const isSelected = currentContact?._id === contact._id;
  const onChat = () => {
    if (!isSelected) {
      setCurrentContact(contact);
      console.log("Selected contact:", contact.email);
    }
    route.push(`/?chat/${contact._id}`);
  };

    return (
      <div
        className={cn(
					'flex justify-between items-center cursor-pointer hover:bg-secondary/50 md:p-2',
					currentContact?._id === contact._id && 'bg-secondary/50'
				)}
        onClick={onChat}
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <Avatar className="z-40">
              <AvatarImage
                src={contact.avatar}
                alt={contact.email}
                className="object-cover"
              />
              <AvatarFallback className="uppercase">
                {contact.email[0]}
              </AvatarFallback>
            </Avatar>
            <div className="size-3 bg-green-500 absolute rounded-full bottom-0 right-0 !z-40" />
          </div>
          <div>
            <h2 className="capitalize line-clamp-1 text-sm">
              {contact.email.split("@")[0]}
            </h2>
            <p className="text-xs line-clamp-1 text-muted-foreground">
              No message
            </p>
            {/* {contact.lastMessage?.image && (
							<div className='flex items-center gap-1'>
								<Image src={contact.lastMessage.image} alt={contact.email} width={20} height={20} className='object-cover' />
								<p
									className={cn(
										'text-xs line-clamp-1',
										contact.lastMessage
											? contact.lastMessage?.sender._id === session?.currentUser?._id
												? 'text-muted-foreground'
												: contact.lastMessage.status !== CONST.READ
												? 'text-foreground'
												: 'text-muted-foreground'
											: 'text-muted-foreground'
									)}
								>
									Photo
								</p>
							</div>
						)} */}
          </div>
        </div>

        <div className="self-end">
          <p className="text-xs text-muted-foreground">19:20 pm</p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center bg-background pl-2 sticky top-0">
        <Setting />
        <div className="m-2 w-full">
          <Input className="bg-secondary" type="text" placeholder="Search" />
        </div>
      </div>

      {contact.length === 0 && (
        <div className="w-full h-[95vh] flex justify-center items-center text-center text-muted-foreground">
          <div>
            <h1 className="text-2xl font-semibold">No Contacts</h1>
            <p className="text-sm">You can add contacts to start chatting.</p>
          </div>
        </div>
      )}
      {contact.map((item) => (
        <div key={item._id}>{renderContacts(item)}</div>
      ))}
    </div>
  );
};

export default ChatList;
