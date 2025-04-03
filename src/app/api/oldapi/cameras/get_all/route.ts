import { connect } from '@/app/dbConfig/dbConfig';
import Cameras from '@/models/oldmodels/cameraModel';
import { NextRequest, NextResponse } from 'next/server';


connect();

export async function GET(request: NextRequest) {
    try {
        // Fetch all cameras from the "Camera" collection
        const cameras = await Cameras.find();

        return NextResponse.json({ cameras });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

