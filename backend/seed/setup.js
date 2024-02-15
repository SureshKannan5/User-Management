import Role from "../src/models/roleSchema.mjs";
import connectDB from "../src/config/db.mjs";
import dotenv from "dotenv";
import Organization from "../src/models/organizationModel.mjs";
import { faker } from "@faker-js/faker";

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
      // Clear existing organization
      await Organization.deleteMany();
    }

    // add new origanization data

    const dummyOrganizationRecords = Array.from({ length: 10 }, () => ({
      name: faker.company.name(),
      description: faker.company.catchPhrase(),
      website: faker.internet.url(),
      email: faker.internet.email(),
    }));

    await Organization.insertMany(dummyOrganizationRecords);

    console.log("Organization data's seeded 👍");
  } catch (error) {
    console.log("organization creation failed ❌");
  }
};

const setup = async () => {
  console.log("DB setup initialized");
  dotenv.config();
  try {
    await connectDB();
    await Promise.all([createRoles(), seedOrganizations()]);

    process.exit();
  } catch (error) {
    console.log("setup failed");
    process.exit(1);
  }
};

setup();
