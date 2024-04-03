"use client";
import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import useGlobalStore from "@/store/store";

const formSchema = z.object({
  email: z
    .string({
      message: "Email is required",
    })
    .email({
      message: "Invalid email address.",
    }),
  otp: z.string().optional(),
});

const ForgotPasswordPage = () => {
  const { otp, setOtp } = useGlobalStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (e) => {
    setIsLoading(true);
    try {
      const formData = form.getValues();
      const response = await axios.post(
        "http://127.0.0.1:8000/password-reset-initiate",
        formData
      );
      setIsLoading(false);
      setOtp(response.data.otp);
      toast.success("An email with otp to reset your password has been sent.");
      setIsEmailVerified(true);
      console.log(response);
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to initiate password reset. Please try again.");
      console.log(error);
    }
  };
  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = form.getValues();
      if (formData.otp == otp) console.log("otp verified");
      const backend = process.env.NEXT_PUBLIC_API_URL;

      const response = await axios.post(
        `${backend}/password-reset-verify-otp`,
        formData
      );
      setIsLoading(false);
      toast.success("Email Verified");
      setIsEmailVerified(true);
      router.push(`/new-password?email=${encodeURIComponent(formData.email)}`);
      console.log(response);
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to initiate password reset. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-[90vh] flex  items-center justify-center h-screen bg-[#007f95] overflow-hidden">
      <Toaster />
      <div className="container">
        <div className="forgot-password form">
          <h1 className="text-4xl font-semibold text-center my-4">
            Forgot Password
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {!isEmailVerified ? (
                <FormField
                  control={form.control}
                  name="email"
                  className="mt-2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter your registered email</FormLabel>
                      <Input placeholder="John@example.com" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <div>
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
                                ))}
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
                  <Button
                    onClick={(e) => handleVerify(e)}
                    type="button"
                    className="w-full bg-blue-600 hover:bg-blue-600/70"
                  >
                    Verify
                  </Button>
                </div>
              )}

              {!isEmailVerified && (
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-600/70"
                >
                  {isLoading ? "Loading..." : "Reset Password"}
                </Button>
              )}
              <div className="login">
                <span className="login">
                  Remembered your password?&nbsp;
                  <Link href="/login">Login</Link>
                </span>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
