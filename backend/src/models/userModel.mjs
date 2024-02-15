import mongoose from "mongoose";

const Schema = mongoose.Schema;

const {
  Types: { ObjectId },
} = Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: ObjectId,
      ref: "Role",
      required: true,
    },
    organization: {
      type: ObjectId,
      ref: "Organization",
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});
const User = mongoose.model("User", userSchema);

export default User;
