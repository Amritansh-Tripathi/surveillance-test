//api/personals/route.ts
import { connect } from '@/app/dbConfig/dbConfig';
import Personals from '@/models/oldmodels/personalModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connect();

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // Extract the `id` query parameter from the URL
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        // If `id` is provided, fetch the specific personal, otherwise fetch all
        if (id) {
            const personal = await Personals.findOne({ Person_id: id });
            if (!personal) {
                return NextResponse.json({ error: 'Personal not found' }, { status: 404 });
            }
            return NextResponse.json({ personal });
        } else {
            // Fetch all personals if no `id` is provided
            const personals = await Personals.find();
            return NextResponse.json({ personals });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const formData = await request.formData();
        const formEntries = Object.fromEntries(formData);

        // Extract and ensure `Password` is a string
        const {
            Password,
            Base64,
            DeviceIP,
            Name,
            Person_id,
            Department,
            Vehicle,
            VehicleNumber,
            Age,
            Role,
            Status,
            Snapshot
        } = formEntries as {
            Password: FormDataEntryValue,
            Base64: FormDataEntryValue,
            DeviceIP: FormDataEntryValue,
            Name: FormDataEntryValue,
            Person_id: FormDataEntryValue,
            Department: FormDataEntryValue,
            Vehicle: FormDataEntryValue,
            VehicleNumber: FormDataEntryValue,
            Age: FormDataEntryValue,
            Role: FormDataEntryValue,
            Status: FormDataEntryValue,
            Snapshot: FormDataEntryValue
        };

        if (typeof Password !== 'string') {
            return NextResponse.json({ error: "Invalid password format" }, { status: 400 });
        }

        // Check if personal already exists
        const existingPersonal = await Personals.findOne({ Person_id });
        if (existingPersonal) {
            return NextResponse.json({ error: "Personal already exists" }, { status: 400 });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(Password, salt);

        // Create a new Personal record
        const newPersonal = new Personals({
            Person_id,
            Password: hashedPassword,
            Base64,
            DeviceIP,
            Name,
            Department,
            Vehicle,
            VehicleNumber,
            Age,
            Role,
            Status: Status === "true", // Convert Status string to boolean
            Snapshot,
        });

        const savedUser = await newPersonal.save();

        return NextResponse.json({
            message: "Personal registered successfully",
            success: true,
            savedUser,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function PATCH(request: NextRequest): Promise<NextResponse> {
    try {
        const { Person_id, Status } = await request.json();

        // Ensure the Status is a boolean
        const statusBoolean = Status === true || Status === "true";

        // Find the personal by Person_id and update the status
        const updatedPersonal = await Personals.findOneAndUpdate(
            { Person_id }, // Find the document with this Person_id
            { $set: { Status: statusBoolean } }, // Ensure the status is updated correctly
            { new: true } // Return the updated document
        );

        if (!updatedPersonal) {
            return NextResponse.json({ error: "Personal not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Status updated successfully",
            success: true,
            updatedPersonal,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
