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
});

const Details = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      botName: "",
      companyName: "",
      contactName: "",
    },
  });

  const onSubmit = async () => {
    toast.loading("Saving...");
    const email = await axios.get("/api/email");
    console.log(email);
    try {
      const formData = form.getValues();

      // const { apiUrl } = useGlobalStore();
      // console.log("api", apiUrl);

      const response = await axios.post(
        "https://outgoing-grizzly-in.ngrok-free.app/detail",
        {
          bot_name: formData.botName,
          company_name: formData.companyName,
          contact_name: formData.contactName,
          email: email.data.email,
        }
      );
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
                  <Input placeholder="Maria" {...field} />
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
                  <Input placeholder="Example Company" {...field} />
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
                <FormLabel>Contact Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
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
