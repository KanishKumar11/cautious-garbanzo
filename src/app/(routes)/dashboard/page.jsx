"use client";
import ChatLog from "@/components/sections/dashboard/ChatLog";
import Details from "@/components/sections/dashboard/Details";
import Dialer from "@/components/sections/dashboard/Dialer";
import ManualTest from "@/components/sections/dashboard/ManualTest";
import Speech from "@/components/sections/dashboard/Speech";
import Transcription from "@/components/sections/dashboard/Transcription";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaUserCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
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
import axios from "axios";
import { useRouter } from "next/navigation";
import useGlobalStore from "@/store/store";
import Link from "next/link";
import getEmail from "@/helpers/getEmail";

const Page = () => {
  const [email, setEmail] = useState("");

  const getAndSetEmail = async () => {
    const tokenEmail = await getEmail();
    setEmail(tokenEmail);
    console.log(email);
  };
  getAndSetEmail();
  useEffect(() => {
    fetchUserDetails();
  }, [email]);
  const { user, setUser } = useGlobalStore();
  const router = useRouter();
  const handleLogoutClick = (e) => {
    e.stopPropagation();
  };
  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/logout");
      router.push("/");
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  // const getEmail = async () => {
  //   // "use server";
  //   try {
  //     const email = await axios.get("/api/email");
  //     setEmail(email);
  //     return email;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const fetchUserDetails = async () => {
    try {
      const backend = process.env.NEXT_PUBLIC_API_URL;
      // console.log(email);
      console.log(email);
      const response = await axios.post(`${backend}/get_user_details`, {
        email: email,
      });
      setUser(response.data.user);

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-start items-center h-full min-h-screen relative bg-blue-500/50 backdrop-blur-md  backdrop-sepia p-7 gap-8 flex-col w-full">
      <Toaster />
      <div className="flex w-full justify-between relative">
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
              <Link href="/profile">
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="cursor-pointer" disabled>
                Subscription
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <AlertDialog>
                  <AlertDialogTrigger
                    onClick={handleLogoutClick}
                    className="w-full"
                  >
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
      <div className="w-full flex justify-between gap-8 text-zinc-900 h-full">
        <div className="w-[30%] flex flex-1 flex-col h-full items-stretch gap-7">
          <Details />
          <div className="h-full flex-1">
            <Transcription />
          </div>
        </div>
        <div className="w-[40%] flex flex-col gap-7">
          <Dialer />
          <div className="h-full">
            <ChatLog />
          </div>
        </div>
        <div className="w-[30%] flex flex-col gap-7 flex-1">
          <ManualTest />
          <div className="h-full ">
            <Speech />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
