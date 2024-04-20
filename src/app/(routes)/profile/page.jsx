"use client";
import React, { useEffect, useState } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaUserCircle } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
      waNumber: "",
    },
  });
  const { user, setUser, userEmail, setUserEmail } = useGlobalStore();
  form.setValue("firstName", user.first_name);
  form.setValue("lastName", user.last_name);
  form.setValue("email", user.email);
  form.setValue("country", user.user_country);
  form.setValue("discordUsername", user.discord_username);
  form.setValue("waNumber", user.waNumber);
  const fetchUserDetails = async () => {
    try {
      const backend = process.env.NEXT_PUBLIC_API_URL;
      const email = await axios.get("/api/email");
      // console.log(email.data.email);
      const response = await axios.post(`${backend}/get_user_details`, {
        email: userEmail,
      });
      setUser(response.data.user);

      // console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    // console.log(localStorage.getItem("userEmail"));
    setUserEmail(localStorage.getItem("userEmail"));
    fetchUserDetails();
  }, []);

  const onSubmit = async () => {
    setIsLoading(true);
    toast.loading("Updating...");

    try {
      const formData = form.getValues();
      const backend = process.env.NEXT_PUBLIC_API_URL;

      const response = await axios.post(`${backend}/update_profile`, {
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        user_country: formData.country,
        user_discord: formData.discordUsername,
        waNumber: formData.waNumber,
      });

      setIsLoading(false);
      // console.log(response);
      toast.dismiss();
      toast.success("Update successful.");
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
      toast.dismiss();
      toast.error("Failed to Update. Please try again.");
    }
  };
  const handleLogoutClick = (e) => {
    e.stopPropagation();
  };
  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/logout");
      router.push("/");
      // console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#007f95] p-5 pb-7 items-center justify-center flex flex-col">
      <Toaster />
      <div className="flex w-full justify-between fixed inset-0 py-5 px-7 bg-slate-100/70 h-auto max-h-max">
        <div>
          Hi, {user.first_name}&nbsp; {user.last_name}
        </div>
        <Link href="/dashboard" className="cursor-pointer">
          <h1 className="text-2xl font-bold text-zinc-900 cursor-pointer">
            Welcome to EdgeAi
          </h1>
        </Link>
        <div>
          <DropdownMenu asChild>
            <DropdownMenuTrigger className="text-3xl right-5 cursor-pointer">
              <FaUserCircle />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="right-1 absolute cursor-pointer min-w-[180px]">
              <DropdownMenuLabel>Hi {user.first_name}</DropdownMenuLabel>
              <span className="text-sm ml-2">{user.email}</span>
              <DropdownMenuSeparator />
              <Link href="/dashboard">
                <DropdownMenuItem className="cursor-pointer">
                  Dashboard
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="cursor-pointer" disabled>
                Subscription
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <AlertDialog>
                  <AlertDialogTrigger onClick={handleLogoutClick}>
                    Logout
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action will logout you from this device.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogout}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="container">
        <div className="registration form">
          <h1 className="text-4xl font-semibold text-center my-4">
            My Profile
          </h1>
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

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-600/70"
              >
                {isLoading ? "Updating..." : "Update"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
