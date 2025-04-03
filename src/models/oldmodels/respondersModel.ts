import mongoose, { Model, Document } from "mongoose";

// Define an interface for the Responder document
interface IResponder extends Document {
  PhoneNumber: string;
  Password: string;
  Base64: string;
  DeviceIP: string;
  Name: string;
  Age: number;
  Role: string;
  Status: boolean;
  Snapshot: string; // Assuming snapshot is stored as base64 string
}

// Define a schema for the Responders collection
const responderSchema = new mongoose.Schema<IResponder>({
  PhoneNumber: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Base64: String,
  DeviceIP: String,
  Name: String,
  Age: Number,
  Role: String,
  Status: Boolean,
  Snapshot: String, // Assuming snapshot is stored as base64 string
});

// Check if the model already exists and create it if it doesn't
const Responders: Model<IResponder> = mongoose.models.Responders || mongoose.model<IResponder>("Responders", responderSchema);

export default Responders;
