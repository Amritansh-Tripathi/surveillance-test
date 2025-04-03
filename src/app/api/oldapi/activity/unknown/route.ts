import { connect } from '@/app/dbConfig/dbConfig';
import Activity from '@/models/oldmodels/unknownActivityModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // Fetch the latest 50 activities sorted by timestamp (or _id in descending order)
        const activities = await Activity.find().sort({ _id: -1 }).limit(10);

        return NextResponse.json({ activities });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
