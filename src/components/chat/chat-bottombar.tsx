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
    <div className="p-2 flex justify-between w-full items-center gap-2">
      <div className="flex">
          <Popover>
            <PopoverTrigger asChild>
            <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-9 w-9",
            "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
          )}
        >
          <PlusCircle size={20} className="text-muted-foreground" />
        </Link>
            </PopoverTrigger>
            <PopoverContent
            side="top"
            className="w-full p-2">
             {message.trim() || isMobile ? (
               <div className="flex gap-2">
                <Link
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
              )}
              >
                <Mic size={20} className="text-muted-foreground" />
              </Link>
               {BottombarIcons.map((icon, index) => (
                 <Link
                   key={index}
                   href="#"
                   className={cn(
                     buttonVariants({ variant: "ghost", size: "icon" }),
                     "h-9 w-9",
                     "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                   )}
                 >
                   <icon.icon size={20} className="text-muted-foreground" />
                 </Link>
               ))}
             </div>
             ) : (
              <Link
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
              )}
              >
                <Mic size={20} className="text-muted-foreground" />
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
                  "h-9 w-9",
                  "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                )}
              >
                <icon.icon size={20} className="text-muted-foreground" />
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
            placeholder="Aa"
            className=" w-full border rounded-full flex items-center h-9 resize-none overflow-hidden bg-background"
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
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
            )}
            onClick={handleSend}
          >
            <SendHorizontal size={20} className="text-muted-foreground" />
          </Link>
        ) : (
          // <Link
          //   href="#"
          //   className={cn(
          //     buttonVariants({ variant: "ghost", size: "icon" }),
          //     "h-9 w-9",
          //     "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
          //   )}
          //   onClick={handleThumbsUp}
          // >
          //   {/* <ThumbsUp size={20} className="text-muted-foreground" /> */}
          // </Link>
          <p></p>
        )}
      </AnimatePresence>
    </div>
  );
}
