import { connect } from '@/app/dbConfig/dbConfig';
import Configuration from '@/models/oldmodels/configurationModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request: NextRequest) {
    try {
        // Fetch the configuration from the "Configuration" collection
        const configuration = await Configuration.findOne();

        return NextResponse.json({ configuration });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
