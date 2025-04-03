import mongoose, { Model, Document } from "mongoose";

// Define an interface for the Personal document
interface IPersonal extends Document {
  PhoneNumber: string;
  Password: string;
  Base64: string;
  DeviceIP: string;
  Name: string;
  Person_id: string;
  Department: string;
  Vehicle: string;
  VehicleNumber: string;
  Age: number;
  Role: string;
  Status: boolean;
  ProfilePic: string; // Assuming snapshot is stored as base64 string
}

// Define a schema for the Personals collection
const personalSchema = new mongoose.Schema<IPersonal>({
  PhoneNumber: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Base64: String,
  DeviceIP: String,
  Name: String,
  Person_id: String,
  Department: String,
  Vehicle: String,
  VehicleNumber: String,
  Age: Number,
  Role: String,
  Status: Boolean,
  ProfilePic: String, // Assuming snapshot is stored as base64 string
});

// Correct the model name here
const Personals: Model<IPersonal> = mongoose.models.personals || mongoose.model<IPersonal>("personals", personalSchema);

export default Personals;
