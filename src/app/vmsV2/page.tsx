'use client'
import LiveActivitiesChart from '@/components/LiveActivitiesChart'
import StackedBarChart from '@/components/StackedBarChart'
import Employees from '@/components/Employees';
import Vehicles from '@/components/Vehicles';
import { Skeleton } from "@/components/ui/skeleton"
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Toggle } from '@/components/ui/toggle';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const VMS = () => {
  const [view, setView] = useState<'card' | 'table'>('card');

  return (
  <div className='grid w-full grid-cols-1 grid-rows-1 md:grid-cols-8 h-full max-h-[84vh] gap-2'>
    <div className='grid md:row-span-1 md:grid-rows-12 md:col-span-6 gap-3 '>
      
      <div className='grid grid-flow-row gap-1 text-white rounded-lg w-full h-full md:row-span-7'>
        <div className='w-full h-auto text-white font-semibold p-1'>
          <h2>Activities Summary</h2>
        </div> 
        <StackedBarChart/>
      </div>
      
      <div className='md:row-span-5 bg-[#1B1B2E] h-full rounded-lg mt-2'>
      <div className='hidden md:grid grid-cols-3 w-full h-full rounded-md grid-flow-row gap-2'>
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
      </div>
      </div>
    </div>
    <div className='md:col-span-2 flex flex-col gap-2 h-full'>
      <div className='w-full h-auto text-white font-semibold p-1'>
        <h2>Live Activities</h2>
      </div>
      <div className="w-full h-[200px] md:h-[300px] bg-[#1B1B2E] rounded-lg">
          <LiveActivitiesChart
            knownVehicles={40}
            personnel={300}
            visitors={20}
            unknownPersons={40}
            unknownVehicles={20}
          />
      </div>
      <div className='w-full h-auto text-white font-semibold p-1'>
        <h2>Take Action</h2>
      </div>
      <div className="w-full bg-[#1B1B2E] h-full rounded-lg">
      <Tabs defaultValue="visitors" className="w-full h-full">
        <TabsList className='flex w-full p-1 gap-1 justify-start items-center flex-row'>
          <TabsTrigger className='text-xs p-1 ' value="visitors">Visitors</TabsTrigger>
          <TabsTrigger className='text-xs p-1 ' value="unknown">Unknown</TabsTrigger>
        </TabsList>
        <TabsContent className='h-full' value="visitors" >
          
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
    </div>
  </div>
  )
}

export default VMS