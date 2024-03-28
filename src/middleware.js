import { NextResponse } from "next/server";
import useAuthStore from "./store/AuthStore";
const protectedRoutes = ["/dashboard"];

export async function middleware(req) {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("token")?.value;
  if (token) useAuthStore.getState().login();
  if (!token && protectedRoutes.includes(path)) {
    // User is not logged in and trying to access a protected route
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (token && (path === "/login" || path === "/signup")) {
    // User is logged in and trying to access login/signup pages
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }
  // if (["/new-password"].includes(path)) {
  //   return NextResponse.redirect(new URL("/forgot-password", req.nextUrl));
  // }

  // Allow access to other routes
}

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/login",
    "/signup",
    "/forgot-password",
    "/new-password",
    "/verifyemail",
  ],
};
