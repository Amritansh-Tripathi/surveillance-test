import mongoose, { Document } from "mongoose";

// Define a schema for the Excel data
const excelSchema = new mongoose.Schema({
  Name: String,
  ID: String,
  Department: String,
  Vehicle: String,
  Age: Number,
  Role: String,
  Status: Boolean,
  Snapshot: String, // Assuming snapshot is stored as base64 string
});

export interface ExcelDataInterface extends Document {
  Name: string;
  ID: string;
  Department: string;
  Vehicle: string;
  Age: number;
  Role: string;
  Status: boolean;
  Snapshot: string;
}

// Create a model for the Excel data
const ExcelData =
  mongoose.model < ExcelDataInterface > ("ExcelData", excelSchema);

export default ExcelData;
