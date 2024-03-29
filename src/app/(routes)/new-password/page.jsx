"use client";
import React, { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
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
// import { useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";

const formSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .refine((data) => data.confirmPassword === data.password, {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    }),
});

const ResetPasswordPage = ({ searchParams }) => {
  const Email = () => {
    // const searchParams = useSearchParams();
    const email = searchParams.email;
    const encodedemail = decodeURIComponent(email);
    return encodedemail;
  };
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const formData = form.getValues();
      // Extract the token from query params
      const response = await axios.post(
        "https://outgoing-grizzly-in.ngrok-free.app/password-reset-update-password",
        { email: Email(), password: formData.password }
      );
      setIsLoading(false);
      toast.success("Password reset successful.");
      console.log(response);
      router.push("/login");
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to reset password. Please try again.");
      console.log(error);
    }
  };
  if (!Email()) {
    router.push("/forgot-password");
  }
  return (
    <div className="w-full min-h-screen flex items-center justify-center h-screen bg-[#007f95] overflow-hidden">
      <Toaster />
      <div className="container">
        <div className="registration form">
          <h1 className="text-4xl font-semibold text-center my-4">
            Reset Password
          </h1>
          <Form {...form}>
            <Suspense fallback={<div>Loading...</div>}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="password"
                  className="mt-2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <Input
                        placeholder="New Password"
                        {...field}
                        type="password"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  className="mt-2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <Input
                        placeholder="Confirm Password"
                        {...field}
                        type="password"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-600/70"
                >
                  {isLoading ? "Loading..." : "Reset Password"}
                </Button>
                <div className="signup">
                  <span className="signup">
                    Remembered your password?&nbsp;
                    <Link href="/login">Login</Link>
                  </span>
                </div>
              </form>
            </Suspense>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPasswordPage;
