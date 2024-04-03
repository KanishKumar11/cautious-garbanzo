import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
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
  return (
    <div className="p-5 rounded-xl bg-zinc-100/80 backdrop-blur-3xl flex items-center justify-center flex-col gap-1">
      <h2 className="text-2xl font-bold text-center my-4">Manual Input</h2>
      <p>New User Message:</p>
      <Input />
      <Button>Send Instruction + Message</Button>
      <p>New Run Instructions:</p>
      <Input />
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
