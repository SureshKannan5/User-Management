import Role from "../src/models/roleSchema.mjs";
import connectDB from "../src/config/db.mjs";
import dotenv from "dotenv";
import Organization from "../src/models/organizationModel.mjs";
import { faker } from "@faker-js/faker";
import User from "../src/models/userModel.mjs";

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

    const dummyOrganizationRecords = Array.from({ length: 50 }, () => ({
      name: faker.company.name(),
      description: faker.company.catchPhrase(),
      website: faker.internet.url(),
      email: faker.internet.email(),
    }));

    await Organization.insertMany(dummyOrganizationRecords);

    console.log("Organization data's seeded 👍");
  } catch (error) {
    console.log(error);
    console.log("organization creation failed ❌");
  }
};

const seedUsers = async () => {
  console.log("seeding user data...");
  try {
    const collectionExists = await User.exists();

    if (collectionExists) {
      await User.deleteMany();
    }

    const getRandomItem = (array) => {
      return array[Math.floor(Math.random() * array.length)];
    };

    const generateUserWithRoleAndOrganization = (organizations, roleIds) => {
      const organizationId = getRandomItem(organizations)._id;
      const roleId = getRandomItem(roleIds);
      return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        organization: organizationId,
        role: roleId,
      };
    };

    const organizations = await Organization.find();
    const roles = await Role.find();

    const dummyUserRecords = Array.from({ length: 50 }, () =>
      generateUserWithRoleAndOrganization(
        organizations,
        roles.map((role) => role._id)
      )
    );

    await User.insertMany(dummyUserRecords);

    console.log("users data's seeded 👍");
  } catch (error) {
    console.log(error);
    console.log("user creation failed ❌");
  }
};
const setup = async () => {
  console.log("DB setup initialized");
  dotenv.config();
  try {
    await connectDB();
    await createRoles();
    await seedOrganizations();
    await seedUsers();

    process.exit();
  } catch (error) {
    console.log("setup failed");
    process.exit(1);
  }
};

setup();
