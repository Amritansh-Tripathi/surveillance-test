import mongoose, { Schema, Document, model, Model } from 'mongoose';

// Define the vehicle document interface
export interface IVehicle extends Document {
  Vehicle: string;
  VehicleNumber: string;
  Snapshot: string;
  OwnerName: string;
  OwnerContactNumber: string;
  Status: boolean;
}

// Define the vehicle schema
const vehicleSchema = new Schema<IVehicle>({
  Vehicle: { type: String, required: true },
  VehicleNumber: { type: String, required: true, unique: true },
  Snapshot: { type: String },
  OwnerName: { type: String, required: true },
  OwnerContactNumber: { type: String, required: true },
  Status: { type: Boolean, default: true }
});

// Check if the model already exists before creating a new one
export const Vehicles: Model<IVehicle> = mongoose.models.Vehicle || model<IVehicle>('Vehicle', vehicleSchema);