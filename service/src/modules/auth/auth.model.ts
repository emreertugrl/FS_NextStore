import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    name: {},
    email: {},
    password: {},
  },
  {}
);

const User = model("User", userSchema);

export default User;
