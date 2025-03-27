import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: null },
    email: { type: String, default: null },
    phone: { type: String, default: null },
    profilePic: { type: String, default: null }, // Include profile picture
    department: { type: String, default: null },
    age: { type: Number, default: null },
    role: { type: String, default: null },
    status: { type: Boolean, default: true },
  },
  { collection: "users" } // Explicitly specify the collection name
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
