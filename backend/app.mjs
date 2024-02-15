import dotenv from "dotenv";
import connectDB from "./src/config/db.mjs";
import userRoutes from "./src/routes/userRoutes.mjs";
import express from "express";
import { BASE_API_URL } from "./src/util/constants.mjs";
import passport from "./src/config/passportConfig.mjs";

dotenv.config();

const port = process.env.PORT | 8080;

connectDB();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(`${BASE_API_URL}/user`, userRoutes);

app.listen(port, () => console.log(`Server running on port: ${port}`));
