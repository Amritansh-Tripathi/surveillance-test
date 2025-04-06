'use client'
import React, { useState } from 'react';
// import '@/styles/customScrollbar.css';
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePickerWithPresets } from "@/components/DatePickerWithPresets"
import { Skeleton } from "@/components/ui/skeleton"
import { FiArrowUpLeft, FiArrowUpRight } from "react-icons/fi";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import DoughnutChart from '@/components/DonutChart';
import Employees from '@/components/Employees';
import Vehicles from '@/components/Vehicles';
import EmployeeCardActivity from "@/components/EmployeeDataCardnew";
import ObjectCard from '@/components/ObjectCard';
import StackedBarChart from '@/components/StackedBarChartSmall';
import TimeStepper from '@/components/time-stepper';
import { ScrollArea } from '@/components/ui/scroll-area';
// export const revalidate = 3600

interface PersonalDetails {
  PhoneNumber: string;
  Password: string;
  ProfilePic: string;
  DeviceIP: string;
  Name: string;
  Person_id: string;
  Department: string;
  Vehicle: string;
  VehicleNumber: string;
  Age: number;
  Role: string;
  Status: boolean;
  Snapshot: string;
}

interface ActivityData {
  TimeStamp: number;
  Camera: string;
  Type: string;
  Status: boolean;
  Person_id: string;
  Snapshot: string;
  personalDetails: PersonalDetails; // Use the defined PersonalDetails interface
  Vehicle_type: string;
  _id: string;
  timeStamp: number;
  isVehicle: boolean;
  class: string;
}

// Fetch activity data
const fetchActivityData = async () => {
  console.log('API URL:', process.env.NEXT_PUBLIC_API_URLs);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URLs}/oldapi/activity`);
  const data = await response.json();
  return data.activities; // Assuming the response returns activities in this format
};

// Fetch activity data
const fetchCount = async () => {
  console.log('API URL:', process.env.NEXT_PUBLIC_API_URLs);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URLs}/oldapi/capacity-sse`);
  const data = await response.json();
  return data; // Assuming the response returns activities in this format
};

