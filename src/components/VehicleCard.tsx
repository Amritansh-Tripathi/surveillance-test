import React from 'react';
import Image from 'next/image';

interface VehicleCardProps {
  id: string;
  vehicle: string;
  vehicleNumber: string;
  Snapshot: string;
  ownerName: string;
  ownerContactNumber: string;
  status: boolean;
  borderColor: string;
}

const VehicleCard: React.FC<VehicleCardProps> = ({
  id,
  vehicle,
  vehicleNumber,
  Snapshot,
  ownerName,
  ownerContactNumber,
  status,
  borderColor,
}) => {
  const checkMarkImage = status ? '/check-circle.svg' : '/x-circle.svg';

  return (
    <div
      id={id}
      className={`relative flex flex-row align-middle justify-center gap-[5px] rounded-[15px] border overflow-hidden pr-[5px] w-full h-fit max-w-fit border-[${borderColor}] mb-5 col-span-2`}
    >
      <div className="relative w-full min-w-[100px] min-h-[150px] max-h-[150px]">
        {Snapshot && (
          <Image
            src={Snapshot}
            width={100}
            height={100}
            alt="vehicle image"
            className="w-48 h-full max-h-40 object-cover object-center"
          />
        )}
      </div>
      <div className="w-full flex flex-col justify-center pl-[45px] pr-[5px] py-[5px]">
        <div className="flex flex-row justify-between w-full">
          <p className="text-white font-roboto text-[14px] capitalize font-bold">{vehicle}</p>
          <Image src={checkMarkImage} alt="status" width={20} height={20} />
        </div>
        <p className="text-white capitalize font-roboto text-[10px] font-medium opacity-60 w-full flex flex-shrink-0 flex-nowrap">
          Vehicle Number: {vehicleNumber}
        </p>
        <p className="text-white font-roboto text-[10px] font-normal opacity-60 w-full flex flex-shrink-0 flex-nowrap">
          Owner Name: {ownerName}
        </p>
        <p className="text-white font-roboto text-[10px] font-normal opacity-60 w-full flex flex-shrink-0 flex-nowrap">
          Owner Contact: {ownerContactNumber}
        </p>
      </div>
    </div>
  );
};

export default VehicleCard;
