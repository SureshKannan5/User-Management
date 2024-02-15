import asyncHandler from "../middlewares/asyncHandlers.mjs";
import User from "../models/userModel.mjs";
import bycrypt from "bcrypt";

const createUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, role, organization } = req.body;

  console.log(req.body);

  const userExisits = await User.findOne({ email }).exec();

  console.log(userExisits);

  if (userExisits)
    return res
      .status(400)
      .send("User already exists or belong to some other organization");

  const salt = await bycrypt.genSalt(10);

  const hashPassword = await bycrypt.hash(password, salt);

  const newUser = new User({ ...req.body, password: hashPassword });

  try {
    await newUser.save();

    res.status(200).json({ message: "user created sucessfully" });
  } catch (error) {
    res.status(400);
    console.log(error);
    throw new Error("Invalid user data");
  }
});

export { createUser };
