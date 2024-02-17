import express from "express";
import {
  authenticateJWT,
  authorizeAdmin,
} from "../middlewares/authmiddleware.mjs";
import {
  commonFieldValidator,
  organizationFormValidation,
} from "../Validator/validation.mjs";
import {
  createOrganization,
  deleteOrganizationById,
  fetchAllOrganization,
  fetchAllRoles,
  getAllData,
  getOrganizationById,
  updateOrganizationById,
} from "../controllers/organizationController.mjs";

const organizationRoutes = express.Router();

organizationRoutes.route("/listRoles").get(fetchAllRoles);

organizationRoutes
  .route("/getAllData")
  .get(authenticateJWT, authorizeAdmin, getAllData);

organizationRoutes.route("/listAllOrganizations").get(async (req, res) => {
  try {
    const organizations = await fetchAllOrganization();
    return res.json(organizations);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

organizationRoutes
  .route("/create")
  .post(
    authenticateJWT,
    authorizeAdmin,
    organizationFormValidation,
    commonFieldValidator,
    createOrganization
  );

organizationRoutes
  .route("/:id")
  .get(authenticateJWT, authorizeAdmin, getOrganizationById)
  .put(authenticateJWT, authorizeAdmin, updateOrganizationById)
  .delete(authenticateJWT, authorizeAdmin, deleteOrganizationById);

export default organizationRoutes;
