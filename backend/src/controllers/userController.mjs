import asyncHandler from "../middlewares/asyncHandlers.mjs";
import User from "../models/userModel.mjs";
import bcrypt from "bcrypt";
import { generateToken } from "../util/helpers.mjs";
import Role from "../models/roleSchema.mjs";
import Organization from "../models/organizationModel.mjs";

const createUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  const userExisits = await User.findOne({ email }).exec();

  if (userExisits)
    return res
      .status(400)
      .send("User already exists or belong to some other organization");

  const salt = await bcrypt.genSalt(10);

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

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email }).exec();

    const roleInstance = await Role.findById(existingUser.role).exec();

    if (existingUser) {
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (isPasswordValid) {
        const token = generateToken({
          sub: existingUser._id,
          userName: existingUser.fullName,
          role: roleInstance.name,
          access: roleInstance.privileges,
        });

        return res.status(200).json({ token });
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const userInfo = await req.user;

  const user = await User.findById(userInfo._id);

  const { _id, firstName, lastName, email, role, organization } = user;

  const roleInstance = await Role.findById(role);

  const organizationInstance = await Organization.findById(organization);

  if (user) {
    return res
      .json({
        firstName,
        lastName,
        email,
        role: roleInstance.name,
        organization: organizationInstance.name,
      })
      .status(200);
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

export { createUser, loginUser, getCurrentUserProfile };
