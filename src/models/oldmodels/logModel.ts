import mongoose, { Model, Document } from "mongoose";

interface IDetail extends Document {
  class: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  id: number;
  Name: string;
  Data: string;
  Snapshot: string;
  img_path: string;
  INFO: Record<string, any> | string; // INFO can be either a JSON object or an empty string
}

const detailSchema = new mongoose.Schema<IDetail>({
  class: { type: String, required: true },
  confidence: { type: Number, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  color: { type: String, required: true },
  id: { type: Number, required: true },
  Name: { type: String, default: "UNKNOWN" },
  Data: { type: String, default: "" },
  Snapshot: { type: String, default: "" },
  img_path: { type: String, required: true },
  INFO: { type: mongoose.Schema.Types.Mixed } // Use Mixed type for INFO to allow any structure
});

interface ILog extends Document {
  TimeStamp: number;
  Camera: string;
  Details: IDetail[];
}

const logSchema = new mongoose.Schema<ILog>({
  TimeStamp: { type: Number, required: true },
  Camera: { type: String, required: true },
  Details: [detailSchema]
});

const Logs: Model<ILog> = mongoose.models.logs || mongoose.model<ILog>("logs", logSchema);

// Use `export type` for the ILog interface
export type { ILog };
export default Logs;
