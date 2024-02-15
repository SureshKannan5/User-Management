import { validationResult } from "express-validator";

export const signUpValidator = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};
