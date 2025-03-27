import mongoose, { Model, Document } from "mongoose";

interface ICamera extends Document {
  Auth: {
    username: string;
    password: string;
  };
  CameraName: string;
  Floor: string;
  IP: string;
  Location: string;
  Url: string;
  topic: string;
  EntryExit: string;
}

// Define a schema for the Cameras collection
const cameraSchema = new mongoose.Schema<ICamera>({
  Auth: {
    username: String,
    password: String,
  },
  CameraName: String,
  Floor: String,
  IP: String,
  Location: String,
  Url: String,
  topic: String,
  EntryExit: String,
},
{ collection: "cameras" } // Explicitly specify the collection name
);

// Check if the model already exists and create it if it doesn't
const Cameras: Model<ICamera> = mongoose.models.Cameras || mongoose.model<ICamera>("Cameras", cameraSchema);

export default Cameras;
