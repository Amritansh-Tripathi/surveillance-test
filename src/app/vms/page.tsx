import StackedBarChart from '@/components/StackedBarChart'
import TimeStepper from '@/components/time-stepper'
import VmsCalander from '@/components/VmsCalander'
import React from 'react'

const VMS = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
      <div className='col-span-4 w-full h-full justify-center p-2 items-center text-white font-semibold overflow-y-scroll'>
        <TimeStepper/>
        <StackedBarChart/>
      </div>
      <div className='col-span-1'>

      </div>
    </div>

  )
}

export default VMS