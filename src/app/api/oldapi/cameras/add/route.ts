import { connect } from '@/app/dbConfig/dbConfig';
import Cameras from '@/models/oldmodels/cameraModel';
import { NextRequest, NextResponse } from 'next/server';


connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { Auth, CameraName, Floor, IP, Location, EntryExit, Url, topic } = reqBody;

        // Check if the camera already exists
        const existingCamera = await Cameras.findOne({ CameraName });

        if (existingCamera) {
            return NextResponse.json({ error: "Camera already exists" }, { status: 400 });
        }

        // Create a new camera document
        const newCamera = new Cameras({
            Auth,
            CameraName,
            Floor,
            IP,
            Location,
            Url,
            topic,
            EntryExit: EntryExit,
        });
        
        // Save the new camera document
        const savedCamera = await newCamera.save();

        return NextResponse.json({
            message: "Camera added successfully",
            success: true,
            savedCamera
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
