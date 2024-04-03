import { Button } from "@/components/ui/button";
import React from "react";
const speechItem = [
  {
    name: "Say bot-patience",
  },
  {
    name: "Say Harley patience",
  },
  {
    name: "Say Harley-card",
  },
  {
    name: "Say Harley-great",
  },
  {
    name: "Say Harley-HERC",
  },
  {
    name: "Say Harley-okay",
  },
  {
    name: "Loop cartoon-pops",
  },
  {
    name: "Say Harley-chirps",
  },
  {
    name: "Say Harley-bells",
  },
];
const Speech = () => {
  return (
    <div className="p-5 rounded-xl bg-zinc-100/80 backdrop-blur-3xl h-full">
      <h2 className="text-2xl font-bold text-center my-4">Pre Prompt</h2>
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
