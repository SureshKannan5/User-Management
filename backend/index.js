import dotenv from "dotenv";
import connectDB from "./config/db.js";
import express from "express";

dotenv.config();

const port = process.env.PORT | 8080;

connectDB();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Server running on port: ${port}`));
