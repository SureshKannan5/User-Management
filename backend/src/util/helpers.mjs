import jwt from "jsonwebtoken";

export const generateToken = (userInfo) => {
  const token = jwt.sign({ ...userInfo }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  console.log("token", token);

  return token;
};
