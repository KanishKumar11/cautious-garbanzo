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
const formSchema = z.object({
  botName: z.string().min(2, {
    message: "Bot name must be at least 2 characters.",
  }),
  companyName: z.string().min(2, {
    message: "Company must be at least 2 characters.",
  }),
  contactName: z.string().min(2, {
    message: "Contact Name must be at least 2 characters.",
  }),
  prompt: z.string().optional(),
});

const Details = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      botName: "",
      companyName: "",
      contactName: "",
      prompt: "",
    },
  });
  const { setBotName } = useGlobalStore();

  const onSubmit = async () => {
    toast.loading("Saving...");
    const email = await axios.get("/api/email");
    console.log(email);
    try {
      const formData = form.getValues();
      const backend = process.env.NEXT_PUBLIC_API_URL;

      const response = await axios.post(
        `${backend}/update`,
        // "https://outgoing-grizzly-in.ngrok-free.app/detail",
        {
          bot_name: formData.botName,
          company_name: formData.companyName,
          // contact_name: formData.contactName,
          customer_name: formData.contactName,
          prompt: formData.prompt,
          // email: email.data.email,
        }
      );
      setBotName(formData.botName);
      console.log(response);
      toast.dismiss();
      toast.success("Details saved!.");
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Failed to Save details. Please try again.");
    }
  };
  return (
    <div className="p-5 rounded-xl bg-zinc-100/80 backdrop-blur-3xl">
      <h2 className="text-2xl font-bold text-center my-4">Basic Details</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
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
          />
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Initial Prompt</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
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
