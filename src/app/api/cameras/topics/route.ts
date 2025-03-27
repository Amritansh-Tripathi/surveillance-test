import { connect } from '@/app/dbConfig/dbConfig';
import Cameras from '@/models/cameraModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request: NextRequest) {
    try {
        // Fetch only the "topic" field from all cameras in the "Camera" collection
        const cameraTopics = await Cameras.find().select('topic -_id'); // Fetch only the "topic" field and exclude the _id field

        return NextResponse.json({ topics: cameraTopics.map(camera => camera.topic) });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
