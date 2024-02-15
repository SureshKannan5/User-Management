import express from "express";
import {
  createUser,
  getCurrentUserProfile,
  loginUser,
} from "../controllers/userController.mjs";
import { commonFieldValidator } from "../Validator/validation.mjs";
import {
  signInValidationRules,
  signUpValidationRules,
} from "../util/constants.mjs";
import { authenticateJWT } from "../middlewares/authmiddleware.mjs";

const userRoutes = express.Router();

userRoutes
  .route("/create")
  .post(signUpValidationRules, commonFieldValidator, createUser);

userRoutes
  .route("/auth")
  .post(signInValidationRules, commonFieldValidator, loginUser);

userRoutes.route("/profile").get(authenticateJWT, getCurrentUserProfile);

export default userRoutes;
