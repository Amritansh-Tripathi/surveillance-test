import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  Password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  Base64: String,
  DeviceIP: String,
  Name: String,
});

// Use the existing model if it exists, or create a new one
const Admin = mongoose.models.Admin || mongoose.model("Admin", userSchema);

export default Admin;
