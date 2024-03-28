import { Button } from "@/components/ui/button";
import React from "react";
const speechItem = [
  {
    name: "Say bot-patience",
  },
  {
    name: "Say maria patience",
  },
  {
    name: "Say maria-card",
  },
  {
    name: "Say maria-great",
  },
  {
    name: "Say maria-HERC",
  },
  {
    name: "Say maria-okay",
  },
  {
    name: "Loop cartoon-pops",
  },
  {
    name: "Say maria-chirps",
  },
  {
    name: "Say maria-bells",
  },
];
const Speech = () => {
  return (
    <div className="p-5 rounded-xl bg-zinc-100/80 backdrop-blur-3xl">
      <h2 className="text-2xl font-bold text-center my-4">Speech</h2>
      <div className="flex flex-wrap gap-3">
        {speechItem.map((item, index) => (
          <Button key={index} className="min-w-[33%] flex-grow">
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Speech;
