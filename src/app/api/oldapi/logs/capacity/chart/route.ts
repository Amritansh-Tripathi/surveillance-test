import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import Logs, { ILog } from '@/models/oldmodels/logModel';
import mongoose from 'mongoose';
import { connect } from '@/app/dbConfig/dbConfig';

const { ObjectId } = mongoose.Types;

interface CapacityEntry {
  date: string;
  count: number;
}

interface CapacityData {
  vehicle: CapacityEntry[];
  visitor: CapacityEntry[];
  unknown: CapacityEntry[];
  personal: CapacityEntry[];
}

export const GET = async (req: NextRequest) => {
  try {
    // Ensure database connection
    await connect();

    // Get the current date as a timestamp
    const currentDate = Math.floor(Date.now() / 1000);

    // Fetch the last log entry to get the last date available
    const lastLog = await Logs.findOne().sort({ TimeStamp: -1 }).exec();
    if (!lastLog) {
      return NextResponse.json({ error: 'No logs found' }, { status: 404 });
    }
    const lastDateAvailable = lastLog.TimeStamp;

    // Fetch logs from the last date available to the current date
    const logs: ILog[] = await Logs.find({
      TimeStamp: { $gte: lastDateAvailable, $lte: currentDate }
    }).exec();

    // Initialize capacity data structure
    let capacityData: CapacityData = {
      vehicle: [],
      visitor: [],
      unknown: [],
      personal: []
    };

    // Populate capacity data
    logs.forEach(log => {
      const date = new Date(log.TimeStamp * 1000).toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
      let capacities = {
        vehicle: 0,
        visitor: 0,
        unknown: 0,
        personal: 0
      };

      log.Details.forEach(detail => {
        if (detail.class === 'car' || detail.class === 'motorcycle') {
          capacities.vehicle++;
        } else if (detail.class === 'person') {
          if (detail.INFO && (detail.INFO as any).Role === 'Visitor') {
            capacities.visitor++;
          } else if (detail.Name === 'UNKNOWN') {
            capacities.unknown++;
          } else {
            capacities.personal++;
          }
        }
      });

      capacityData.vehicle.push({ date, count: capacities.vehicle });
      capacityData.visitor.push({ date, count: capacities.visitor });
      capacityData.unknown.push({ date, count: capacities.unknown });
      capacityData.personal.push({ date, count: capacities.personal });
    });

    // Return the capacity data as JSON response
    return NextResponse.json({ capacityData });
  } catch (error) {
    console.error('Error fetching capacity:', error);
    return NextResponse.json({ error: 'Failed to fetch capacity' }, { status: 500 });
  }
};
