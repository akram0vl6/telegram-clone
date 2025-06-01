"use client";

import { Loader2 } from "lucide-react";
import ChatsList from "./_components/chat-list";
import { email } from "zod/v4";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddContact from "./_components/add-contact";
import { useCurrentContact } from "@/hooks/use-current";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, messageSchema } from "@/lib/validation";
import { z } from "zod";
import TopChat from "./_components/top-chat";
import Chat from "./_components/chat";
import { text } from "stream/consumers";
import { fi } from "zod/v4/locales";

export default function Home() {
  const { currentContact, setCurrentContact } = useCurrentContact();
  const route = useRouter();

  const contactForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const messageForm = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      text: "",
      image: "",
    },
  });

  useEffect(() => {
    route.replace("/");
    setCurrentContact(null);
  }, []);

  const onCreateContact = (values: z.infer<typeof messageSchema>) => {
    console.log(values);
  };

  const onSendMessage = (values: z.infer<typeof messageSchema>) => {
    console.log(values);
  };

  return (
    <div>
      {/* Sidebar */}
      <div className="w-80 h-screen border-r fixed inset-0 z-50">
        {/* Loading */}
        {/* <div className="w-full h-[95vh] flex justify-center items-center">
          <Loader2 size={50} className='animate-spin'/>
        </div> */}

        {/* Chat list */}

        <ChatsList contact={contact} />
      </div>
      {/* Chat area */}
      <div className="pl-80 w-full">
        {!currentContact?._id && (
          <AddContact
            contactForm={contactForm}
            onCreateContact={onCreateContact}
          />
        )}

        {currentContact?._id && (
          <div className="w-full relative">
            <TopChat />

            <Chat messageForm={messageForm} onSendMessage={onSendMessage} messages={messages} />
          </div>
        )}
      </div>
    </div>
  );
}

const contact = [
  {
    email: "akramov@gmail.com",
    _id: "1",
    avatar: "https://github.com/shadcn.png",
    firstName: "Akram",
    lastName: "Akramov",
    bio: "Software Engineer with a passion for building scalable applications.",
  },
  { email: "diyor@gmail.com", _id: "2" },
  { email: "ali@gmail.com", _id: "3" },
  { email: "ziko@gmail.com", _id: "4" },
];
const messages = [
  {
    text: "Hello, how are you?",
    _id: "1",
    // avatar: "https://github.com/shadcn.png",
  },
  { text: "messag1", _id: "2" },
  { text: "messag2", _id: "3" },
{ text: "messag3", _id: "4" },
]