import mongoose, { Document, Model } from 'mongoose';

// Define an interface for the live capacity document
interface ILiveCapacity extends Document {
  Camera_id: mongoose.Schema.Types.ObjectId;
  Person: number;
  Vehicle: number;
  Unknown: number;
}

// Define the schema for live capacity
const liveCapacitySchema = new mongoose.Schema<ILiveCapacity>({
  Camera_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cameras',  // This refers to the Camera model
    required: true,
  },
  Person: {
    type: Number,
    default: 0,
  },
  Vehicle: {
    type: Number,
    default: 0,
  },
  Unknown: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

// Check if the model already exists and create it if it doesn't
const LiveCapacity: Model<ILiveCapacity> = mongoose.models.LiveCapacity || mongoose.model<ILiveCapacity>('LiveCapacity', liveCapacitySchema);

export default LiveCapacity;
