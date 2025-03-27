import React from 'react';
import Image from 'next/image';
import { CrossCircledIcon, CheckCircledIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"

interface EmployeeCardProps {
  id: string;
  Person_id: string;
  type: string;
  name: string;
  Snapshot?: string;
  designation?: string;
  timeStamp: number;
  purpose?: string;
  department?: string;
  carNumber?: string;
  remark?: boolean | null; // Adjusted to include null as an option
  owner?: string;
  borderColor: string;
  image?: string;
  Age?: number | string;
  onStatusChange: (Person_id: string, newStatus: boolean) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  id,
  Person_id,
  type,
  name,
  Snapshot,
  designation,
  timeStamp,
  purpose,
  department,
  carNumber,
  remark,
  owner,
  borderColor,
  image,
  Age,
  onStatusChange,
}) => {
  console.log('Employee card rendered ' + name + image);

  // Define styles based on the employee type
  const cardStyles = {
    person: 'border-[#1D36B9]',
    visitor: 'border-[#FFB903]',
    vehicle: 'border-[#1D36B9]',
    unknown: 'border-[#FF0000]',
  };

  // Define check mark images based on the remark
  const checkMarkImages = {
    true: '/svg/check-circle.svg',
    false: '/svg/x-circle.svg',
  };
  
  function formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    return date.toLocaleString(); // Or use any other formatting method
  }
  

  return (
    <div
      id={id}
      className={`relative col-span-1 row-span-1 flex flex-row align-middle justify-start gap-x-5 rounded-[15px] border overflow-hidden pr-[5px] min-w-fit  w-fit max-w-[310px] border-[${borderColor}] mb-5 mr-5`}
    >

        <div className='flex w-full h-32 justify-center items-center max-h-[120px] bg-white bg-no-repeat bg-cover bg-center' 
        style={{ backgroundImage: Snapshot ? `url(${Snapshot})` : 'none' }} >
        {Snapshot ? (
          <Image
            src={Snapshot}
            alt="Object snapshot"
            width={90}
            height={50}
            className='static h-full w-full min-w-[150px] object-contain overflow-visible shadow-md'
          />
        ) : (
          <div className='flex justify-center items-center w-full text-nowrap text-white'>No Snapshot Captured</div>
        )}
        </div>
      <div className='relative flex flex-col w-full justify-around py-1 px-2'>
        <div className='flex flex-row justify-between gap-1 w-full text-nowrap'>
          <p className={`text-white font-roboto text-[14px] capitalize font-bold ${cardStyles[type as keyof typeof cardStyles]}`}>
          {name}
          </p>
          <Image src={checkMarkImages[remark ? 'true' : 'false']} alt='remark' width={20} height={20} />
        </div>
        <p className='text-white capitalize font-roboto text-[10px] font-medium opacity-60 w-full'>
          Type: {type}
        </p>
        {designation && (
          <p className='text-white hidden capitalize font-roboto text-[10px] font-medium opacity-60 w-full'>
            Designation: {designation}
          </p>
        )}
        <p className='text-white font-roboto text-[10px] font-normal opacity-60 w-full'>
          Time Stamp: {formatTimestamp(timeStamp)}
        </p>
        {purpose && (
          <p className='text-white hidden font-roboto text-[10px] font-normal opacity-60 w-full'>
            Purpose of Visit: {purpose}
          </p>
        )}
        {department && (
          <p className='text-white capitalize font-roboto text-[10px] font-normal opacity-60 w-full'>
            Department: {department}
          </p>
        )}
        {carNumber && (
          <p className='text-white hidden uppercase font-roboto text-[10px] font-normal opacity-60 w-full'>
            Car Number: {carNumber}
          </p>
        )}
        {/* {owner && (
          <p className='text-white uppercase font-roboto text-[10px] font-normal opacity-60'>
            Owner: {owner}
          </p>
        )} */}
        {Age && (
          <p className='text-white hidden font-roboto text-[10px] font-normal opacity-60 w-full'>
            Age: {Age}
          </p>
        )}

        {Person_id && (
          <p className='text-white hidden font-roboto text-[10px] font-normal opacity-60 w-full'>
            Person_id: {Person_id}
          </p>
        )}

        {/* Conditionally render buttons */}
        <div className=" hidden flex-row w-full gap-1 mt-4 ">
          {remark === true ? (
            <>
              <Button className="w-fit text-[10px]" variant='status' size='sm'>
                <CheckCircledIcon className="mr-2 h-3 w-3 text-[#05FF00]" /> Access Granted
              </Button>
              <Button
                onClick={() => onStatusChange(Person_id, false)} // Restrict action
                className="w-fit text-[10px]" variant='action' size='sm'>
                <CrossCircledIcon className="mr-2 h-3 w-3 text-[#FF0000]/65" /> Restrict
              </Button>
            </>
          ) : remark === false ? (
            <>
              <Button
                onClick={() => onStatusChange(Person_id, true)} // Grant Access action
                className="w-fit text-[10px]" variant='action' size='sm'>
                <CheckCircledIcon className="mr-2 h-3 w-3 text-[#05FF00]/65" /> Grant Access
              </Button>
              <Button className="w-fit text-[10px]" variant='status' size='sm'>
                <CrossCircledIcon className="mr-2 h-3 w-3 text-[#FF0000]" /> Restricted
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => onStatusChange(Person_id, true)} // Grant Access action
                className="w-fit text-[10px]" variant='action' size='sm'>
                <CheckCircledIcon className="mr-2 h-3 w-3 text-[#05FF00]/65" /> Grant Access
              </Button>
              <Button
                onClick={() => onStatusChange(Person_id, false)} // Restrict action
                className="w-fit text-[10px]" variant='action' size='sm'>
                <CrossCircledIcon className="mr-2 h-3 w-3 text-[#FF0000]/65" /> Restrict
              </Button>
            </>
          )}
        </div>
      </div>
      {image && (
        <Image
          src={image}
          alt="amrit"
          width={90}
          height={50}
          className={`absolute top-1/2 left-[35%] transform -translate-x-1/2 -translate-y-1/2 border-opacity-30 border-4 rounded-full object-cover w-[80px] h-[80px]  ${cardStyles[type as keyof typeof cardStyles]}`}
        />
      )}
    </div>

    
  );
};

export default EmployeeCard;
