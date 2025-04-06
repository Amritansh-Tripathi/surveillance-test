import { connect } from '@/app/dbConfig/dbConfig';
import Activity from '@/models/oldmodels/activityModel';
import Personals from '@/models/oldmodels/personalModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // ✅ Fetch all activities, sorted by TimeStamp (latest first)
        const activities = await Activity.find().sort({ TimeStamp: -1 }).lean();

        // ✅ Loop over each activity and add relevant details
        const activitiesWithDetails = await Promise.all(
            activities.map(async (activity) => {
                const result: any = { ...activity }; // Already a plain object due to .lean()

                if (activity.Vehicle_type) {
                    // 🚗 It's a vehicle
                    result.isVehicle = true;
                    result.toolbar = {
                        Vehicle_type: activity.Vehicle_type,
                        Camera: activity.Camera,
                        TimeStamp: activity.TimeStamp,
                    };
                } else if (activity.Person_id) {
                    // 👤 It's a personal activity
                    const personal = await Personals.findOne({ Person_id: activity.Person_id }).lean();
                    result.isVehicle = false;
                    result.personalDetails = personal || null;
                } else {
                    // ❓ Neither vehicle nor personal
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
