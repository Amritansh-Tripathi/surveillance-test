// src/app/api/cameras/route.ts
import { connect } from '@/app/dbConfig/dbConfig';
import Cameras from '@/models/cameraModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request: NextRequest) {
  try {
    // Fetch all cameras
    const cameras = await Cameras.find().lean(); // Use `lean()` to improve read performance

    return NextResponse.json({ success: true, cameras: cameras });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
