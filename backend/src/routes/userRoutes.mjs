import express from "express";
import {
  createUser,
  getCurrentUserProfile,
  loginUser,
  updateCurrentUserProfile,
  getUserById,
  deleteUserById,
  updateUserById,
  listUsers,
} from "../controllers/userController.mjs";
import { commonFieldValidator } from "../Validator/validation.mjs";
import {
  signInValidationRules,
  signUpValidationRules,
} from "../Validator/validation.mjs";
import {
  authenticateJWT,
  authorizeAdmin,
} from "../middlewares/authmiddleware.mjs";

const userRoutes = express.Router();

userRoutes
  .route("/create")
  .post(signUpValidationRules, commonFieldValidator, createUser);

userRoutes
  .route("/auth")
  .post(signInValidationRules, commonFieldValidator, loginUser);

userRoutes
  .route("/profile")
  .get(authenticateJWT, getCurrentUserProfile)
  .put(authenticateJWT, updateCurrentUserProfile);

// ADMIN ROUTES

userRoutes
  .route("/listAllUsers")
  .get(authenticateJWT, authorizeAdmin, listUsers);

userRoutes
  .route("/:id")
  .delete(authenticateJWT, authorizeAdmin, deleteUserById)
  .get(authenticateJWT, authorizeAdmin, getUserById)
  .put(authenticateJWT, authorizeAdmin, updateUserById);

export default userRoutes;
