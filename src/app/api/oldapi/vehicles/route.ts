// import { connect } from '@/app/dbConfig/dbConfig';
// import Vehicles, { IVehicle } from '@/models/oldmodels/vehicleModel';
// import { NextRequest, NextResponse } from 'next/server';
// import mongoose from 'mongoose';

// connect();

// export async function GET(request: NextRequest): Promise<NextResponse> {
//   try {
//     const vehicles = await Vehicles.find();
//     return NextResponse.json({ vehicles });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function POST(request: NextRequest): Promise<NextResponse> {
//   try {
//     const formData = await request.formData();

//     const Vehicle = formData.get('Vehicle') as string;
//     const VehicleNumber = formData.get('VehicleNumber') as string;
//     const Snapshot = formData.get('Snapshot') as string;
//     const OwnerName = formData.get('OwnerName') as string;
//     const OwnerContactNumber = formData.get('OwnerContactNumber') as string;
//     const Status = formData.get('Status') === 'true';

//     const existingVehicle = await Vehicles.findOne({ VehicleNumber });

//     if (existingVehicle) {
//       return NextResponse.json({ error: 'Vehicle already exists' }, { status: 400 });
//     }

//     const newVehicle = new Vehicles({
//       Vehicle,
//       VehicleNumber,
//       Snapshot,
//       OwnerName,
//       OwnerContactNumber,
//       Status,
//     });

//     const savedVehicle = await newVehicle.save();

//     return NextResponse.json({
//       message: 'Vehicle registered successfully',
//       success: true,
//       savedVehicle,
//     });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function PUT(request: NextRequest): Promise<NextResponse> {
//   try {
//     const body = await request.json();

//     const { id, Vehicle, VehicleNumber, Snapshot, OwnerName, OwnerContactNumber, Status } = body;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json({ error: 'Invalid vehicle ID' }, { status: 400 });
//     }

//     const updatedVehicle = await Vehicles.findByIdAndUpdate(
//       id,
//       {
//         Vehicle,
//         VehicleNumber,
//         Snapshot,
//         OwnerName,
//         OwnerContactNumber,
//         Status,
//       },
//       { new: true }
//     );

//     if (!updatedVehicle) {
//       return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
//     }

//     return NextResponse.json({
//       message: 'Vehicle updated successfully',
//       success: true,
//       updatedVehicle,
//     });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { connect } from '@/app/dbConfig/dbConfig';
import { Vehicles } from '@/models/oldmodels/vehicleModel'; // Adjusted for named import
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

connect();

// GET all vehicles
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const vehicles = await Vehicles.find(); // Fetch all vehicles
    return NextResponse.json({ vehicles });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST a new vehicle
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();

    const Vehicle = formData.get('Vehicle') as string;
    const VehicleNumber = formData.get('VehicleNumber') as string;
    const Snapshot = formData.get('Snapshot') as string;
    const OwnerName = formData.get('OwnerName') as string;
    const OwnerContactNumber = formData.get('OwnerContactNumber') as string;
    const Status = formData.get('Status') === 'true';

    const existingVehicle = await Vehicles.findOne({ VehicleNumber });

    if (existingVehicle) {
      return NextResponse.json({ error: 'Vehicle already exists' }, { status: 400 });
    }

    const newVehicle = new Vehicles({
      Vehicle,
      VehicleNumber,
      Snapshot,
      OwnerName,
      OwnerContactNumber,
      Status,
    });

    const savedVehicle = await newVehicle.save();

    return NextResponse.json({
      message: 'Vehicle registered successfully',
      success: true,
      savedVehicle,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT to update a vehicle
export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();

    const { id, Vehicle, VehicleNumber, Snapshot, OwnerName, OwnerContactNumber, Status } = body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid vehicle ID' }, { status: 400 });
    }

    const updatedVehicle = await Vehicles.findByIdAndUpdate(
      id,
      {
        Vehicle,
        VehicleNumber,
        Snapshot,
        OwnerName,
        OwnerContactNumber,
        Status,
      },
      { new: true } // Return the updated document
    );

    if (!updatedVehicle) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Vehicle updated successfully',
      success: true,
      updatedVehicle,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
