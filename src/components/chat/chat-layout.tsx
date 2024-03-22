"use client";

import { userData } from "@/app/data";
import React, {  useState } from "react";

import { cn } from "@/lib/utils";
import { Chat } from "./chat";

import dynamic from "next/dynamic";
import {Sidebar} from "../Sidebar/SideBar";

// const BetterEditor = dynamic(() => import("../BetterEditor/BetterEditor"), { ssr: false });


export function ChatLayout() {
  const [selectedUser, setSelectedUser] = React.useState(userData[1]);
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div className="flex flex-row h-full rounded-lg overflow-hidden">
      {/* <Sidebar/> */}
      <Chat
          messages={selectedUser.messages}
          selectedUser={selectedUser}
          isMobile={isMobile}
        />
    </div>
    
  );
}
