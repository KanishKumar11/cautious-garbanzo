"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect } from "react";
const callLogs = [
  { user: "I am user", agent: "I am agent" },
  { user: "I am user", agent: "I am also agent" },
  { user: "I am user", agent: "I am agent" },
  { user: "I am user", agent: "I am also agent" },
  { user: "I am user", agent: "I am agent" },
  { user: "I am user", agent: "I am also agent" },
  { user: "I am user", agent: "I am agent" },
  { user: "I am user", agent: "I am also agent" },
  { user: "I am user", agent: "I am agent" },
  { user: "I am user", agent: "I am also agent" },
  { user: "I am user", agent: "I am agent" },
  { user: "I am user", agent: "I am also agent" },
];
const ChatLog = () => {
  const [callLogs, setCallLogs] = useState([]);
  const mess = { message: "Hello server!", sender: "Kanish Kumar" };
  useEffect(() => {
    const ws = new WebSocket(`ws://34.228.16.50:8080/ws/chatroom/96gjggj3/`);

    ws.onopen = () => {
      console.log("Connected to WebSocket");
      ws.send(JSON.stringify(mess)); // Send a message to the server
    };

    ws.onmessage = (event) => {
      console.log(JSON.parse(event.data));
      setCallLogs((prevLogs) => [...prevLogs, JSON.parse(event.data)]);
    };
    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, []);
  console.log(callLogs);

  return (
    <div className="p-5 rounded-xl bg-zinc-100/80 backdrop-blur-3xl max-h-[500px] ">
      <h2 className="text-2xl font-bold text-center my-4">Call Log</h2>
      <div className="flex gap-4 h-auto">
        <div className="min-w-[65%] flex gap-2 flex-col overflow-y-auto no-scrollbar max-h-[400px]">
          {callLogs.length > 0 ? (
            <>
              {callLogs.map((item, index) => (
                <>
                  <div
                    key={index}
                    className="w-[80%]  py-3 px-5 max-w-max rounded-md bg-zinc-50"
                  >
                    {item.user}
                  </div>
                  <div
                    key={index}
                    className="w-[80%] self-end text-right max-w-max  py-3 px-5 rounded-md bg-zinc-50"
                  >
                    {item.agent}
                  </div>
                </>
              ))}
            </>
          ) : (
            <div className="w-[80%] py-3 px-5 rounded-md bg-zinc-50">
              Call logs will appear here
            </div>
          )}
        </div>
        <div className="flex gap-2 flex-col min-w-[30%]">
          <Button>Copy Bot Response</Button>
          <Button>Forget Everything</Button>
          <div>Settings</div>
          <div className="flex items-center justify-center gap-1">
            <Checkbox />
            Enable Auto Transfer
          </div>
          <div className="w-full rounded-md border border-zinc-500 py-2 flex items-center justify-center">
            gpt-3.5-turbo
          </div>
          <RadioGroup defaultValue="UnrealSpeech">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ElevenLabs" id="ElevenLabs" />
              <Label htmlFor="ElevenLabs">ElevenLabs</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="UnrealSpeech" id="UnrealSpeech" />
              <Label htmlFor="UnrealSpeech">UnrealSpeech</Label>
            </div>
          </RadioGroup>
          <Button>Save Settings</Button>
        </div>
      </div>
    </div>
  );
};

export default ChatLog;
