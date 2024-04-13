"use server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req, res) {
  try {
    const email = await getDataFromToken(req);
    console.log(email);
    return NextResponse.json({ email: email.email });
  } catch (err) {
    return NextResponse.json(err);
  }
}
