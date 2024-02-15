import asyncHandler from "../middlewares/asyncHandlers.mjs";
import User from "../models/userModel.mjs";
import bycrypt from "bcrypt";
import { generateToken } from "../util/helpers.mjs";
import Role from "../models/roleSchema.mjs";

const createUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  console.log(req.body);

  const userExisits = await User.findOne({ email }).exec();

  if (userExisits)
    return res
      .status(400)
      .send("User already exists or belong to some other organization");

  const salt = await bycrypt.genSalt(10);

  const hashPassword = await bycrypt.hash(password, salt);

  const userInstance = new User({ ...req.body, password: hashPassword });

  try {
    await userInstance.save();

    const roleInstance = await Role.findById(role).exec();
    const token = generateToken({
      sub: userInstance._id,
      userName: userInstance.fullName,
      role: roleInstance.name,
      access: roleInstance.privileges,
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(400);
    console.log(error);
    throw new Error("Invalid user data");
  }
});

export { createUser };
