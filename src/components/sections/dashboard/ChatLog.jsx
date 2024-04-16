"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import useGlobalStore from "@/store/store";
const callLogs = [
  { user: "I am user", agent: "I am agent1" },
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
  { user: "I am user", agent: "I am also agent lasr" },
  { user: "I am user", agent: "I am also agent lasr" },
  { user: "I am user", agent: "I am also agent lasr" },
];
const ChatLog = () => {
  const { callStatus, roomCode } = useGlobalStore();
  console.log(callStatus);
  const [callLogs, setCallLogs] = useState([]);
  const messageRef = useRef(null);

  const mess = { message: "Hello server!", sender: "Kanish Kumar" };
  // const SOCKET_URL = "wss://outgoing-grizzly-in.ngrok-free.app/ws";
  const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
  console.log(SOCKET_URL);
  useEffect(() => {
    if (callStatus) {
      const ws = new WebSocket(`${SOCKET_URL}/ws/chatroom/${roomCode}/`);
      ws.onopen = () => {
        console.log("Connected to WebSocket");
        ws.send(JSON.stringify(mess)); // Send a message to the server
      };

      ws.onmessage = (event) => {
        console.log(JSON.parse(event.data));

        console.log(event);
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
    }
  }, [callStatus]);
  console.log(callLogs);
  useEffect(() => {
    // Scroll to the latest message when callLogs changes
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [callLogs]);
  const copyBotResponse = () => {
    const latestAgentMessage = callLogs.filter((item) => item.agent).pop();
    if (latestAgentMessage) {
      navigator.clipboard.writeText(latestAgentMessage.agent);
    }
  };

  return (
    <div className="p-5 rounded-xl bg-zinc-100/80 backdrop-blur-3xl max-h-[500px] relative h-full">
      <div
        className={`absolute h-4 w-4 right-4 top-4 ${
          callStatus ? "bg-green-400" : "bg-red-600"
        } rounded-full`}
      />
      <h2 className="text-2xl font-bold text-center my-4">Call Log</h2>
      <div className="flex gap-4 h-[85%]">
        <div className="w-full flex gap-2 flex-col-reverse overflow-y-auto no-scrollbar max-h-[400px]">
          {callLogs.length > 0 ? (
            <>
              {callLogs.map((item, index) => (
                <React.Fragment key={index}>
                  {item.user && (
                    <div
                      ref={index === callLogs.length - 1 ? messageRef : null}
                      className="w-[80%]  py-3 px-5 max-w-max rounded-md bg-zinc-50"
                    >
                      User:{item.user}
                    </div>
                  )}
                  {item.agent && (
                    <div
                      ref={index === callLogs.length - 1 ? messageRef : null}
                      className="w-[80%] self-end text-right max-w-max  py-3 px-5 rounded-md bg-zinc-50"
                    >
                      Bot:{item.agent}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </>
          ) : (
            <div className="w-[80%] py-3 px-5 rounded-md bg-zinc-50">
              Call logs will appear here
            </div>
          )}
        </div>
        {/* <div className="flex gap-2 flex-col min-w-[30%]">
          <Button
            className="flex-wrap text-wrap h-auto max-w-[90%] whitespace-normal"
            onClick={copyBotResponse}
          >
            Copy Bot Response
          </Button>
          <Button
            className="flex-wrap text-wrap h-auto max-w-[90%] whitespace-normal"
            onClick={() => {
              setCallLogs([]);
            }}
          >
            Forget Everything
          </Button>
        </div> */}
        <div
          className="absolute top-10 text-2xl right-4 cursor-pointer"
          onClick={() => {
            setCallLogs([]);
          }}
        >
          <RiDeleteBin5Fill />
        </div>
      </div>
    </div>
  );
};

export default ChatLog;
