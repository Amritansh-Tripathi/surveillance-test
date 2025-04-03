import { connect } from '@/app/dbConfig/dbConfig';
import Activity from '@/models/oldmodels/activityModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

const ACTIVE_WINDOW_SECONDS = 600; // Consider vehicles active if detected in the last 10 minutes

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const currentTime = Date.now() / 1000; // Current time in seconds
        const activeThreshold = currentTime - ACTIVE_WINDOW_SECONDS;

        // Fetch recent vehicle activities within the active window
        const liveVehicles = await Activity.find({
            Vehicle_type: { $exists: true, $ne: null },
            TimeStamp: { $gte: activeThreshold }
        }).sort({ TimeStamp: -1 }).lean(); // Use lean() for plain JavaScript objects

        console.log('Raw live vehicles data:');
        console.log(JSON.stringify(liveVehicles, null, 2));

        // Process and structure the live vehicle data
        const processedVehicles = liveVehicles.map(vehicle => {
            console.log('Processing vehicle:', JSON.stringify(vehicle, null, 2));
            const processed = {
                id: vehicle._id.toString(),
                vehicleType: vehicle.Vehicle_type,
                lastDetectedAt: vehicle.TimeStamp,
                camera: vehicle.Camera,
                snapshot: vehicle.Snapshot
            };
            console.log('Processed vehicle:', JSON.stringify(processed, null, 2));
            return processed;
        });

        console.log('All processed vehicles:');
        console.log(JSON.stringify(processedVehicles, null, 2));

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

        console.log('Vehicles by type:');
        console.log(JSON.stringify(vehiclesByType, null, 2));

        console.log('Vehicle counts:');
        console.log(JSON.stringify(vehicleCounts, null, 2));

        return NextResponse.json({ 
            liveVehicles: processedVehicles,
            vehiclesByType,
            vehicleCounts,
            totalCount: processedVehicles.length,
            asOf: currentTime
        });
    } catch (error: any) {
        console.error('Error fetching live vehicles:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}