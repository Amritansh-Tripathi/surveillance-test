import { connect } from '@/app/dbConfig/dbConfig';
import Activity from '@/models/oldmodels/activityModel';
import Personals from '@/models/oldmodels/personalModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

const ACTIVE_WINDOW_SECONDS = 600; // Consider persons active if detected in the last 5 minutes

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const currentTime = Date.now() / 1000; // Current time in seconds
        const activeThreshold = currentTime - ACTIVE_WINDOW_SECONDS;

        // Fetch recent activities within the active window
        const recentActivities = await Activity.find({
            Person_id: { $exists: true },
            TimeStamp: { $gte: activeThreshold }
        }).sort({ TimeStamp: -1 });

        // Extract unique Person_ids from recent activities
        const activePersonIds = [...new Set(recentActivities.map(activity => activity.Person_id))];

        // Fetch personal details for active persons
        const personals = await Personals.find({ Person_id: { $in: activePersonIds } });

        // Create a map of Person_id to personal details and latest activity
        const livePersonals = activePersonIds.map(personId => {
            const personal = personals.find(p => p.Person_id === personId);
            const latestActivity = recentActivities.find(a => a.Person_id === personId);
            
            return {
                Person_id: personId,
                personalDetails: personal ? personal.toObject() : null,
                lastDetectedAt: latestActivity ? latestActivity.TimeStamp : null,
                lastDetectedCamera: latestActivity ? latestActivity.Camera : null
            };
        });

        // Sort live personals by last detection time (most recent first)
        livePersonals.sort((a, b) => (b.lastDetectedAt || 0) - (a.lastDetectedAt || 0));

        return NextResponse.json({ 
            livePersonals,
            totalCount: livePersonals.length,
            asOf: currentTime
        });
    } catch (error: any) {
        console.error('Error fetching live personals:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}