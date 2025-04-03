import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import Logs, { ILog } from '@/models/oldmodels/logModel';
import mongoose from 'mongoose';
import { connect } from '@/app/dbConfig/dbConfig';

const { ObjectId } = mongoose.Types;

interface DepartmentCapacity {
  [department: string]: {
    personal: number;
    visitor: number;
  };
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

    // Initialize department capacity data structure
    let departmentCapacity: DepartmentCapacity = {};

    // Populate department capacity data
    logs.forEach(log => {
      log.Details.forEach(detail => {
        if (detail.class === 'person') {
          const department = (detail.INFO && (detail.INFO as any).Department) || 'Unknown';
          if (!departmentCapacity[department]) {
            departmentCapacity[department] = { personal: 0, visitor: 0 };
          }
          if (detail.INFO && (detail.INFO as any).Role === 'Visitor') {
            departmentCapacity[department].visitor++;
          } else {
            departmentCapacity[department].personal++;
          }
        }
      });
    });

    // Return the department capacity data as JSON response
    return NextResponse.json({ departmentCapacity });
  } catch (error) {
    console.error('Error fetching department capacity:', error);
    return NextResponse.json({ error: 'Failed to fetch department capacity' }, { status: 500 });
  }
};
