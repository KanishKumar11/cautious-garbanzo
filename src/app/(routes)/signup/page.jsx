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
import Footer from "@/components/Footer";
import useGlobalStore from "@/store/store";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  email: z
    .string({
      message: "Email is required",
    })
    .email({
      message: "Invalid email address.",
    }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
  discordUsername: z.string().min(2, {
    message: "Discord username must be at least 2 characters.",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
  waNumber: z.string(),
});

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      discordUsername: "",
      password: "",
      waNumber: "",
    },
  });
  const saveFormDataToSessionStorage = (formData) => {
    sessionStorage.setItem("signupFormData", JSON.stringify(formData));
  };
  const { setOtp } = useGlobalStore();

  const onSubmit = async () => {
    setIsLoading(true);
    toast.loading("Submitting...");

    try {
      const formData = form.getValues();
      const backend = process.env.NEXT_PUBLIC_API_URL;

      const response = await axios.post(`${backend}/register`, {
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        user_country: formData.country,
        user_discord: formData.discordUsername,
        password: formData.password,
        waNumber: formData.waNumber,
      });
      saveFormDataToSessionStorage(formData);

      setOtp(response.data.otp);
      setIsLoading(false);
      // console.log(response);
      toast.dismiss();
      toast.success("Registration successful. Please login.");
      router.push("/verifyemail");
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
      toast.dismiss();
      toast.error("Failed to register. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#007f95] p-5 pb-7">
      <Toaster />

      <div className="container">
        <div className="registration form">
          <h1 className="text-4xl font-semibold text-center my-4">Signup</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                className="mt-2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <Input placeholder="John" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                className="mt-2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <Input placeholder="Doe" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="country"
                className="mt-2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Input placeholder="Eg. England" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="waNumber"
                className="mt-2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Whatsapp Number(with country code)</FormLabel>
                    <Input placeholder="Eg. +44 117 2345678" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discordUsername"
                className="mt-2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discord username</FormLabel>
                    <Input placeholder="Eg. John#3366" {...field} />
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
                {isLoading ? "Loading..." : "SignUp"}
              </Button>
              <div className="signup">
                <span className="signup">
                  Already have an account?&nbsp;
                  <Link href="/login">Login</Link>
                </span>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
