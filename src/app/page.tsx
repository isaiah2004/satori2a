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

export default function App() {
  const layout = cookies().get("react-resizable-panels:layout");

  return (
    <main
      className="w-screen h-screen"
      style={{ backgroundImage: "url(bgImg.png)" }}
    >
      {/* <div className="flex h-[calc(100dvh)] flex-col items-center justify-center p-4 md:px-24 py-32 gap-4">
        <div className="z-10 border rounded-lg max-w-5xl w-full h-full text-sm lg:flex">
          <ChatLayout />
        </div>
      </div> */}

      <div className="grid grid-cols-5 grid-rows-8 gap-4 h-screen w-screen p-5">
        <div className="col-span-3 shad">2</div>
        <div className="col-start-5 shad">3</div>
        <div className="row-span-6 row-start-1 shad cid-4">
          <Sidebar />
        </div>
        <div className="row-span-2 col-start-1 row-start-7 shad cid-5">5</div>
        <div className="col-span-3 row-span-6 col-start-2 row-start-2 overflow-auto p-2 shad cid-6 rounded-xl">
          <BetterEditor />
        </div>
        <div className="row-span-5 col-start-5 row-start-2 cid-7 shad">
          <ChatLayout />
        </div>
        <div className="col-start-5 row-start-7 shad">8</div>
        <div className="col-span-3 col-start-2 row-start-8 shad">9</div>
        <div className="col-start-5 row-start-8 shad">10</div>
      </div>
    </main>
  );
}
