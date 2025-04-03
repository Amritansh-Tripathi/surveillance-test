import { connect } from '@/app/dbConfig/dbConfig';
import Activity from '@/models/oldmodels/activityModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // Parse query parameters
        const url = new URL(request.url);
        const startTime = url.searchParams.get('startTime');
        const endTime = url.searchParams.get('endTime');

        // Validate time range parameters
        if (!startTime || !endTime) {
            return NextResponse.json({ error: 'Start time and end time are required' }, { status: 400 });
        }

        const startTimestamp = parseInt(startTime);
        const endTimestamp = parseInt(endTime);

        if (isNaN(startTimestamp) || isNaN(endTimestamp)) {
            return NextResponse.json({ error: 'Invalid time format' }, { status: 400 });
        }

        // Fetch vehicle activities within the specified time range
        const vehicleActivities = await Activity.find({
            Vehicle_type: { $exists: true, $ne: null },
            TimeStamp: { $gte: startTimestamp, $lte: endTimestamp }
        }).sort({ TimeStamp: -1 }).lean();

        console.log(`Fetched ${vehicleActivities.length} vehicles between ${new Date(startTimestamp * 1000)} and ${new Date(endTimestamp * 1000)}`);

        // Process and structure the vehicle data
        const processedVehicles = vehicleActivities.map(vehicle => ({
            id: vehicle._id.toString(),
            vehicleType: vehicle.Vehicle_type,
            lastDetectedAt: vehicle.TimeStamp,
            camera: vehicle.Camera,
            snapshot: vehicle.Snapshot
        }));

        // Group vehicles by type
        const vehiclesByType = processedVehicles.reduce((acc, vehicle) => {
            const type = vehicle.vehicleType || 'unknown';
            if (!acc[type]) {
                acc[type] = [];
            }
            acc[type].push(vehicle);
            return acc;
        }, {} as Record<string, typeof processedVehicles>);

        // Calculate counts
        const vehicleCounts = Object.entries(vehiclesByType).map(([type, vehicles]) => ({
            type,
            count: vehicles.length
        }));

        // Calculate total count and time range duration
        const totalCount = processedVehicles.length;
        const durationInSeconds = endTimestamp - startTimestamp;
        const durationInHours = durationInSeconds / 3600;

        return NextResponse.json({ 
            vehicles: processedVehicles,
            vehiclesByType,
            vehicleCounts,
            totalCount,
            timeRange: {
                start: new Date(startTimestamp * 1000).toISOString(),
                end: new Date(endTimestamp * 1000).toISOString(),
                durationInHours
            }
        });
    } catch (error: any) {
        console.error('Error fetching vehicles:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}