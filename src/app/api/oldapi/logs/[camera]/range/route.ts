import { connect } from '@/app/dbConfig/dbConfig';
import Logs from '@/models/oldmodels/logModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request: NextRequest, { params }: { params: { camera: string } }) {
    try {
        const { searchParams } = new URL(request.url);
        const startTimestamp = Number(searchParams.get('start'));
        const endTimestamp = Number(searchParams.get('end'));
        const { camera } = params;

        if (isNaN(startTimestamp) || isNaN(endTimestamp)) {
            return NextResponse.json({ error: 'Invalid start or end timestamp' }, { status: 400 });
        }

        const logs = await Logs.find({
            Camera: camera,
            TimeStamp: { $gte: startTimestamp, $lte: endTimestamp }
        }).exec();

        return NextResponse.json(logs);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
