import React from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { UserData } from '@/app/data';
import { PlusCircle,Settings } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';



interface ChatTopbarProps {
    selectedUser: UserData;
    }
    
    export const TopbarIcons = [{ icon: PlusCircle }, { icon: Settings }];


export default function ChatTopbar({selectedUser}: ChatTopbarProps) {
  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b border-gray-600/50 bg-transparent">
        <div className="flex items-center gap-3">
          <Avatar className="flex justify-center items-center border-2 border-gray-500">
            <AvatarImage
              src={selectedUser.avatar}
              alt={selectedUser.name}
              width={6}
              height={6}
              className="w-10 h-10"
            />
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-white">{selectedUser.name}</span>
            <span className="text-xs text-green-400 font-medium">AI Assistant</span>
          </div>
        </div>

        <div className="flex gap-1">
          {TopbarIcons.map((icon, index) => (
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
      </div>
  )
}
