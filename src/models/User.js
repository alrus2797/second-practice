import { Schema, model, models } from "mongoose";

const userScheme = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    privilege: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

export default models.User || model("User", userScheme);
