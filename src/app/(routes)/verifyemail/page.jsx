"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Footer from "@/components/Footer";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const Page = () => {
  const [data, setData] = useState(null);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFormData = sessionStorage.getItem("signupFormData");
      const parsedFormData = JSON.parse(savedFormData);
      setData(parsedFormData);
      if (!savedFormData) router.push("/");
    }
  }, []);

  const onSubmit = async () => {
    const formData = form.getValues();
    console.log(formData.otp, typeof formData.otp);
    try {
      if (data) {
        const {
          email,
          firstName,
          lastName,
          country,
          discordUsername,
          waNumber,
          password,
        } = data;
        const response = await axios.post("/backend/verify", {
          first_name: firstName,
          last_name: lastName,
          user_country: country,
          user_discord: discordUsername,
          password,
          otp: formData.otp,
          waNumber,
          email,
        });
        toast.success("Email verified successfully");
        console.log(response);
        router.push("/dashboard");
      } else {
        toast.error("No form data found.");
      }
    } catch (error) {
      error?.response?.status == 500
        ? toast.error("User already exists please login")
        : toast.error("Invalid OTP!");
      console.log(error);
    }
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#007f95]">
      <Toaster />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" space-y-6 bg-white p-16 py-20 rounded-xl"
        >
          <h1 className="text-4xl font-semibold text-center my-4">
            Verify Email
          </h1>
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    render={({ slots }) => (
                      <InputOTPGroup>
                        {slots.map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}{" "}
                      </InputOTPGroup>
                    )}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please enter the OTP sent to your email id.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Verify
          </Button>
        </form>
      </Form>
      <Footer />
    </div>
  );
};

export default Page;
