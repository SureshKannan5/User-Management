import asyncHandler from "../middlewares/asyncHandlers.mjs";
import User from "../models/userModel.mjs";
import bcrypt from "bcrypt";
import { generateToken } from "../util/helpers.mjs";
import Role from "../models/roleSchema.mjs";

const createUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  const userExisits = await User.findOne({ email });

  if (userExisits)
    return res
      .status(400)
      .send("User already exists or belong to some other organization");

  const salt = await bcrypt.genSalt(10);

  const hashPassword = await bcrypt.hash(password, salt);

  const userInstance = new User({ ...req.body, password: hashPassword });

  try {
    await userInstance.save();

    const roleInstance = await Role.findById(role);
    const token = generateToken({
      sub: userInstance._id,
      userName: userInstance.fullName,
      role: roleInstance.name,
      access: roleInstance.privileges,
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(404).json({ message: "Invalid User Data" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    const roleInstance = await Role.findById(existingUser.role);

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

        return res.json({ token });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const userInfo = await req.user;

  const user = await User.findById(userInfo._id);

  if (userInfo) {
    const { role, organization } = userInfo;
    return res.json({
      _id: userInfo._id,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      role: role.name,
      organization: organization.name,
    });
  } else {
    res.status(404);
    res.status(404).json({ message: "User not found" });
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const userInfo = await req.user;

  const user = await User.findById(userInfo._id).populate([
    "role",
    "organization",
  ]);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    const { _id, firstName, lastName, email, role, organization } = updatedUser;

    res.json({
      _id,
      firstName,
      lastName,
      email,
      role: role.name,
      organization: organization.name,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate("role");

  if (user) {
    if (user.role.name === "admin") {
      res.status(400);
      throw new Error("Cannot delete admin user");
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    res.status(404).json({ message: "User not found" });
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    .populate(["role", "organization"]);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
      user.organization = req.body.organization || user.organization;

      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user.password = hashedPassword;
      }

      const updatedUser = await user.save();

      const response = await updatedUser.populate("organization");

      res.json(response);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

export {
  createUser,
  loginUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  getUserById,
  updateUserById,
  deleteUserById,
};
