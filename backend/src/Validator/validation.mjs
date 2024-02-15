import { validationResult } from "express-validator";

import { body } from "express-validator";

export const signUpValidationRules = [
  body("firstName").notEmpty(),
  body("lastName").notEmpty(),
  body("email").isEmail(),
  body("password").notEmpty(),
  body("role").notEmpty(),
  body("organization").notEmpty(),
];

export const signInValidationRules = [
  body("email").isEmail(),
  body("password").notEmpty(),
];

export const organizationFormValidation = [
  body("name").notEmpty(),
  body("website").isURL(),
  body("email").isEmail(),
];
export const commonFieldValidator = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};
