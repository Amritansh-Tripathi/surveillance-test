import { connect } from '@/app/dbConfig/dbConfig';
import Logs from '@/models/oldmodels/logModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET() {
    try {
        const logs = await Logs.find().exec();
        return NextResponse.json(logs);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
