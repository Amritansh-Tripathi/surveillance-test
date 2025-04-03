// app/api/capacity/route.ts
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

export async function GET() {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const collection = db.collection('live_capacity');

    const aggregationResult = await collection.aggregate([
      {
        $group: {
          _id: null,
          totalPerson: { $sum: '$Person' },
          totalVehicle: { $sum: '$Vehicle' },
          totalUnknown: { $sum: '$Unknown' },
        }
      }
    ]).toArray();

    await client.close();

    if (aggregationResult.length > 0) {
      const { totalPerson, totalVehicle, totalUnknown } = aggregationResult[0];
      return NextResponse.json({
        Personal: totalPerson,
        Vehicle: totalVehicle,
        Unknown: totalUnknown,
        Visitors: 0 // Placeholder for now
      });
    } else {
      return NextResponse.json({ message: 'No data found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ message: 'Error connecting to the database' }, { status: 500 });
  }
}