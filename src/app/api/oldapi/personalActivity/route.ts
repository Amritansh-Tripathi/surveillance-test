import { connect } from '@/app/dbConfig/dbConfig';
import Activity from '@/models/oldmodels/activityModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const personId = searchParams.get('Person_id');

    if (!personId) {
      return NextResponse.json({ error: 'Person_id is required' }, { status: 400 });
    }

    const activities = await Activity.find({ Person_id: personId });

    if (!activities || activities.length === 0) {
      return NextResponse.json({ error: 'No activities found for this person' }, { status: 404 });
    }

    return NextResponse.json(activities, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 });
  }
}
