import mongoose, { Model, Document } from "mongoose";

interface IConfiguration extends Document {
  Sidenav: boolean;
  VideoContainer: boolean;
  LiveLogs: boolean;
  LiveCaptions: boolean;
}

// Define a schema for the Configuration collection
const configurationSchema = new mongoose.Schema<IConfiguration>({
  Sidenav: { type: Boolean, required: true },
  VideoContainer: { type: Boolean, required: true },
  LiveLogs: { type: Boolean, required: true },
  LiveCaptions: { type: Boolean, required: true },
});

// Check if the model already exists and create it if it doesn't
const Configuration: Model<IConfiguration> = mongoose.models.Configuration || mongoose.model<IConfiguration>("Configuration", configurationSchema);

export default Configuration;
