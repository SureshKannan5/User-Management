import dotenv from "dotenv";
import connectDB from "./src/config/db.mjs";
import userRoutes from "./src/routes/userRoutes.mjs";
import express from "express";
import { BASE_API_URL } from "./src/util/constants.mjs";
import passport from "./src/config/passportConfig.mjs";
import origanizationRoutes from "./src/routes/organizationRoutes.mjs";
import cors from "cors";

dotenv.config();

const port = process.env.PORT | 8080;

connectDB();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(`${BASE_API_URL}/user`, userRoutes);

app.use(`${BASE_API_URL}/admin/organization`, origanizationRoutes);

app.listen(port, () => console.log(`Server running on port: ${port}`));
