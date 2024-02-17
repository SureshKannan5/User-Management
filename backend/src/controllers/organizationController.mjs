import mongoose from "mongoose";
import asyncHandler from "../middlewares/asyncHandlers.mjs";
import Organization from "../models/organizationModel.mjs";
import Role from "../models/roleSchema.mjs";
import User from "../models/userModel.mjs";

const createOrganization = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const companyExisits = await Organization.findOne({ email }).exec();

  if (companyExisits)
    return res
      .status(400)
      .send("Organization already registered with this mail id");

  const origanizationInstance = new Organization({ ...req.body });

  try {
    await origanizationInstance.save();

    res.status(201).json(origanizationInstance);
  } catch (error) {
    res.status(400);
    console.log(error);
    throw new Error("Invalid  data");
  }
});

const getOrganizationById = asyncHandler(async (req, res) => {
  const organization = await Organization.findById(req.params.id).exec();

  if (organization) {
    res.json(organization);
  } else {
    res.status(404).json({ message: "Organization not found." });
  }
});

const updateOrganizationById = asyncHandler(async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id).exec();

    if (organization) {
      organization.name = req.body.name || organization.name;
      organization.website = req.body.website || organization.website;
      organization.email = req.body.email || organization.email;
      organization.description =
        req.body.description || organization.description;

      const response = await organization.save();

      res.json(response);
    } else {
      res.status(404).json({ message: "Organization not found." });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const deleteOrganizationById = asyncHandler(async (req, res) => {
  const organization = await Organization.findById(req.params.id).exec();

  if (organization) {
    await organization.deleteOne({ _id: organization._id });
    res.json({ message: "Organization removed" });
  } else {
    res.status(404).json({ message: "Organization not found." });
  }
});

const getAllData = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({})
      .select("-password")
      .populate(["role", "organization"])
      .exec();

    const organizations = await fetchAllOrganization();

    console.log(organizations);

    return res.json({ users, organizations });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

const fetchAllRoles = asyncHandler(async (req, res) => {
  try {
    const Roles = await Role.find().select(["name", "_id"]);

    res.json(Roles);
  } catch (error) {
    throw new Error(error);
  }
});

const fetchOrganizationMeta = asyncHandler(async (req, res) => {
  try {
    const Roles = await Organization.find().select(["name", "_id"]);
    res.json(Roles);
  } catch (error) {
    throw new Error(error);
  }
});

const fetchAllOrganization = async (filterValues) => {
  const { organization } = filterValues;

  try {
    const aggregatedQuery = [
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "organization",
          as: "users",
        },
      },
      {
        $addFields: {
          userCount: { $size: "$users" },
        },
      },
      {
        $project: {
          users: 0,
        },
      },
    ];

    if (organization?.length > 0) {
      let newId = organization.map((id) => new mongoose.Types.ObjectId(id));
      aggregatedQuery.push({
        $match: {
          _id: { $in: newId },
        },
      });
    }
    const organizations = await Organization.aggregate(aggregatedQuery);

    return organizations;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export {
  createOrganization,
  getOrganizationById,
  updateOrganizationById,
  deleteOrganizationById,
  getAllData,
  fetchAllOrganization,
  fetchAllRoles,
  fetchOrganizationMeta,
};
