import LiveActivitiesChart from '@/components/LiveActivitiesChart'
import StackedBarChart from '@/components/StackedBarChart'

import React from 'react'

const VMS = () => {
  return (
  <div className='grid w-full grid-cols-1 grid-rows-1 md:grid-cols-8 h-full max-h-[84vh] gap-2'>
    <div className='grid md:row-span-1 md:grid-rows-7 md:col-span-6 gap-2'>
      <div className='grid grid-flow-row gap-2 text-white p-2 w-full h-full md:row-span-4'>
      <div className='w-full h-auto text-white font-semibold p-1'>
        <h2>Activities Summary</h2>
      </div>
      <StackedBarChart/>
      </div>
      
      <div className='md:row-span-3 bg-[#1B1B2E] h-full rounded-lg'>

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
      
      </div>
    </div>
  </div>
  )
}

export default VMS