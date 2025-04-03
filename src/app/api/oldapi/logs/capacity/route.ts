import { NextResponse } from 'next/server';
import { connect } from '@/app/dbConfig/dbConfig';
import Logs from '@/models/oldmodels/logModel';

connect();

export async function GET() {
  try {
    // Fetch the latest log
    const latestLog = await Logs.findOne().sort({ TimeStamp: -1 }).lean();
    console.log(latestLog);
    if (!latestLog) {
      return NextResponse.json({ error: 'No logs found' }, { status: 404 });
    }

    // Initialize counters
    let vehicleCount = 0;
    let visitorCount = 0;
    let unknownCount = 0;
    let personalCount = 0;

    // Iterate through the details in the latest log
    latestLog.Details.forEach((detail: any) => {
      if (detail.class === 'car' || detail.class === 'motorcycle') {
        vehicleCount++;
      } else if (detail.class === 'person') {
        if (detail.Type === 'Visitor') {//Type
          visitorCount++;
        } else if (detail.Type === 'Unknown') {
          unknownCount++;
        } else if (detail.Type === 'Personal') {
          personalCount++;
        }
      }
    });

    // Return the counts
    return NextResponse.json({
      vehicleCount,
      visitorCount,
      unknownCount,
      personalCount,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
