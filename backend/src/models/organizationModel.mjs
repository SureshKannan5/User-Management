import mongoose from "mongoose";

const { Schema } = mongoose;

const organizationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: { type: String },
    website: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Organization = mongoose.model("Organization", organizationSchema);

export default Organization;
