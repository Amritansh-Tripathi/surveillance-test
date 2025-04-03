import { connect } from '@/app/dbConfig/dbConfig';
import Responders from '@/models/oldmodels/respondersModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connect();

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // Fetch all responders from the "Responders" collection
        const responders = await Responders.find();

        return NextResponse.json({ responders });
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
        const Age = Number(formData.get("Age"));
        const Status = formData.get("Status") === "true";
        const Snapshot = formData.get("Snapshot") as string;

        // Check if the responder already exists
        const existingResponder = await Responders.findOne({ PhoneNumber });

        if (existingResponder) {
            return NextResponse.json({ error: "Responder already exists" }, { status: 400 });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(Password, salt);

        // Create a new responder document with role set to "Responder"
        const newResponder = new Responders({
            PhoneNumber,
            Password: hashedPassword,
            Base64,
            DeviceIP,
            Name,
            Age,
            Role: "Responder",
            Status,
            Snapshot
        });

        // Save the new responder document
        const savedResponder = await newResponder.save();

        return NextResponse.json({
            message: "Responder registered successfully",
            success: true,
            savedResponder
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
    try {
        const formData = await request.formData();

        // Extract form fields from formData
        const PhoneNumber = formData.get("PhoneNumber") as string;
        const Password = formData.get("Password") as string;
        const Base64 = formData.get("Base64") as string;
        const DeviceIP = formData.get("DeviceIP") as string;
        const Name = formData.get("Name") as string;
        const Age = Number(formData.get("Age"));
        const Status = formData.get("Status") === "true";
        const Snapshot = formData.get("Snapshot") as string;

        // Find the responder by phone number
        const existingResponder = await Responders.findOne({ PhoneNumber });

        if (!existingResponder) {
            return NextResponse.json({ error: "Responder not found" }, { status: 404 });
        }

        // Update responder details
        existingResponder.Password = Password ? await bcryptjs.hash(Password, await bcryptjs.genSalt(10)) : existingResponder.Password;
        existingResponder.Base64 = Base64 ?? existingResponder.Base64;
        existingResponder.DeviceIP = DeviceIP ?? existingResponder.DeviceIP;
        existingResponder.Name = Name ?? existingResponder.Name;
        existingResponder.Age = Age ?? existingResponder.Age;
        existingResponder.Status = Status ?? existingResponder.Status;
        existingResponder.Snapshot = Snapshot ?? existingResponder.Snapshot;

        // Save the updated responder document
        const updatedResponder = await existingResponder.save();

        return NextResponse.json({
            message: "Responder updated successfully",
            success: true,
            updatedResponder
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(request.url);
        const phoneNumber = searchParams.get('PhoneNumber');

        if (!phoneNumber) {
            return NextResponse.json({ error: "PhoneNumber is required" }, { status: 400 });
        }

        // Find and remove the responder by phone number
        const deletedResponder = await Responders.findOneAndDelete({ PhoneNumber: phoneNumber });

        if (!deletedResponder) {
            return NextResponse.json({ error: "Responder not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Responder removed successfully",
            success: true,
            deletedResponder
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
