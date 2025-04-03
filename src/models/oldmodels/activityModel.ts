import mongoose, { Schema, Document } from 'mongoose';

// Define the Activity interface
export interface IActivity extends Document {
  TimeStamp: number;
  Camera: string;
  Type: string;
  Status: boolean;
  Person_id: string;
  Snapshot: string;
}

// Define the Activity schema
const ActivitySchema: Schema = new Schema({
  TimeStamp: { type: Number, required: true },
  Camera: { type: String, required: true },
  Type: { type: String, required: true },
  Status: { type: Boolean, required: true },
  Person_id: { type: String, required: true },
  Snapshot: { type: String, required: true }
});

// Correct the model assignment here
export default mongoose.models.Activity || mongoose.model<IActivity>('Activity', ActivitySchema);
