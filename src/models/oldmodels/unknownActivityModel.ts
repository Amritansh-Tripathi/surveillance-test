import mongoose, { Schema, Document, Model} from 'mongoose';
// import mongoose, { Model, Document } from "mongoose";

// Define the Activity interface
export interface IActivity extends Document {
  TimeStamp: number;
  Camera: string;
  Vehicle_type: string;
  Snapshot: string;
}

// Define the Activity schema
const ActivitySchema: Schema = new Schema({
  TimeStamp: { type: Number, required: true },
  Camera: { type: String, required: true },
  Vehicle_type: { type: String, required: true },
  Snapshot: { type: String, required: true }
});

// Correct the model assignment here
// export default mongoose.models.Activity || mongoose.model<IActivity>('Activity', ActivitySchema);

// Check if the model already exists and create it if it doesn't
const Activities: Model<IActivity> = mongoose.models.Activities || mongoose.model<IActivity>("Activities", ActivitySchema);

export default Activities;