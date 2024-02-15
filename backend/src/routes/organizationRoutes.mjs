import express from "express";
import {
  authenticateJWT,
  authorizeAdmin,
} from "../middlewares/authmiddleware.mjs";
import { organizationFormValidation } from "../util/constants.mjs";
import { commonFieldValidator } from "../Validator/validation.mjs";
import {
  createOrganization,
  getOrganizationById,
} from "../controllers/organizationController.mjs";

const origanizationRoutes = express.Router();

origanizationRoutes
  .route("/create")
  .post(
    authenticateJWT,
    authorizeAdmin,
    organizationFormValidation,
    commonFieldValidator,
    createOrganization
  );

origanizationRoutes.route("/:id").get(authenticateJWT, getOrganizationById);
//   .put(authenticateJWT, updateCurrentUserProfile);

export default origanizationRoutes;
