import { connect } from '@/app/dbConfig/dbConfig';
import Visitors from '@/models/oldmodels/visitorModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connect();

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // Fetch all visitors from the "Visitors" collection
        const visitors = await Visitors.find();

        return NextResponse.json({ visitors });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const formData = await request.formData();

        // Extract form fields from formData
        const PhoneNumber = formData.get("PhoneNumber") as string;
        const Password = formData.get("Password") as string;
        const Base64 = formData.get("Base64") as string;
        const DeviceIP = formData.get("DeviceIP") as string;
        const Name = formData.get("Name") as string;
        const ID = formData.get("ID") as string;
        const Department = formData.get("Department") as string;
        const Vehicle = formData.get("Vehicle") as string;
        const VehicleNumber = formData.get("VehicleNumber") as string;
        const Age = Number(formData.get("Age"));
        const Role = formData.get("Role") as string;
        const Status = formData.get("Status") === "true";
        const Snapshot = formData.get("Snapshot") as string;
        const PurposeOfVisit = formData.get("PurposeOfVisit") as string;
        const VisitTime = new Date(formData.get("VisitTime") as string);

        // Check if the user already exists
        const existingVisitor = await Visitors.findOne({ PhoneNumber });

        if (existingVisitor) {
            return NextResponse.json({ error: "Visitor already exists" }, { status: 400 });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(Password, salt);

        // Create a new visitor document
        const newVisitor = new Visitors({
            PhoneNumber,
            Password: hashedPassword,
            Base64,
            DeviceIP,
            Name,
            ID,
            Department,
            Vehicle,
            VehicleNumber,
            Age,
            Role,
            Status,
            Snapshot,
            PurposeOfVisit,
            VisitTime
        });

        // Save the new visitor document
        const savedVisitor = await newVisitor.save();

        return NextResponse.json({
            message: "Visitor registered successfully",
            success: true,
            savedVisitor
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
