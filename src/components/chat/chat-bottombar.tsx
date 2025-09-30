import {
  FileImage,
  Mic,
  Paperclip,
  PlusCircle,
  SendHorizontal,
  Smile,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Message, loggedInUserData } from "@/app/data";
import { Textarea } from "../ui/textarea";
import { EmojiPicker } from "../chatUtils/emoji-picker";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import fetchData from "@/components/chat/fetchData"; // Import the fetchData function
import { appendNewMessage } from "@/app/data";
interface ChatBottombarProps {
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
}

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

export default function ChatBottombar({
  sendMessage, isMobile,
}: ChatBottombarProps) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleThumbsUp = () => {
    const newMessage: Message = {
      id: message.length + 1,
      name: loggedInUserData.name,
      avatar: loggedInUserData.avatar,
      message: "👍",
    };
    sendMessage(newMessage);
    setMessage("");
  };

  const handleSend = async () => {
  if (message.trim()) {
    const data = {
      model: 'gpt-3.5-turbo-instruct',
      prompt: message.trim(), // Send the user input message as the prompt
      temperature: 0.7,
      max_tokens: 150
    };

    try {
      // Fetch data from the OpenAI API
      const responseData = await fetchData('https://api.openai.com/v1/completions', data);
      // Extracting the text from the first choice
      const generatedText = responseData.choices[0].text.trim();
      console.log("Generated Response:", generatedText); // Log the generated response in the console

      // Send the user's input message
      const userMessage: Message = {
        id: message.length + 1,
        name: loggedInUserData.name,
        avatar: loggedInUserData.avatar,
        message: message.trim(),
      };

      // Send the generated message
      const generatedMessage: Message = {
        id: userMessage.id + 1, // Increment the message ID
        name: loggedInUserData.name,
        avatar: loggedInUserData.avatar,
        message: generatedText,
      };

      // Call appendNewMessage for both userMessage and generatedMessage
      appendNewMessage(message.trim(), true); // true for user message
      appendNewMessage(generatedText, false); // false for generated message

      setMessage(""); // Reset the message input field

      if (inputRef.current) {
        inputRef.current.focus();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
};


  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  return (
    <div className="p-3 flex justify-between w-full items-center gap-2 border-t border-gray-600/50 bg-transparent">
      <div className="flex">
          <Popover>
            <PopoverTrigger asChild>
            <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-9 w-9 rounded-xl",
            "hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-200"
          )}
        >
          <PlusCircle size={20} />
        </Link>
            </PopoverTrigger>
            <PopoverContent
            side="top"
            className="w-full p-2 bg-gray-800 border-gray-600 rounded-xl">
             {message.trim() || isMobile ? (
               <div className="flex gap-2">
                <Link
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9 rounded-xl",
                "hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-200"
              )}
              >
                <Mic size={20} />
              </Link>
               {BottombarIcons.map((icon, index) => (
                 <Link
                   key={index}
                   href="#"
                   className={cn(
                     buttonVariants({ variant: "ghost", size: "icon" }),
                     "h-9 w-9 rounded-xl",
                     "hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-200"
                   )}
                 >
                   <icon.icon size={20} />
                 </Link>
               ))}
             </div>
             ) : (
              <Link
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9 rounded-xl",
                "hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-200"
              )}
              >
                <Mic size={20} />
              </Link>
             )}
            </PopoverContent>
          </Popover>
        {!message.trim() && !isMobile && (
          <div className="flex">
            {BottombarIcons.map((icon, index) => (
              <Link
                key={index}
                href="#"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "h-9 w-9 rounded-xl",
                  "hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-200"
                )}
              >
                <icon.icon size={20} />
              </Link>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence initial={false}>
        <motion.div
          key="input"
          className="w-full relative"
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.05 },
            layout: {
              type: "spring",
              bounce: 0.15,
            },
          }}
        >
          <Textarea
            autoComplete="off"
            value={message}
            ref={inputRef}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            name="message"
            placeholder="Type a message..."
            className="w-full border border-gray-600 rounded-2xl flex items-center h-10 resize-none overflow-hidden bg-gray-800/50 text-white placeholder:text-gray-400 focus:border-blue-500 transition-all duration-200"
          ></Textarea>
          <div className="absolute right-2 bottom-0.5  ">
            <EmojiPicker onChange={(value) => {
              setMessage(message + value)
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }} />
          </div>
        </motion.div>

        {message.trim() ? (
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9 rounded-xl",
              "hover:bg-blue-600 bg-blue-500 text-white hover:text-white shrink-0 transition-all duration-200"
            )}
            onClick={handleSend}
          >
            <SendHorizontal size={20} />
          </Link>
        ) : (
          <p></p>
        )}
      </AnimatePresence>
    </div>
  );
}
