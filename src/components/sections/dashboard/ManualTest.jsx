"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGlobalStore from "@/store/store";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";

const ManualTest = () => {
  const [manualInput, setManualInput] = useState(false);
  const [manual_response, setManual_response] = useState("");
  const [run_instructions, setRun_instructions] = useState("");
  const { botName } = useGlobalStore();
  console.log(manualInput);
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
      name: "15 min appointment",
      value: `You are ${botName}, a digital representative for the founder of Edge AI Staffing. You are calling to set an appointment for a 15 minute discovery call with CEO Justin Hughes. Use permission based selling techniques and keep all answers and questions brief with prospects.  The person you are calling is a LinkedIn Connection of Justin Hughes and that should be referenced early. The prospect’s job duties include cold calls. Edge AI Staffing provides cold call automation with cold calls performed by an AI just like you at a percentage of invoices and no up-front cost. The fact that you are AI should also be brought up early. Use questions regarding current sales pipeline and current prospecting methods and results to guide the prospect towards setting an appointment. Heavy bonuses will be paid to you if you are successful at booking appointments.
      `,
    },
    {
      name: "Sample products",
      value: `You are ${botName}, a digital representative for the founder of Or-L Care, Howard Kaufman. You are calling to get permission to send a sample of natural oral care products. A four ounce bottle of toothpaste, mouthwash, and breath spray. Fluoride and alcohol free, pH balanced. Use permission based selling techniques and keep all answers and questions brief with prospects.  The person you are calling is in charge of product inventory. The fact that you are AI should also be brought up early. Use questions regarding current oral care products and requests from patients for natural and fluoride free hygiene products and results to guide the prospect towards setting an appointment. Heavy bonuses will be paid to you if you are successful at obtaining requests for samples.
      `,
    },
    {
      name: "Sample products",
      value: `You are ${botName}, a digital representative for the founder of Or-L Care, Howard Kaufman. You are calling to get permission to send a sample of natural oral care products. A four ounce bottle of toothpaste, mouthwash, and breath spray. Fluoride and alcohol free, pH balanced. Use permission based selling techniques and keep all answers and questions brief with prospects.  The person you are calling is in charge of product inventory. The fact that you are AI should also be brought up early. Use questions regarding current oral care products and requests from patients for natural and fluoride free hygiene products and results to guide the prospect towards setting an appointment. Heavy bonuses will be paid to you if you are successful at obtaining requests for samples.
      `,
    },
    {
      name: "Service introduction",
      value: `You are ${botName}, a digital representative for the founder of Eagle One Group, Ross Geiger. You are calling to introduce Eagle One’s services. Use permission based selling techniques and keep all answers and questions brief with prospects.  The person you are calling is person responsible for sales and marketing. The fact that you are AI should also be brought up early. Use questions regarding current customer acquisition to guide the prospect towards setting an appointment. Heavy bonuses will be paid to you if you are successful at obtaining appointments.

      `,
    },
  ];
  const handleSubmit = () => {
    toast.loading("Submiting");
    try {
      const backend = process.env.NEXT_PUBLIC_API_URL;
      const response = axios.post(`${backend}/manual`, {
        manual_response,
        run_instructions,
      });
      toast.dismiss();
      toast.success("Submit successful.");
      console.log(response);
    } catch (err) {
      toast.error(err);
    }
    console.log(manual_response, run_instructions);
  };
  console.log(manualInput);
  const handleInputChange = async () => {
    try {
      if (manualInput) {
        toast.loading("Switing to manual mode...");
      } else {
        toast.loading("Switing to AI mode...");
      }

      // manualInput ? setManual_response(false) : setManual_response(true);
      const backend = process.env.NEXT_PUBLIC_API_URL;

      const response = await axios.post(`${backend}/toggle`, {
        mode: !manualInput,
      });
      console.log(manualInput);
      console.log(response);
      toast.dismiss();
      toast.success("Mode Changed!");
    } catch (Err) {
      console.log("Error");
      toast.dismiss();
      toast.error("Unable to change mode");
    }
  };
  return (
    <div className="p-5 rounded-xl bg-zinc-100/80 backdrop-blur-3xl flex items-center justify-center flex-col gap-1">
      <div
        className={`absolute h-4 w-4 right-4 top-4 ${
          manualInput ? "bg-green-400" : "bg-red-600"
        } rounded-full`}
      />
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold text-center my-4">Manual Input</h2>
        <Switch
          className="bg-red-100"
          checked={manualInput}
          onCheckedChange={setManualInput}
          onClick={handleInputChange}
        />
      </div>
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
          <Button
            key={index}
            className="flex-grow"
            onClick={() => {
              setRun_instructions(item.value);
            }}
          >
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ManualTest;
