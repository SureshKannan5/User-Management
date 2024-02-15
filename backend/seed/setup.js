import asyncHandler from "../src/middlewares/asyncHandlers.js";
import Role from "../src/models/roleSchema.mjs";
import connectDB from "../src/config/db.mjs";
import dotenv from "dotenv";
import Organization from "../src/models/organizationModel.mjs";

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

const seedOrganizations = async () => {
  console.log("seeding organizations data...");
  try {
    const collectionExists = await Organization.exists();

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
