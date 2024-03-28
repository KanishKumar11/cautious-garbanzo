import { getDataFromToken } from "@/helpers/getDataFromToken";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const email = await getDataFromToken(req);
    console.log(email);
    return NextResponse.json({ message: "email:", email });
  } catch (err) {
    return NextResponse.json(err);
  }
}
