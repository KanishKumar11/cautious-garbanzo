"use server";
const getEmail = async () => {
  try {
    const response = await fetch("/api/email");

    const data = await response.json();

    if (!data || !data.decodedToken || !data.decodedToken.email) {
      throw new Error("Email not found in response");
    }
    console.log(data);
    console.log(data.decodedToken.email);
    return data.decodedToken.email;
  } catch (error) {
    console.error("Error fetching email:", error);
    throw error;
  }
};

export default getEmail;
