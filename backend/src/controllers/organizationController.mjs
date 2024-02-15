import asyncHandler from "../middlewares/asyncHandlers.mjs";
import Organization from "../models/organizationModel.mjs";

const createOrganization = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const companyExisits = await Organization.findOne({ email });

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
  const organization = await Organization.findById(req.params.id);

  if (organization) {
    res.json(organization);
  } else {
    res.status(404);
    throw new Error("Organization not found");
  }
});

export { createOrganization, getOrganizationById };
