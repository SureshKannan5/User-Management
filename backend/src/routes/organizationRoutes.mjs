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
  fetchOrganizationMeta,
  getAllData,
  getOrganizationById,
  updateOrganizationById,
} from "../controllers/organizationController.mjs";

const organizationRoutes = express.Router();

organizationRoutes.route("/listRoles").get(fetchAllRoles);

organizationRoutes
  .route("/getAllData")
  .get(authenticateJWT, authorizeAdmin, getAllData);

organizationRoutes.route("/listMetaOrganizations").get(fetchOrganizationMeta);

organizationRoutes
  .route("/listAllOrganizations")
  .get(authenticateJWT, authorizeAdmin, async (req, res) => {
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
