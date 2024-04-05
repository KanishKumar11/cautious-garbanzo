"use client";
import { Button } from "@/components/ui/button";
import useGlobalStore from "@/store/store";
import axios from "axios";
import Head from "next/head";
import React from "react";

const Speech = () => {
  const { botName } = useGlobalStore();
  const speechItem = [
    {
      name: `Say ${botName} patience`,
    },
    {
      name: `Say ${botName} card`,
    },
    {
      name: `Say ${botName} great`,
    },
    {
      name: `Say ${botName} HERC`,
    },
    {
      name: `Say ${botName} okay`,
    },
    {
      name: `Say ${botName} chirps`,
    },
    {
      name: `Say ${botName} bells`,
    },
  ];
  const handleSubmit = (index) => {
    try {
      const backend = process.env.NEXT_PUBLIC_API_URL;
      const response = axios.post(`${backend}/pre-prompt`, { index });
      console.log(response);
      console.log(index);
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <div className="p-5 rounded-xl bg-zinc-100/80 backdrop-blur-3xl h-full">
      <Head>
        <audio src="/dial.mp3" id="dialerSound" preload="auto" />
      </Head>
      <h2 className="text-2xl font-bold text-center my-4">Pre Prompt</h2>
      <div className="flex flex-wrap gap-3">
        {speechItem.map((item, index) => (
          <Button
            key={index}
            className="min-w-[33%] flex-grow"
            onClick={() => {
              handleSubmit(index);
              const audio = new Audio(`/${index}.mp3`);
              audio.play();
            }}
          >
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Speech;
