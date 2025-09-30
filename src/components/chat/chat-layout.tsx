"use client";

import { userData } from "@/app/data";
import React, {  useState } from "react";

import { cn } from "@/lib/utils";
import { Chat } from "./chat";



export function ChatLayout() {
  const [selectedUser, setSelectedUser] = React.useState(userData[0]);
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div className="flex flex-row h-full rounded-lg overflow-hidden" style={{backgroundColor: '#0d0d0dcf'}}>
      {/* <Sidebar/> */}
      <Chat
          messages={selectedUser.messages}
          selectedUser={selectedUser}
          isMobile={isMobile}
        />
    </div>

  );
}
