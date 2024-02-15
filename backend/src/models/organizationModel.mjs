import mongoose from "mongoose";

const Schema = mongoose.Schema;

const organizationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    website: String,
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
