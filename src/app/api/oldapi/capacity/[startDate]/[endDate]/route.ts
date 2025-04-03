import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import Logs, { ILog } from '@/models/oldmodels/logModel';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

export const GET = async (req: NextRequest) => {
  try {
    // Extract startDate and endDate from the URL path
    const { pathname } = req.nextUrl;
    const pathSegments = pathname.split('/');
    const startDate = pathSegments[3];
    const endDate = pathSegments[4];

    // Log the received parameters
    console.log('Received startDate:', startDate);
    console.log('Received endDate:', endDate);

    // Check if startDate and endDate are present
    if (!startDate || !endDate) {
      console.error('Missing startDate or endDate parameter');
      return NextResponse.json({ error: 'Missing startDate or endDate parameter' }, { status: 400 });
    }

    // Convert startDate and endDate to timestamps
    const startTimestamp = parseInt(startDate, 10);
    const endTimestamp = parseInt(endDate, 10);

    // Check if the conversion to timestamps is successful
    if (isNaN(startTimestamp) || isNaN(endTimestamp)) {
      console.error('Invalid startDate or endDate format');
      return NextResponse.json({ error: 'Invalid startDate or endDate format' }, { status: 400 });
    }

    // Fetch logs within the specified date range
    const logs: ILog[] = await Logs.find({
      TimeStamp: { $gte: startTimestamp, $lte: endTimestamp }
    }).exec();

    // Calculate capacity based on specified rules
    let totalCapacity = {
      vehicle: 0,
      visitor: 0,
      unknown: 0,
      personal: 0
    };

    logs.forEach(log => {
      log.Details.forEach(detail => {
        if (detail.class === 'car' || detail.class === 'motorcycle') {
          totalCapacity.vehicle++;
        } else if (detail.class === 'person') {
          if (detail.INFO && (detail.INFO as any).Role === 'Visitor') {
            totalCapacity.visitor++;
          } else if (detail.Name === 'UNKNOWN') {
            totalCapacity.unknown++;
          } else {
            totalCapacity.personal++;
          }
        }
      });
    });

    // Return the total capacity as JSON response
    return NextResponse.json({ totalCapacity });
  } catch (error) {
    console.error('Error fetching capacity:', error);
    return NextResponse.json({ error: 'Failed to fetch capacity' }, { status: 500 });
  }
};
