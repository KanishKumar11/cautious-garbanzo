import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const Transcription = () => {
  return (
    <div className="p-5 rounded-xl bg-zinc-100/80 backdrop-blur-3xl flex items-center justify-start flex-col h-full">
      <h2 className="text-2xl font-bold text-center my-4">Transcription</h2>
      <Button>Record</Button>
      <p>Ready to record</p>
      <p>Transcribed 2.9 seconds of audio in 1.1 seconds</p>
      <Textarea className="h-full"></Textarea>
    </div>
  );
};

export default Transcription;