const VMS = () => {

  const [activityData, setActivityData] = React.useState<ActivityData[]>([]);
  const [count, setCount] = React.useState<any>([]);

  React.useEffect(() => {
    const getData = async () => {

      const fetchedActivityData = await fetchActivityData();
      setActivityData(fetchedActivityData);

      const fetchedCount = await fetchCount();
      setCount(fetchedCount);

    };

    getData();
  }, []);

  const [view, setView] = useState<'card' | 'table'>('card');

  return (
    <div className='flex flex-col gap-2 px-2 h-screen w-full pt-2 pb-16 justify-start items-start'>
      <div className='flex w-full py-2 h-fit justify-between items-center md:hidden'>
        <Image src='/logoSmall.svg' alt='logo' width={75} height={32} className='w-auto h-8'></Image>
        {/* <p className='flex-nowrap text-white font-bold text-xs'>Visitor management & Access Control</p> */}
      </div>
      <div className='h-screen grid grid-flow-row grid-rows-2 grid-cols-1 gap-2 justify-start items-start w-full bg-none hidden-scrollbar'>
        <div className='grid row-span-1 col-span-1 w-full h-full flex-col md:grid md:grid-cols-9 gap-2 md:grid-rows-2'>
          <div className='md:bg-[#1B1B2E] md:rounded-md md:max-h-full flex w-full h-full flex-col md:p-3 md:flex-row md:col-span-7 gap-2 md:justify-between md:row-span-1'>
            <div className='w-full md:w-fit flex justify-start items-center px-2 py-1 rounded-md bg-[#1B1B2E] md:bg-none  max-h-36'>
              <div className='flex w-full flex-col md:w-fit h-fit justify-between gap-2'>
                <h3 className='font-semibold text-white'>Welcome! to Visitor management</h3>
                <DatePickerWithPresets />
              </div>
            </div>
            <div className='p-1 grid grid-cols-2 md:grid-cols-5 md:grid-flow-row-dense w-full h-full gap-x-12 md:gap-x-4 gap-y-7 md:gap-y-0 md:pr-10 relative'>
              <div className='bg-[#4A2533] flex col-span-2 md:col-span-1 md:col-start-2 rounded-md p-2 md:p-2 md:max-h-36 md:w-fit md:h-fit relative hover:border hover:border-solid hover:border-[#FA5A7D]'>
                <div className='flex w-full md:flex-col justify-between md:gap-2 items-center h-fit md:items-start md:h-full md:w-full'>
                  <p className='text-nowrap text-white font-semibold text-lg md:text-xl'>{activityData.length}</p>
                  <div className='flex flex-row md:flex-col justify-end items-center md:items-start w-fit h-fit gap-3'>
                    <div className='flex w-6 p-1 bg-[#FA5A7D] rounded-full h-6 md:h-8 md:w-8'>
                      <Image src='/ActivityChartIcon.svg' alt='icon' width={20} height={20} className='flex w-full h-full' ></Image>
                    </div>
                    <p className='text-nowrap text-white font-semibold text-[10px] md:text-base'>Activities Recorded</p>
                  </div>

                </div>
                <Sheet>
                  <SheetTrigger>
                    <div className="absolute left-0 bottom-0 h-5 w-5 rounded flex justify-center items-center bg-[#4a2533b0] transition-opacity hover:bg-white hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                      <FiArrowUpRight className='text-[#FA5A7D] h-5 w-5' />
                      <span className="sr-only">Close</span>
                    </div>
                  </SheetTrigger>
                  <SheetContent side="left" className='w-[340px] hidden-scrollbar bg-[#1B1B2E] text-white'>
                    <SheetHeader className='flex items-start mb-2'>
                      <SheetTitle className='text-white'>Live Activities</SheetTitle>
                      <SheetDescription>Watch all activities below.</SheetDescription>
                    </SheetHeader>
                    {/* <div className="p-1 overflow-y-scroll max-h-screen pb-20">
                            {activityData.map((activity, _id) => (
                              <div key={_id} className="p-0 rounded-md mb-10">
                                {activity.personalDetails && (
                                  <EmployeeCardActivity
                                    id={activity.Person_id}
                                    type={activity.Type}
                                    name={activity.personalDetails.Name}
                                    Snapshot={activity.Snapshot}
                                    designation={activity.personalDetails.Role}
                                    timeStamp={activity.TimeStamp}
                                    department={activity.personalDetails.Department}
                                    remark={activity.personalDetails.Status}
                                    borderColor="#1D36B9"
                                    ProfilePic={activity.personalDetails.ProfilePic}
                                    Age={activity.personalDetails.Age}
                                    role={activity.personalDetails.Role}
                                    Person_id={activity.personalDetails.Person_id}
                                    PhoneNumber={activity.personalDetails.PhoneNumber}
                                    Vehicle={activity.personalDetails.Vehicle}
                                    VehicleNumber={activity.personalDetails.VehicleNumber}
                                  />
                                )}
                              </div>
                            ))}
                          </div> */}
                    <div className="p-1 overflow-y-scroll max-h-screen pb-20 hidden-scrollbar">
                      {activityData.map((activity, index) => {
                        if (activity.isVehicle) {
                          return (
                            <div key={index} className="p-0 rounded-md mb-10">
                              <ObjectCard
                                key={activity._id}
                                id={activity._id}
                                type={activity.class} // e.g., "car" if isVehicle: true
                                Snapshot={activity.Snapshot}
                                timeStamp={activity.INFO.TimeStamp}
                                borderColor="#1D36B9"
                                name="vehicle"
                              />
                            </div>
                          );
                        } else if (activity.personalDetails) {
                          return (
                            <div key={index} className="p-0 rounded-md mb-10">
                              <EmployeeCardActivity
                                key={activity._id}
                                id={activity._id}
                                type={activity.Type}
                                name={activity.personalDetails.Name}
                                Snapshot={activity.Snapshot}
                                designation={activity.personalDetails.Role}
                                timeStamp={activity.INFO.TimeStamp}
                                department={activity.personalDetails.Department}
                                remark={activity.personalDetails.Status}
                                borderColor="#1D36B9"
                                ProfilePic={activity.personalDetails.ProfilePic}
                                Age={activity.personalDetails.Age}
                                role={activity.personalDetails.Role}
                                Person_id={activity.personalDetails.Person_id}
                                PhoneNumber={activity.personalDetails.PhoneNumber}
                                Vehicle={activity.personalDetails.Vehicle}
                                VehicleNumber={activity.personalDetails.VehicleNumber}
                              />
                            </div>
                          );
                        } else if (activity.class === "person") {
                          return (
                            <div key={index} className="p-0 rounded-md mb-10">
                              <ObjectCard
                                key={activity._id}
                                id={activity._id}
                                type="person"
                                Snapshot={activity.Snapshot}
                                timeStamp={activity.INFO.TimeStamp}
                                borderColor="#FA5A7D"
                                name="unknown person"
                              />
                            </div>
                          );
                        } else {
                          return null; // Skip non-person, non-vehicle objects (e.g., "chair", "laptop")
                        }
                      })}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              <div className='bg-[#20457E] flex col-span-1 ml-4 md:col-start-3 rounded-md md:h-fit md:max-w-36 relative hover:border hover:border-solid hover:border-[#FA5A7D]'>
                <Dialog>
                  <DialogTrigger className='w-full p-0'>
                    <div className='flex flex-col w-full h-full justify-between md:gap-2 items-start p-1 md:p-2'>
                      <p className='text-nowrap text-white font-semibold text-lg md:text-xl'>10</p>
                      <div className='flex flex-row md:flex-col justify-between items-center md:items-start md:gap-3 w-full'>
                        <div className='flex w-auto p-1 bg-[#4657EF] rounded-full h-6 md:w-8 md:h-8'>
                          <Image src='/CarParking.svg' alt='icon' width={18} height={18} className='flex w-full h-full' ></Image>
                        </div>
                        <p className='text-nowrap text-white font-medium text-[10px] md:text-base'>Vehicles Parked</p>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className='bg-[#1B1B2E] w-full '>
                    <DialogHeader>
                      <DialogTitle className='text-white'>Vehicles Inside</DialogTitle>
                      <DialogDescription>

                      </DialogDescription>
                    </DialogHeader>
                    <div className='flex flex-col w-full h-full max-w-[340px] md:max-w-full justify-center items-center gap-2 p-2 rounded-md ' >
                      <Vehicles view='card' />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className='bg-[#204534] flex col-span-1 md:col-start-4 rounded-md md:h-fit md:w-fit hover:border hover:border-solid hover:border-[#FA5A7D]'>

                <Dialog>
                  <DialogTrigger className='w-full p-0'>
                    <div className='flex flex-col w-full h-full justify-between md:gap-2 items-end md:items-start p-1 md:p-2 '>
                      <p className='text-nowrap text-white font-semibold text-lg md:text-xl'>56</p>
                      <div className='flex flex-row md:flex-col justify-between items-center md:items-start md:gap-3 w-full'>
                        <div className='flex w-6 p-1 bg-[#3CD856] rounded-full h-6 md:h-8 md:w-fit'>
                          <Image src='/PersonalEntryIcon.svg' alt='icon' width={18} height={18} className='flex w-full h-full' ></Image>
                        </div>
                        <p className='text-nowrap text-white font-medium text-[10px] md:text-base'>Personals in premise</p>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className='bg-[#1B1B2E] w-full'>
                    <DialogHeader>
                      <DialogTitle className='text-white'>Personals In the premise</DialogTitle>
                      <DialogDescription>

                      </DialogDescription>
                    </DialogHeader>
                    <div className='flex flex-col max-w-[340px] md:max-w-full w-full h-full justify-center items-center gap-2 p-2 ' >
                      <Employees view='card' />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <DoughnutChart />
            </div>
          </div>
          <div className='hidden md:rounded-md md:max-h-full w-full h-full md:p-0 md:col-span-7 gap-2 md:justify-between md:row-span-1 md:grid md:grid-cols-2'>
            <div className='md:bg-[#1B1B2E] md:rounded-md flex w-full h-full flex-col md:p-3 md:flex-row md:col-span-1 items-center'>
              <TimeStepper/>
            </div>
            <div className=' md:max-h-full w-full h-full md:grid md:grid-cols-2 gap-2 md:p-1 md:col-span-1'>
              <div className=' md:bg-[#1B1B2E] md:rounded-md flex flex-col col-span-1 w-full h-full justify-between md:gap-2 items-start p-1 md:p-2 border border-solid border-[#1B1B2E]'>
                <p className='text-nowrap text-white font-bold text-lg md:text-xl'>{count.Unknown}</p>
                <div className='flex flex-row md:flex-row justify-between items-center md:items-center md:gap-3 w-full'>
                  <div className='flex w-auto p-1 bg-[#FA5A7D] rounded-full h-6 md:w-11 md:h-11'>
                    <Image src='/PersonalEntryIcon.svg' alt='icon' width={18} height={18} className='flex w-full h-full' ></Image>
                  </div>
                  <p className='text-nowrap text-white font-medium text-[10px] md:text-xl'>Unknown  Entries</p>
                </div>
              </div>
              <div className=' md:bg-[#1B1B2E] md:rounded-md flex col-span-1 flex-col w-full h-full justify-between md:gap-2 items-start p-1 md:p-2 border border-solid border-[#1B1B2E]'>
                <p className='text-nowrap text-white font-bold text-lg md:text-xl'>{count.Personal}</p>
                <div className='flex flex-row md:flex-row justify-between items-center md:items-center md:gap-3 w-full'>
                  <div className='flex w-auto p-1 bg-[#3CD856] rounded-full h-6 md:w-11 md:h-11'>
                    <Image src='/PersonalEntryIcon.svg' alt='icon' width={18} height={18} className='flex w-full h-full' ></Image>
                  </div>
                  <p className='text-nowrap text-white font-medium text-[10px] md:text-xl'>Known Entries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-flow-col col-span-1 md:hidden w-full h-full rounded-md gap-1'>
          <Tabs defaultValue="personals" className="w-full h-full p-0">
            <TabsList className='flex w-full p-1 gap-1 justify-start items-center flex-row'>
              <TabsTrigger className='text-xs p-1 ' value="visitors">Visitors</TabsTrigger>
              <TabsTrigger className='text-xs p-1 ' value="personals">Personals</TabsTrigger>
              <TabsTrigger className='text-xs p-1 ' value="vehicles">Vehicles</TabsTrigger>
              <TabsTrigger className='text-xs p-1 ' value="unknown">Unknown</TabsTrigger>
            </TabsList>

            <TabsContent className='h-full' value="visitors" >
              <div className='flex flex-col w-full h-full gap-2 p-2 rounded-md bg-[#1B1B2E]' >
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>

              </div>
            </TabsContent>
            <TabsContent className='h-full' value="personals">
              <div className='flex flex-col max-w-[340px] md:max-w-full w-full h-full justify-start gap-2 p-2 rounded-md bg-[#1B1B2E]' >
                <Employees view='card' />
              </div>
            </TabsContent>
            <TabsContent className='h-full' value="vehicles" >
              <div className='flex flex-col w-full h-full max-w-[340px] md:max-w-full justify-start gap-2 p-2 rounded-md bg-[#1B1B2E]' >
                <Vehicles view='card' />
              </div>
            </TabsContent>
            <TabsContent className='h-full' value="unknown"  >
              <div className='flex flex-col w-full h-full gap-2 p-2 rounded-md bg-[#1B1B2E]' >
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>

              </div>
            </TabsContent>

          </Tabs>
        </div>
        <div className='hidden md:grid grid-cols-4 w-full h-full rounded-md grid-flow-row gap-2'>
          <Tabs defaultValue="personals" className="w-full h-full p-0 col-span-3">
            {/* Tabs List with a single Toggle on the right */}
            <TabsList className="flex w-full p-1 gap-1 justify-between items-center flex-row bg-[#1B1B2E]">
              <div className="flex gap-1">
                <TabsTrigger className="text-xs p-1" value="personals">
                  Personals
                </TabsTrigger>
                <TabsTrigger className="text-xs p-1" value="vehicles">
                  Vehicles
                </TabsTrigger>
              </div>
              <Toggle
                aria-label="Toggle view"
                data-state={view === 'table' ? 'on' : 'off'}
                onClick={() => setView(view === 'card' ? 'table' : 'card')}
                variant="mytoggle"
                size="sm"
              >
                Toggle to {view === 'card' ? 'table' : 'card'} view
              </Toggle>
            </TabsList>

            <TabsContent className="h-full" value="personals">
              <div className="flex flex-col w-full h-full justify-start gap-2 p-2 rounded-md bg-[#1B1B2E] overflow-y-auto">
                <Employees view={view} />
              </div>
            </TabsContent>
            <TabsContent className="h-full" value="vehicles">
              <div className="flex flex-col w-full h-full justify-start gap-2 p-2 rounded-md bg-[#1B1B2E] overflow-y-auto">
                <Vehicles view={view} />
              </div>
            </TabsContent>
          </Tabs>
          <div className="w-full bg-[#1B1B2E] h-full rounded-lg">
            <Tabs defaultValue="unknown" className="w-full h-full">
              <TabsList className='flex w-full p-1 gap-1 justify-start items-center flex-row'>
                <TabsTrigger className='text-xs p-1 ' value="visitors">Visitors</TabsTrigger>
                <TabsTrigger className='text-xs p-1 ' value="unknown">Unknown</TabsTrigger>
              </TabsList>
              <TabsContent className='h-full' value="visitors" >
                <div className='flex flex-col w-full h-full gap-2 p-2 rounded-md bg-[#1B1B2E]' >
                  <p className='text-white font-semibold '>There are no visitors as of now.</p>
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full bg-white" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px] bg-white" />
                      <Skeleton className="h-4 w-[200px] bg-white" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full bg-white" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px] bg-white" />
                      <Skeleton className="h-4 w-[200px] bg-white" />
                    </div>
                  </div>

                </div>
              </TabsContent>
              <TabsContent className='h-full' value="unknown"  >
                <ScrollArea className="h-80 w-full">
                          <div className="grid grid-flow-row w-full  gap-2 justify-center items-center">
                          {activityData.map((activity, index) => {
                        if (activity.class === "person" && activity.Type === "Unknown") {
                          return (
                            <ObjectCard
                                key={activity._id}
                                id={activity._id}
                                type="person"
                                Snapshot={activity.Snapshot}
                                timeStamp={activity.INFO.TimeStamp}
                                borderColor="#FF0000"
                                name="unknown person"
                              />
                          );
                        } else {
                          return null; // Skip non-person, non-vehicle objects (e.g., "chair", "laptop")
                        }
                      })}
                          </div>
                        </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>

      </div>
    </div>
  )
}

export default VMS