"use client";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { TbBackspaceFilled } from "react-icons/tb";
import { FaPhoneAlt } from "react-icons/fa";
// import dialerSound from "./../../../../public/dial.mp3";
import Head from "next/head";
import useGlobalStore from "@/store/store";
import { MdCallEnd } from "react-icons/md";

const Dialer = () => {
  // const [audio] = useState(new Audio(dialerSound));
  const { setCallStatus, callStatus, setRoomCode, csrfToken, sessionKey } =
    useGlobalStore();
  const [num, setNum] = useState("");

  const handleInputChange = (e) => {
    setNum(e.target.value);
  };

  const handleButtonClick = (value) => {
    setNum(num + value);
    const audio = new Audio("/dial.mp3");
    audio.play();
  };
  const onSubmit = async () => {
    toast.loading("dialing...");
    function generateRoomCode(length) {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return result;
    }
    const roomCode = generateRoomCode(16);
    try {
      if (num.length > 8) {
        const email = await axios.get("/api/email");
        const backend = process.env.NEXT_PUBLIC_API_URL;
        // console.log(backend);
        // console.log(email.data.email);
        const response = await axios.post(
          `${backend}/call`,
          {
            phone_number: num,
            email: email.data.email,
            roomCode,
          },
          {
            headers: {
              "X-CSRFToken": csrfToken,
              Cookie: `sessionid=${sessionKey}`,
            },
          }
        );
        setRoomCode(roomCode);
        toast.success("Call connected");
        setCallStatus(true);
        toast.dismiss();
        // console.log(response);
      } else {
        toast.dismiss();
        toast.error("Invalid phone number");
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Unable to make the call, Try again!");
      // console.log(err);
    }
  };
  const handleCallEnd = async () => {
    if (callStatus) {
      try {
        const backend = process.env.NEXT_PUBLIC_API_URL;
        const response = await axios.get(`${backend}/end_call`);
        toast.success("Call disconnected");
        setCallStatus(false);
        toast.dismiss();
        // console.log(response);
      } catch (err) {
        toast.dismiss();
        toast.error("Unable to end the call, Try again!");
        // console.log(err);
      }
    } else {
      toast.error("Call not connected");
    }
  };

  return (
    <div className="p-5 rounded-xl bg-zinc-100/80 backdrop-blur-3xl">
      <Head>
        <audio src="/dial.mp3" id="dialerSound" preload="auto" />
      </Head>
      <h2 className="text-2xl font-bold text-center my-4">Dialer</h2>
      <div className="flex items-center gap-3">
        <Input type="text" value={num} onChange={handleInputChange} min="7" />
        <div
          className="bg-zinc-800 h-full w-max p-2 cursor-pointer text-slate-100 rounded-xl"
          onClick={() => onSubmit()}
        >
          <FaPhoneAlt />
        </div>
        <div
          className=" w-max p-2 cursor-pointer text-slate-100 rounded-xl bg-red-500 px-3 font-bold"
          onClick={handleCallEnd}
        >
          <MdCallEnd />
        </div>
      </div>
      <div className="flex flex-col mt-4">
        <div className="flex w-full gap-3 my-2">
          {["1", "2", "3"].map((number) => (
            <div
              key={number}
              className="bg-white shadow-sm flex-grow flex items-center justify-center px-3 py-1.5 rounded text-zinc-600 cursor-pointer"
              onClick={() => handleButtonClick(number)}
            >
              {number}
            </div>
          ))}
        </div>
        <div className="flex w-full gap-3 my-2">
          {["4", "5", "6"].map((number) => (
            <div
              key={number}
              className="bg-white shadow-sm flex-grow flex items-center justify-center px-3 py-1.5 rounded text-zinc-600 cursor-pointer"
              onClick={() => handleButtonClick(number)}
            >
              {number}
            </div>
          ))}
        </div>
        <div className="flex w-full gap-3 my-2">
          {["7", "8", "9"].map((number) => (
            <div
              key={number}
              className="bg-white shadow-sm flex-grow flex items-center justify-center px-3 py-1.5 rounded text-zinc-600 cursor-pointer"
              onClick={() => handleButtonClick(number)}
            >
              {number}
            </div>
          ))}
        </div>
        <div className="flex w-full gap-3 my-2">
          {["+", "0", "#"].map((symbol, index) => (
            <div
              className="bg-white shadow-sm flex-grow flex items-center justify-center  rounded text-zinc-600 cursor-pointer"
              key={index}
            >
              {index < 2 ? (
                <div
                  className="px-3 py-1.5 flex-grow flex items-center w-full justify-center"
                  onClick={() => handleButtonClick(symbol)}
                >
                  {symbol}
                </div>
              ) : (
                <div
                  className="px-3 py-1.5 flex flex-grow justify-center"
                  onClick={() =>
                    setNum(
                      num
                        .split("")
                        .slice(0, num.length - 1)
                        .join("")
                    )
                  }
                >
                  <TbBackspaceFilled />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dialer;
