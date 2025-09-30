import { Message, UserData } from "@/app/data";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import ChatBottombar from "./chat-bottombar";
import { AnimatePresence, motion } from "framer-motion";

interface ChatListProps {
  messages?: Message[];
  selectedUser: UserData;
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
}

export function ChatList({
  messages,
  selectedUser,
  sendMessage,
  isMobile
}: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col bg-transparent">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col p-2"
      >
        <AnimatePresence>
          {messages?.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                "flex flex-col gap-2 p-3 whitespace-pre-wrap",
                message.name !== selectedUser.name ? "items-end" : "items-start"
              )}
            >
              <div className="flex gap-3 items-end max-w-[80%]">
                {message.name === selectedUser.name && (
                  <Avatar className="flex justify-center items-center border border-gray-500 flex-shrink-0">
                    <AvatarImage
                      src={message.avatar}
                      alt={message.name}
                      width={6}
                      height={6}
                      className="w-8 h-8"
                    />
                  </Avatar>
                )}
                <div className={cn(
                  "p-3 rounded-2xl max-w-xs break-words",
                  message.name === selectedUser.name 
                    ? "bg-gray-700/80 text-white rounded-bl-md" 
                    : "bg-blue-600/90 text-white rounded-br-md"
                )}>
                  <span className="text-sm leading-relaxed">{message.message}</span>
                </div>
                {message.name !== selectedUser.name && (
                  <Avatar className="flex justify-center items-center border border-gray-500 flex-shrink-0">
                    <AvatarImage
                      src={message.avatar}
                      alt={message.name}
                      width={6}
                      height={6}
                      className="w-8 h-8"
                    />
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <ChatBottombar sendMessage={sendMessage} isMobile={isMobile}/>
    </div>
  );
}
