import { cookies } from "next/headers";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

// Import the editor
import dynamic from "next/dynamic";
const BetterEditor = dynamic(
  () => import("../components/BetterEditor/BetterEditor"),
  { ssr: false }
);

//Import the chat-Layout
import { ChatLayout } from "@/components/chat/chat-layout";

import { Sidebar } from "@/components/SidebarNav/SideBar";

// Import shadcn components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Import datacomponents
import { loggedInUserData, userData } from "./data";

export default function App() {
  const layout = cookies().get("react-resizable-panels:layout");

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const currentDate = new Date().toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <main
      className="w-screen h-screen"
      style={{ backgroundImage: "url(bgImg.png)" }}
    >
      <div className="grid grid-cols-5 grid-rows-8 gap-4 p-4 h-screen w-screen">
          {/* Top Header - User Profile Card */}
          <div className="col-span-3 shad rounded-lg shadow-lg backdrop-blur-sm" style={{backgroundColor: '#0d0d0d99'}}>
            <Card className="h-full border-none shadow-none rounded-lg bg-transparent">
              <CardContent className="flex items-center justify-between p-4 h-full">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={loggedInUserData.avatar} alt={loggedInUserData.name} />
                    <AvatarFallback>{loggedInUserData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-lg font-semibold text-white">{loggedInUserData.name}</h2>
                    <p className="text-sm text-gray-300">Welcome back!</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30 rounded-lg font-medium">
                    Online
                  </Badge>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{currentTime}</p>
                    <p className="text-xs text-gray-300">{currentDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Right - Notifications */}
          <div className="col-start-5 shad rounded-lg shadow-lg backdrop-blur-sm" style={{backgroundColor: '#0d0d0d99'}}>
            <Card className="h-full border-none shadow-none rounded-lg bg-transparent">
              <CardContent className="p-4 h-full flex flex-col justify-center">
                <div className="text-center">
                  <div className="relative">
                    <Button variant="outline" size="sm" className="mb-2 rounded-xl bg-white/10 border-white/20 hover:bg-white/20 text-white">
                      🔔
                    </Button>
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white border-none">
                      3
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-200 font-medium">Notifications</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="row-span-6 row-start-1 shad cid-4 rounded-lg shadow-lg overflow-hidden backdrop-blur-sm">
            <Sidebar />
          </div>

          {/* Bottom Left - Quick Stats */}
          <div className="row-span-2 col-start-1 row-start-7 shad cid-5 rounded-lg shadow-lg backdrop-blur-sm" style={{backgroundColor: '#0d0d0d99'}}>
            <Card className="h-full border-none shadow-none rounded-lg bg-transparent">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-white font-semibold">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-200 font-medium">Documents</span>
                  <Badge variant="outline" className="bg-white/10 text-white border-white/20 rounded-lg">42</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-200 font-medium">Messages</span>
                  <Badge variant="outline" className="bg-white/10 text-white border-white/20 rounded-lg">{userData[0].messages.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-200 font-medium">Tasks</span>
                  <Badge variant="outline" className="bg-white/10 text-white border-white/20 rounded-lg">7</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Editor */}
          <div className="overflow-y-auto col-span-3 row-span-6 col-start-2 row-start-2 shad cid-6 bg-[#0d0d0d99] rounded-lg shadow-lg backdrop-blur-sm">
            <BetterEditor />
          </div>

          {/* Chat Layout */}
          <div className="row-span-5 col-start-5 row-start-2 cid-7 shad bg-[#0d0d0d99] rounded-lg shadow-lg overflow-hidden backdrop-blur-sm">
            <ChatLayout />
          </div>

          {/* Bottom Right - Quick Actions */}
          <div className="col-start-5 row-start-7 shad rounded-lg shadow-lg backdrop-blur-sm" style={{backgroundColor: '#0d0d0d99'}}>
            <Card className="h-full border-none shadow-none rounded-lg bg-transparent">
              <CardContent className="p-2 h-full flex flex-col justify-center space-y-2">
                <Button variant="outline" size="sm" className="text-xs rounded-xl bg-white/10 border-white/20 hover:bg-white/20 text-white font-medium">
                  📁 New Doc
                </Button>
                <Button variant="outline" size="sm" className="text-xs rounded-xl bg-white/10 border-white/20 hover:bg-white/20 text-white font-medium">
                  💾 Save All
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Header - Recent Activity */}
          <div className="col-span-3 col-start-2 row-start-8 shad rounded-lg shadow-lg backdrop-blur-sm" style={{backgroundColor: '#0d0d0d99'}}>
            <Card className="h-full border-none shadow-none rounded-lg bg-transparent">
              <CardContent className="p-4 h-full flex items-center">
                <div className="flex items-center space-x-4 overflow-hidden">
                  <div className="flex-shrink-0">
                    <h3 className="text-sm font-semibold text-white">Recent Activity:</h3>
                  </div>
                  <Separator orientation="vertical" className="h-6 bg-gray-500" />
                  <div className="flex space-x-6 overflow-x-auto">
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <Avatar className="h-6 w-6 border border-gray-500">
                        <AvatarImage src="/User1.png" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-200 font-medium">Jane edited document</span>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <Avatar className="h-6 w-6 border border-gray-500">
                        <AvatarImage src="/ChatGPT.png" alt="AI" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-200 font-medium">AI generated response</span>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <span className="text-xs text-gray-200 font-medium">📄 Auto-saved 2 min ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Right Corner - Mini Calendar */}
          <div className="col-start-5 row-start-8 shad rounded-lg shadow-lg backdrop-blur-sm" style={{backgroundColor: '#0d0d0d99'}}>
            <Card className="h-full border-none shadow-none rounded-lg bg-transparent">
              <CardContent className="p-2 h-full flex flex-col justify-center items-center">
                <div className="text-center">
                  <p className="text-lg font-bold text-white">{new Date().getDate()}</p>
                  <p className="text-xs text-gray-200 font-medium">{new Date().toLocaleDateString([], { month: 'short' })}</p>
                  <p className="text-xs text-gray-200">{new Date().getFullYear()}</p>
                </div>
              </CardContent>
            </Card>
          </div>
      </div>
    </main>
  );
}
