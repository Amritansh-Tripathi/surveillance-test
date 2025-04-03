import { connect } from '@/app/dbConfig/dbConfig';
import Activity from '@/models/oldmodels/activityModel';
import Personals from '@/models/oldmodels/personalModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // Fetch the latest 50 activities sorted by TimeStamp in descending order
        const activities = await Activity.find().sort({ TimeStamp: -1 }).limit(50);

        // Fetch personal details for each activity based on the personal's ID
        const activitiesWithDetails = await Promise.all(
            activities.map(async (activity) => {
                const result: any = activity.toObject();

                // Check if the activity is related to a vehicle
                if (activity.Vehicle_type) {
                    // If it's a vehicle, include the toolbar information
                    result.isVehicle = true;
                    result.toolbar = {
                        Vehicle_type: activity.Vehicle_type,
                        Camera: activity.Camera,
                        TimeStamp: activity.TimeStamp
                    };
                } else if (activity.Person_id) {
                    // If it's not a vehicle and has a Person_id, fetch personal details
                    const personal = await Personals.findOne({ Person_id: activity.Person_id });
                    result.isVehicle = false;
                    result.personalDetails = personal ? personal.toObject() : null;
                } else {
                    // Handle case where neither Vehicle_type nor Person_id is present
                    result.isVehicle = false;
                    result.personalDetails = null;
                }

                return result;
            })
        );

        return NextResponse.json({ activities: activitiesWithDetails });
    } catch (error: any) {
        console.error('Error fetching activities:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}