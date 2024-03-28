import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const reqbody = await req.json();
  const email = reqbody.email;

  const secretKey = process.env.JWT_SECRET;
  const expiresIn = "1y";
  console.log(email);
  const user = {
    email,
  };

  const token = jwt.sign(user, secretKey, { expiresIn });

  const response = NextResponse.json({
    message: "Login successful",
    success: true,
  });
  response.cookies.set("token", token, {
    httpOnly: true,
    maxAge: 365 * 24 * 60 * 60,
    sameSite: "strict",
    path: "/",
  });

  return response;
}
