"use server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function isUserAuthenticated(req) {
  const cookieStore = cookies();

  const token = cookieStore.get("token");

  return !!token; // Return true if token is present, false otherwise
}
