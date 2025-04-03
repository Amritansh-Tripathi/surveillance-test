import { connect } from '@/app/dbConfig/dbConfig';
import Cameras from '@/models/oldmodels/cameraModel';
import LiveCapacity from '@/models/oldmodels/liveCapacityModel'; // Assuming the live capacity model exists
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request: NextRequest) {
    try {
        // Fetch only the required camera details (e.g., _id, CameraName, etc.)
        const cameras = await Cameras.find({}, '_id CameraName Location').lean();

        if (!cameras || cameras.length === 0) {
            return NextResponse.json({ error: 'No cameras found' }, { status: 404 });
        }

        // Initialize total capacity counters
        let totalVehicle = 0;
        let totalPerson = 0;
        let totalVisitor = 0;
        let totalUnknown = 0;

        // Map camera ids to fetch live capacity for each camera
        const cameraIds = cameras.map((camera) => camera._id);

        // Fetch live capacity data for all cameras at once using `$in` for optimization
        const liveCapacities = await LiveCapacity.find({ Camera_id: { $in: cameraIds } }, 'Camera_id Person Vehicle Unknown').lean();

        // Create a map for quick lookup of live capacity by Camera_id
        const capacityMap = new Map(
            liveCapacities.map((capacity) => [
                String(capacity.Camera_id),
                {
                    Person: capacity.Person || 0,
                    Vehicle: capacity.Vehicle || 0,
                    Unknown: capacity.Unknown || 0,
                },
            ])
        );

        // Map through cameras and attach live capacity (or default 0 if not found)
        const camerasWithCapacity = cameras.map((camera) => {
            let capacity = capacityMap.get(String(camera._id)) || { Person: 0, Vehicle: 0, Unknown: 0 };

            // Check if all values are zero, and if so, set them to 1
            if (capacity.Person === 0 && capacity.Vehicle === 0 && capacity.Unknown === 0) {
                capacity = { Person: 1, Vehicle: 1, Unknown: 1 };
            }

            // You can add more categories like Visitor based on logic, assuming Person includes Visitors
            const visitorCount = capacity.Person; // Modify if Visitor is separate from Person

            // Update total counters
            totalVehicle += capacity.Vehicle;
            totalPerson += capacity.Person;
            totalVisitor += visitorCount; // Assuming visitor is a subset of Person
            totalUnknown += capacity.Unknown;

            // Return camera with its capacity
            return {
                ...camera,
                liveCapacity: {
                    Person: capacity.Person,
                    Vehicle: capacity.Vehicle,
                    Unknown: capacity.Unknown,
                    Visitor: visitorCount, // Customize as needed
                },
            };
        });

        // Return the cameras with their live capacities and total capacities
        return NextResponse.json({
            cameras: camerasWithCapacity,
            totalCapacity: {
                totalPerson,
                totalVehicle,
                totalVisitor,
                totalUnknown,
            },
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
