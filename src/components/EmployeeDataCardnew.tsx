import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FiArrowUpLeft } from "react-icons/fi";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from '@radix-ui/react-scroll-area';


interface Activity {
  TimeStamp: number;
  Camera: string;
  Snapshot: string;
}

interface EmployeeCardProps {
  id: string;
  type: string;
  name: string;
  Snapshot?: string;
  designation?: string;
  timeStamp: number;
  purpose?: string;
  department?: string;
  remark?: boolean;
  owner?: string;
  borderColor: string;
  ProfilePic?: string;
  Age?: number;
  role?: string;
  Person_id: string; // Change ID to Person_id
  PhoneNumber: string;
  Vehicle: string;
  VehicleNumber: string;
}

const EmployeeCardActivity: React.FC<EmployeeCardProps> = ({
  id,
  type,
  name,
  Snapshot,
  designation,
  timeStamp,
  purpose,
  department,
  remark,
  owner,
  borderColor,
  ProfilePic,
  Age,
  role,
  Person_id,
  PhoneNumber,
  Vehicle,
  VehicleNumber
}) => {
  const [activities, setActivities] = useState<Activity[]>([]);

  function formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    return date.toLocaleString(); // Or use any other formatting method
  }

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URLs}/oldapi/personalActivity?Person_id=${Person_id}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Error fetching activities');
        }
        setActivities(data);
      } catch (error) {
        console.error('Failed to fetch activities:', error);
      }
    };

    fetchActivities();
  }, [Person_id]);

  const checkMarkImages = {
    true: '/check-circle.svg',
    false: '/x-circle.svg',
  };

  return (
    <div
      id={id}
      className={`relative flex flex-row align-middle justify-center gap-[5px] rounded-[15px] border overflow-hidden pr-3 w-full max-h-max h-max max-w-max border-[${borderColor}] mb-5 col-span-2`}
    >
      <div className="relative w-full min-w-[150px] max-h-[100px] h-full">
        {Snapshot && (
          <Image
            src={Snapshot}
            width={100}
            height={100}
            alt="full width image"
            className="w-48 h-full max-h-44 object-fill object-center"
          />
        )}
      </div>
      <div className="w-fit flex flex-col justify-center pl-7 pr-[5px] py-[5px]">
        <div className="flex flex-row justify-between w-full">
          <p className="text-white font-roboto text-[14px] capitalize font-bold">
            {type}
          </p>
          <Image src={checkMarkImages[remark ? 'true' : 'false']} alt="remark" width={20} height={20} className='absolute right-1 top-1 ' />
        </div>
        <p className="text-white capitalize font-roboto text-[10px] font-medium opacity-60 w-full flex flex-shrink-0 flex-nowrap">
          Name: {name}
        </p>
        {designation && (
          <p className="text-white capitalize font-roboto text-[10px] font-medium opacity-60 w-full flex flex-shrink-0 flex-nowrap">
            Designation: {designation}
          </p>
        )}
        <p className="text-white font-roboto text-[10px] font-normal opacity-60 w-full flex flex-shrink-0 flex-nowrap">
          Time Stamp: {formatTimestamp(timeStamp)}
        </p>
        {purpose && (
          <p className="text-white font-roboto text-[10px] font-normal opacity-60 w-full flex flex-shrink-0 flex-nowrap">
            Purpose of Visit: {purpose}
          </p>
        )}
        {department && (
          <p className="text-white capitalize font-roboto text-[10px] font-normal opacity-60 w-full flex flex-shrink-0 flex-nowrap">
            Department: {department}
          </p>
        )}
        {VehicleNumber && (
          <p className="text-white uppercase font-roboto text-[10px] font-normal opacity-60 w-max flex flex-shrink-0 flex-nowrap overflow-x-clip">
            Car Number: {VehicleNumber}
          </p>
        )}
        {owner && (
          <p className="text-white uppercase font-roboto text-[10px] font-normal opacity-60">
            Owner: {owner}
          </p>
        )}
        {Age && (
          <p className="text-white font-roboto text-[10px] font-normal opacity-60 w-full flex flex-shrink-0 flex-nowrap">
            Age: {Age}
          </p>
        )}
      </div>
      {ProfilePic && (
        <Image
          src={ProfilePic}
          alt="amrit"
          width={90}
          height={50}
          className={`absolute top-1/2 left-[40%] transform -translate-x-1/2 -translate-y-1/2 border-opacity-30 border-4 rounded-full object-cover w-[60px] h-[60px] zoom-in-50 border-r-2 border-spacing-1 border-green-600`}
        />
      )}
      <Sheet>
        <SheetTrigger>
          <div className="absolute right-0 bottom-0 h-5 w-5 rounded-l flex justify-center items-center bg-[#1d37b951] transition-opacity hover:bg-white hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <FiArrowUpLeft className='text-[#1D36B9] h-5 w-5' />
            <span className="sr-only">Close</span>
          </div>
        </SheetTrigger>
        <SheetContent side="right" className="w-[370px] bg-[#1B1B2E]">
          <SheetHeader>
            <SheetTitle className='text-white'>Personal activities</SheetTitle>
            <SheetDescription>
              <div className='flex flex-row justify-between p-2 mt-2'>
                {ProfilePic && (
                  <Image
                    src={ProfilePic}
                    alt="Profile Pic"
                    width={90}
                    height={50}
                    className="border-r-2 border-spacing-1 rounded-full object-cover w-10 h-10 md:w-12 md:h-12 border-green-600"
                  />
                )}
                <div className='flex flex-col justify-center items-end text-right gap-2'>
                  <p className="text-white capitalize font-roboto text-sm font-semibold w-full flex flex-shrink-0 flex-nowrap">
                    {name}
                  </p>
                  <p className="text-white capitalize font-roboto text-xs font-medium  text-right flex flex-shrink-0 flex-nowrap">
                    {role}
                  </p>
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>

          <Separator className='mb-2' />
          <div className='flex w-full justify-between flex-row items-center'>
            <div className='flex flex-col items-start justify-center w-full gap-3'>
              <p className="text-white/60 uppercase font-roboto text-xs font-normal">
                Phone Number: {PhoneNumber}
              </p>
              <p className="text-white/60 uppercase font-roboto text-xs font-normal">
                Person ID: {Person_id}
              </p>
              <p className="text-white/60 uppercase font-roboto text-xs font-normal">
                Vehicle: {Vehicle}
              </p>
              <p className="text-white/60 uppercase font-roboto text-xs font-normal">
                Vehicle Number: {VehicleNumber}
              </p>
            </div>
          </div>
          <Separator className='mb-4 mt-2' />
          <p className="text-white uppercase font-roboto text-base font-semibold w-max mb-4">
            Activities
          </p>
            <ScrollArea className="h-64 w-full px-1 gap-2 rounded-md flex flex-col">
              {activities.map((activity, index) => (
                <div key={index} className="flex flex-row-reverse gap-2 justify-end items-center w-full bg-[#121125] rounded-md">
                  {/* <p className="text-white/60 font-roboto text-xs font-normal flex flex-row text-nowrap">
                 in camera <span className='text-white font-semibold'>{activity.Camera}</span>
                </p> */}
                  <p className="text-white/60 font-roboto text-xs font-normal flex flex-row text-nowrap">
                    <span className='text-white font-semibold'>detected on {formatTimestamp(activity.TimeStamp)}</span>
                  </p>
                  <Avatar>
                    <AvatarImage src={activity.Snapshot} />
                    <AvatarFallback>P</AvatarFallback>
                  </Avatar>

                </div>
              ))}
            </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EmployeeCardActivity;
