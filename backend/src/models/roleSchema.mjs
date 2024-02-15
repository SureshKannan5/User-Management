import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  privileges: [String],
});

const Role = mongoose.model("Role", roleSchema);

export default Role;
