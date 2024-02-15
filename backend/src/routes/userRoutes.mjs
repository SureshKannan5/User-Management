import express from "express";
import { createUser } from "../controllers/userController.mjs";
import { signUpValidator } from "../Validator/validation.mjs";
import { signUpValidationRules } from "../util/constants.mjs";

const userRoutes = express.Router();

userRoutes
  .route("/create")
  .post(signUpValidationRules, signUpValidator, createUser);

export default userRoutes;
