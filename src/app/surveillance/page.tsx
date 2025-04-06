'use client'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import GridSlider from '@/components/GridSlider'
import Navbar from '@/components/Navbar'
import SurveillanceGrid from '@/components/SurveillanceGrid';
import clsx from 'clsx';
import React from 'react'

import { useEffect, useState } from 'react';
import { useGridView } from "@/contexts/GridViewContext";
import LiveLogs from '@/components/LiveLogs';

const Surveillance = () => {
  const { gridView } = useGridView();

  return (
    <div className='grid grid-cols-1 grid-rows-5 grid-flow-row-dense gap-4 md:grid-cols-5 md:gap-2 h-svh px-0 py-4 w-full'>
        <div className='hidden col-span-1 row-span-1 h-fit md:col-span-1 md:h-full p-1'>
        
        </div>
        <ResizablePanelGroup direction="vertical" className='grid col-span-1 row-span-5 grid-rows-5 gap-0 md:col-span-5 p-1 md:p-2'>
          <ResizablePanel  className='row-span-2 h-full'>
            <SurveillanceGrid gridView={gridView} />
          </ResizablePanel>
          <ResizableHandle withHandle className="bg-[#1D369B] text-white" />
          <ResizablePanel className='row-span-3 flex flex-col gap-3 justify-start items-start p-0'>
            <LiveLogs />
          </ResizablePanel>
        </ResizablePanelGroup>
       
    </div>
  )
}

export default Surveillance