import MeessageCard from "@/components/cards/meessage-card";
import ChatLoading from "@/components/loadings/chat-loading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { messageSchema } from "@/lib/validation";
import { Paperclip, Send, Smile } from "lucide-react";
import React, { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import emojies from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "next-themes";

interface ChatProps {
  messageForm: UseFormReturn<z.infer<typeof messageSchema>>;
  onSendMessage: (values: z.infer<typeof messageSchema>) => void;
  messages?: any[]; // Replace with actual message type
  // You can define a more specific type for messages if needed
}
const Chat: FC<ChatProps> = ({ onSendMessage, messageForm, messages }) => {
  const { resolvedTheme } = useTheme();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleEmojiSelect = (emoji: string) => {
    const input = inputRef.current;
    if (!input) return;

    const text = messageForm.getValues("text");
    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;

    const newText = text.slice(0, start) + emoji + text.slice(end);
    messageForm.setValue("text", newText);

    setTimeout(() => {
      input.setSelectionRange(start + emoji.length, start + emoji.length);
    }, 0);
  };

  return (
    <div className="flex flex-col justify-end z-40 min-h-[92vh] sidebar-custom-scrollbar overflow-y-scroll">
      {/* Loading */}
      {/* <ChatLoading /> */}
      {/* Messages */}

      {/* Start conversation */}
      <div className="w-full h-[88vh] flex items-center justify-center">
        <div
          className="text-[100px] cursor-pointer"
          onClick={() => onSendMessage({ text: "✋" })}
        >
          ✋
        </div>
      </div>

      {/* <MeessageCard isReciving /> */}
      {/* Start conversation */}
      <Form {...messageForm}>
        <form
          onSubmit={messageForm.handleSubmit(onSendMessage)}
          className="w-full flex relative"
        >
          <Button size={"icon"} type="button" variant={"secondary"}>
            <Paperclip />
          </Button>
          <FormField
            control={messageForm.control}
            name="text"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    className="bg-secondary border-l border-l-muted-foreground border-r border-r-muted-foreground h-9"
                    placeholder="Type a message"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    ref={inputRef}
                    onBlur={() => field.onBlur()}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" type="button" variant="secondary">
                <Smile />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 border-none rounded-md absolute right-6 bottom-0">
              <Picker
                data={emojies}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
                onEmojiSelect={(emoji: { native: string }) => handleEmojiSelect(emoji.native)}
              />
            </PopoverContent>
          </Popover>

          <Button type="submit" size={"icon"}>
            <Send />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Chat;
