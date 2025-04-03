'use client';
import React, { useEffect, useState, useRef } from 'react';
import VehicleCard from './VehicleCard';
import VehicleDataTable from './VehicleDataTable';
import { Toggle } from '@/components/ui/toggle';
import { ScrollArea } from '@radix-ui/react-scroll-area';

interface VehicleFromAPI {
  _id: string;
  Vehicle: string;
  VehicleNumber: string;
  Snapshot: string;
  OwnerName: string;
  OwnerContactNumber: string;
  Status: boolean;
  __v: number;
}

interface Vehicle {
  id: string;
  vehicle: string;
  vehicleNumber: string;
  Snapshot: string;
  ownerName: string;
  ownerContactNumber: string;
  status: boolean;
  borderColor: string;
}

const transformVehicleToCardProps = (vehicle: VehicleFromAPI): Vehicle => ({
  id: vehicle._id,
  vehicle: vehicle.Vehicle,
  vehicleNumber: vehicle.VehicleNumber,
  Snapshot: vehicle.Snapshot,
  ownerName: vehicle.OwnerName,
  ownerContactNumber: vehicle.OwnerContactNumber,
  status: vehicle.Status,
  borderColor: vehicle.Status ? '#1D36B9' : '#FF0000', // Example logic for borderColor
});

interface VehiclesProps {
  view: 'card' | 'table';
}

const Vehicles = ({ view }: VehiclesProps) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const componentRef = useRef(null);

  useEffect(() => {
    fetch('http://192.168.193.113:3000/api/oldapi/vehicles')
      .then((response) => response.json())
      .then((data) => {
        const transformedVehicles = data.vehicles.map((vehicle: VehicleFromAPI) =>
          transformVehicleToCardProps(vehicle)
        );
        setVehicles(transformedVehicles);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="flex flex-col justify-start items-start w-full h-full">
      {/* Content */}
      <div ref={componentRef} className="w-full h-full overflow-y-auto p-2 bg-[#1B1B2E]">
      <ScrollArea className="h-40 w-full">
        {view === 'card' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full gap-2">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} {...vehicle} />
            ))}
          </div>
          
        ) : (
          <VehicleDataTable data={vehicles} />
        )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default Vehicles;
