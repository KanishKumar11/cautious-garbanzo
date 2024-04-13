import { getDataFromToken } from "@/helpers/getDataFromToken";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const token = (await req.cookies.get("token")?.value) || "";
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    const email = await decodedToken.email;
    console.log(email);
    return NextResponse.json({ message: "email:", email });
  } catch (err) {
    return NextResponse.json(err);
  }
}
