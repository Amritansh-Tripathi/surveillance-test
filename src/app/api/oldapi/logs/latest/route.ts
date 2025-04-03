// import { connect } from '@/app/dbConfig/dbConfig';
// import Logs from '@/models/oldmodels/logModel';
// import { NextRequest, NextResponse } from 'next/server';

// connect();

// export async function GET() {
//     try {
//         const latestLog = await Logs.findOne().sort({ TimeStamp: -1 }).exec();
//         if (!latestLog) {
//             return NextResponse.json([]);
//         }
//         const latestTimestamp = latestLog.TimeStamp;
//         const logs = await Logs.find({ TimeStamp: latestTimestamp }).exec();
//         return NextResponse.json(logs);
//     } catch (error: any) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }

import { connect } from '@/app/dbConfig/dbConfig';
import Logs, { ILog } from '@/models/oldmodels/logModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // Fetch the latest log entry by timestamp
        const latestLog: ILog | null = await Logs.findOne().sort({ TimeStamp: -1 }).exec();

        // If no logs are found, return an empty array
        if (!latestLog) {
            return NextResponse.json([]);
        }

        // Get the latest timestamp
        const latestTimestamp = latestLog.TimeStamp;

        // Find all logs with the same timestamp as the latest log
        const logs: ILog[] = await Logs.find({ TimeStamp: latestTimestamp }).exec();

        // Return the logs as JSON
        return NextResponse.json(logs);
    } catch (error: any) {
        console.error('Error fetching logs:', error);
        // Return an error response with status 500
        return NextResponse.json({ error: 'An error occurred while fetching logs. Please try again later.' }, { status: 500 });
    }
}
