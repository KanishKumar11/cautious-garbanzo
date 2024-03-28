import ChatLog from "@/components/sections/dashboard/ChatLog";
import Details from "@/components/sections/dashboard/Details";
import Dialer from "@/components/sections/dashboard/Dialer";
import ManualTest from "@/components/sections/dashboard/ManualTest";
import Speech from "@/components/sections/dashboard/Speech";
import Transcription from "@/components/sections/dashboard/Transcription";
import React from "react";
import { Toaster } from "react-hot-toast";

const page = () => {
  return (
    <div className="flex justify-between items-center h-auto min-h-screen bg-blue-500/50 backdrop-blur-md  backdrop-sepia p-7 gap-8 flex-col w-full">
      <Toaster />
      <h1 className="text-2xl font-bold text-zinc-900">EdgeAi</h1>
      <div className="w-full flex justify-between gap-8 text-zinc-900">
        <div className="w-[30%] flex flex-col h-full items-stretch gap-7">
          <Details />
          <Speech />
        </div>
        <div className="w-[40%] flex flex-col gap-7">
          <Dialer />
          <ChatLog />
        </div>
        <div className="w-[30%] flex flex-col gap-7">
          <ManualTest />
          <Transcription />
        </div>
      </div>
    </div>
  );
};

export default page;
