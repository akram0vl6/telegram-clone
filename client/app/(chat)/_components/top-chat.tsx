import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCurrentContact } from "@/hooks/use-current";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@/components/ui/separator";
import { Settings2 } from "lucide-react";
import React from "react";

const TopChat = () => {
  const { currentContact } = useCurrentContact();

  return (
    <div className="w-full flex items-center justify-between sticky top-0 z-50 h-[8vh] p-2 border-b bg-background">
      <div className="flex items-center">
        <Avatar className="w-8 h-8 rounded-full">
          <AvatarImage
            src={currentContact?.avatar}
            alt={currentContact?.email}
            className="w-full h-full object-cover rounded-full"
          />
          <AvatarFallback className="w-full h-full uppercase flex items-center justify-center text-xs bg-muted rounded-full">
            {currentContact?.email[0]}
          </AvatarFallback>
        </Avatar>

        <div className="ml-2">
          <h2 className="font-medium text-sm">{currentContact?.email}</h2>
          {/* <div className="text-xs flex items-center gap-1 text-muted-foreground">
            <p className="text-secondary-foreground animate-pulse line-clamp-1">
              Hellow
            </p>
            <div className="self-end mb-1">
              <div className="flex justify-center items-center gap-1">
                <div className="w-1 h-1 bg-secondary-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1 h-1 bg-secondary-foreground rounded-full animate-bounce [animation-delay:-0.10s]"></div>
                <div className="w-1 h-1 bg-secondary-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              </div>
            </div>
          </div> */}
          <p className="text-xs">
            {/* <span className='text-green-500'>●</span> Online */}
            <span className="text-muted-foreground">●</span> Last seen recently
          </p>
        </div>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button size={"icon"} variant={"secondary"}>
            <Settings2 />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle />
            <div className="mx-auto w-1/2 max-md:w-1/4 h-36 relative ">
              <Avatar className="w-4 h-4 rounded-full">
                <AvatarImage
                  src={currentContact?.avatar}
                  alt={currentContact?.email}
                  className="w-35 h-35 object-cover rounded-full"
                />
                <AvatarFallback className="w-full h-full uppercase flex items-center justify-center text-sm bg-muted rounded-full">
                  {currentContact?.email[0]}
                </AvatarFallback>
              </Avatar>
            </div>

            <Separator className="my-2" />

            <h1 className="text-center capitalize font-spaceGrotesk text-xl">
              {currentContact?.email}
            </h1>

            <div className="flex flex-col space-y-1">
              {currentContact?.firstName && (
                <div className="flex items-center gap-1 mt-4">
                  <p className="font-spaceGrotesk">First Name: </p>
                  <p className="font-spaceGrotesk text-muted-foreground">
                    {currentContact?.firstName}
                  </p>
                </div>
              )}
              {currentContact?.lastName && (
                <div className="flex items-center gap-1 mt-4">
                  <p className="font-spaceGrotesk">Last Name: </p>
                  <p className="font-spaceGrotesk text-muted-foreground">
                    {currentContact?.lastName}
                  </p>
                </div>
              )}
              {currentContact?.bio && (
                <div className="flex items-center gap-1 mt-4">
                  <p className="font-spaceGrotesk">
                    About:{" "}
                    <span className="font-spaceGrotesk text-muted-foreground">
                      {currentContact?.bio}
                    </span>
                  </p>
                </div>
              )}

              <Separator className="my-2" />

              <h2 className="text-xl">Image</h2>
              {/* <div className='flex flex-col space-y-2'>
							{messages
								.filter(msg => msg.image)
								.map(msg => (
									<div className='w-full h-36 relative' key={msg._id}>
										<Image src={msg.image} alt={msg._id} fill className='object-cover rounded-md' />
									</div>
								))}
						</div> */}
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default TopChat;
