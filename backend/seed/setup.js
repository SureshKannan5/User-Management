import asyncHandler from "../src/middlewares/asyncHandlers.mjs";
import Role from "../src/models/roleSchema.mjs";
import connectDB from "../src/config/db.mjs";
import dotenv from "dotenv";

const createRoles = async () => {
  console.log("Role Creation in progress...");

  const roleArray = [
    {
      name: "admin",
      privileges: ["read", "write"],
    },
    {
      name: "user",
      privileges: ["read"],
    },
  ];

  try {
    const collectionExists = await Role.exists();

    if (collectionExists) {
      // Clear existing roles
      await Role.deleteMany();
    }

    // add new roles

    await Role.insertMany(roleArray);

    console.log("Role Creation Completed 👍");
  } catch (error) {
    console.log("Role Creation failed ❌");
  }
};

const seedOrganizations = async () => {};

const setup = async () => {
  console.log("DB setup initialized");
  dotenv.config();
  try {
    await connectDB();
    await createRoles();
    process.exit();
  } catch (error) {
    console.log("setup failed");
    process.exit(1);
  }
};

setup();
