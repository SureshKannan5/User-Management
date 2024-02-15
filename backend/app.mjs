import dotenv from "dotenv";
import connectDB from "./src/config/db.mjs";
import userRoutes from "./src/routes/userRoutes.mjs";
import express from "express";
import { BASE_API_URL } from "./src/util/constants.mjs";

dotenv.config();

const port = process.env.PORT | 8080;

connectDB();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(`${BASE_API_URL}/users`, userRoutes);

app.listen(port, () => console.log(`Server running on port: ${port}`));
