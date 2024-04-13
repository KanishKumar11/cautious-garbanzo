"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const getEmail = async () => {
  try {
    const cookieStore = cookies();

    const token = cookieStore.get("token");
    const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
    console.log("hello");
    console.log(decodedToken);
    return token;
  } catch (error) {
    console.error("Error fetching email:", error);
    throw error;
  }
};

export default getEmail;
