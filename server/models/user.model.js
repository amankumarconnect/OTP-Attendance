import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["student", "faculty"],
      required: true,
    },
    userID: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
