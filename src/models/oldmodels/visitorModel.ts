import mongoose, { Model, Document } from "mongoose";

// Define an interface for the Visitor document
interface IVisitor extends Document {
  PhoneNumber: string;
  Password: string;
  Base64: string;
  DeviceIP: string;
  Name: string;
  ID: string;
  Department: string;
  Vehicle: string;
  VehicleNumber: string;
  Age: number;
  Role: string;
  Status: boolean;
  Snapshot: string; // Assuming snapshot is stored as base64 string
  PurposeOfVisit: string;
  VisitTime: Date;
}

// Define a schema for the Visitors collection
const visitorSchema = new mongoose.Schema<IVisitor>({
  PhoneNumber: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Base64: String,
  DeviceIP: String,
  Name: String,
  ID: String,
  Department: String,
  Vehicle: String,
  VehicleNumber: String,
  Age: Number,
  Role: String,
  Status: Boolean,
  Snapshot: String, // Assuming snapshot is stored as base64 string
  PurposeOfVisit: String,
  VisitTime: { type: Date, default: Date.now }
});

// Check if the model already exists and create it if it doesn't
const Visitors: Model<IVisitor> = mongoose.models.Visitors || mongoose.model<IVisitor>("Visitors", visitorSchema);

export default Visitors;
