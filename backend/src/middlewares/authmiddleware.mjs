import passport from "passport";
import Role from "../models/roleSchema.mjs";

export const authenticateJWT = passport.authenticate("jwt", { session: false });

export const authorizeAdmin = async (req, res, next) => {
  const user = await req.user;

  if (user && user.role?.name === "admin") {
    next();
  } else {
    res.status(401).send("Not authorized as an admin.");
  }
};
