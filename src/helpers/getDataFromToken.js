import jwt from "jsonwebtoken";
export const getDataFromToken = (req) => {
  try {
    const token = req.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decodedToken);
    return decodedToken.email;
  } catch (error) {
    throw new Error(error.message);
  }
};
