"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
const PresetItem = [
  // {
  //   name: "Dynamic Tags Test",
  // },
  // {
  //   name: "-Example",
  // },
  // {
  //   name: "2.**State Purpose",
  // },
  // {
  //   name: "3. **Be Polite and Courteous",
  // },
  // {
  //   name: "4. **Handle Responses",
  // },
  // {
  //   name: "5. **If Unable to Connect Immediately",
  // },
  // {
  //   name: "6. **Note-Taking",
  // },
  // {
  //   name: "7.**Closing",
  // },
  // {
  //   name: "8. **Adaptability",
  // },
  // {
  //   name: "9. **Professionalism",
  // },
  // {
  //   name: "10. **Follow-Up",
  // },
  {
    name: "Event Confirmation",
  },
  {
    name: "Credit card sales",
  },
];
const ManualTest = () => {
  const [manual_response, setManual_response] = useState("");
  const [run_instructions, setRun_instructions] = useState("");
  const handleSubmit = () => {
    toast.loading("Submiting");
    try {
      const backend = process.env.NEXT_PUBLIC_API_URL;
      const response = axios.post(`${backend}/manual`, {
        manual_response,
        run_instructions,
      });
      toast.dissmis();
      toast.success("Submit successful.");
      console.log(response);
    } catch (err) {
      toast.error(err);
    }
    console.log(manual_response, run_instructions);
  };
  return (
    <div className="p-5 rounded-xl bg-zinc-100/80 backdrop-blur-3xl flex items-center justify-center flex-col gap-1">
      <h2 className="text-2xl font-bold text-center my-4">Manual Input</h2>
      <p>New User Message:</p>
      <Input
        value={manual_response}
        onChange={(e) => setManual_response(e.target.value)}
      />
      <Button onClick={handleSubmit}>Send Instruction + Message</Button>
      <p>New Run Instructions:</p>
      <Input
        value={run_instructions}
        onChange={(e) => setRun_instructions(e.target.value)}
      />
      <p>Run Instruction Presets:</p>
      <div className="flex gap-2 flex-wrap">
        {PresetItem.map((item, index) => (
          <Button key={index} className="flex-grow">
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ManualTest;
