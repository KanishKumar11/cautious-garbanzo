"use client";
import React, { useState } from "react";
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

const formSchema = z.object({
  email: z
    .string({
      message: "Email is required",
    })
    .email({
      message: "Invalid email address.",
    }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
});

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const formData = form.getValues();
      const response = await axios.post("/backend/login-user", formData);
      const response2 = await axios.post("/api/login", {
        email: formData.email,
      });
      setIsLoading(false);
      toast.success("Login successful.");
      console.log(response);
      console.log(response2);
      router.push("/dashboard");
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to login. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center h-screen bg-[#007f95] overflow-hidden">
      <Toaster />
      <div className="container">
        <div className="registration form">
          <h1 className="text-4xl font-semibold text-center my-4">Login</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                className="mt-2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder="John@example.com" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                className="mt-2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <Input placeholder="********" {...field} type="password" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-600/70"
              >
                {isLoading ? "Loading..." : "Login"}
              </Button>
              <div className="signup">
                <span className="signup">
                  Don&#39;t have an account?&nbsp;
                  <Link href="/signup">Signup</Link>
                </span>
              </div>
              <div className="signup">
                <span className="signup">
                  Forgot your password?&nbsp;
                  <Link href="/forgot-password">Reset</Link>
                </span>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
