"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import useGlobalStore from "@/store/store";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Cookies from "js-cookie";

const formSchema = z.object({
  // botName: z.string().min(2, {
  //   message: "Bot name must be at least 2 characters.",
  // }),
  // companyName: z.string().min(2, {
  //   message: "Company must be at least 2 characters.",
  // }),
  // contactName: z.string().min(2, {
  //   message: "Contact Name must be at least 2 characters.",
  // }),
  prompt: z.string().optional(),
  service: z.string().optional(),
});

const Details = () => {
  const { setBotName, sessionKey, setCsrfToken } = useGlobalStore();
  const csrfToken = Cookies.get("csrftoken");
  console.log(csrfToken);
  setCsrfToken(csrfToken);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // botName: "",
      // companyName: "",
      // contactName: "",
      prompt: "",
      service: "",
    },
  });

  const onSubmit = async () => {
    toast.loading("Saving...");
    const email = await axios.get("/api/email");
    // console.log(email);
    try {
      const formData = form.getValues();
      const backend = process.env.NEXT_PUBLIC_API_URL;

      const response = await axios.post(
        `${backend}/update`,
        // "https://outgoing-grizzly-in.ngrok-free.app/detail",
        {
          // bot_name: formData.botName,
          // company_name: formData.companyName,
          // // contact_name: formData.contactName,
          // customer_name: formData.contactName,
          prompt: formData.prompt,
          service: formData.service,
          // email: email.data.email,
        },
        {
          headers: {
            "X-CSRFToken": csrfToken,
            Cookie: `sessionid=${sessionKey}`,
          },
        }
      );
      // console.log(formData);
      setBotName(formData.botName);
      // console.log(response);
      toast.dismiss();
      toast.success("Details saved!.");
    } catch (error) {
      // console.log(error);
      toast.dismiss();
      toast.error("Failed to Save details. Please try again.");
    }
  };
  return (
    <div className="p-5 rounded-xl bg-zinc-100/80 backdrop-blur-3xl">
      <h2 className="text-2xl font-bold text-center my-4">Basic Details</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          {/* <FormField
            control={form.control}
            name="botName"
            className="mt-2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bot Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyName"
            className="mt-2"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Initial Prompt</FormLabel>
                <FormControl>
                  <Textarea className="h-full" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Voice service</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue="Male"
                    className="flex flex-col space-y-1"
                  >
                    {/* <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Twilio" disabled />
                      </FormControl>
                      <FormLabel className="font-normal">Twilio </FormLabel>
                    </FormItem> */}
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Male" />
                      </FormControl>
                      <FormLabel className="font-normal">Male </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Female" />
                      </FormControl>
                      <FormLabel className="font-normal">Female</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Save Settings
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Details;
