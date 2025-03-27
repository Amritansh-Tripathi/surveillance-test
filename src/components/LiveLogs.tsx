import { useCameraContext } from '@/contexts/CameraContext';
import React from 'react'
import Image from 'next/image'
import LiveLogs2 from '@/components/LiveLogs2'
import LiveCaptions from '@/components/LiveCaptions';
import { ScrollArea } from '@/components/ui/scroll-area';

const LiveLogs = () => {
    const { selectedCamera } = useCameraContext();
    
  return (
    <div className="text-white flex w-full">
        {selectedCamera ? (          
          <ScrollArea className="h-96 w-full rounded-md border ">
            <div className='grid grid-cols-1 md:grid-cols-3 gap-2 p-2 w-full h-full'>
              <div className='col-span-1 md:col-span-2 grid grid-rows-[auto_1fr] gap-2 p-0 w-full h-full'>
                <div className='flex flex-row gap-2 w-full max-h-fit justify-between sticky top-0 z-10 bg-[#121125] py-2'>
                    <div className='flex flex-col gap-2 justify-start'>
                    <h2 className='font-medium leading-none text-sm text-white/80'> <span className=' text-white'>Live Log for:</span> {selectedCamera.CameraName}</h2>
                    <div className='flex flex-row justify-start w-full overflow-hidden flex-nowrap gap-2'>
                        <div className='flex flex-row justify-center px-2 py-1 gap-2 bg-[#292932] rounded-md w-fit align-middle'>
                            <Image src="/svg/car.svg" alt="cars" height={15} width={15} />
                            <p className='text-[#A4A4AB] text-[12px] font-bold font-roboto'>
                            0
                            </p>
                        </div>
                        <div className='flex flex-row justify-center px-2 py-1 gap-2 bg-[#292932] rounded-md w-fit align-middle'>
                            <Image src="/svg/person2.svg" alt="persons" height={15} width={15} />
                            <p className='text-[#A4A4AB] text-[12px] font-bold font-roboto'>
                            0
                            </p>
                        </div>
                        <div className='flex flex-row justify-center px-2 py-1 gap-2 bg-[#292932] rounded-md w-fit align-middle'>
                            <Image src="/svg/fire.svg" alt="fire alert" height={15} width={15} />
                            <p className='text-[#A4A4AB] text-[12px] font-bold font-roboto'>
                            0
                            </p>
                        </div>
                    
                        <div className='flex-row justify-center px-[5px] py-[5px] bg-[#292932] rounded-md w-fit align-middle hidden'>
                        </div>
                    </div>
                    </div>
                    <div className='flex flex-col gap-2 justify-start'>
                    <p className='font-medium leading-none text-sm text-white/80'><span className=' text-white'>Location:</span> {selectedCamera.Location}</p>
                    <p className='font-medium leading-none text-sm text-white/80'><span className=' text-white'>IP:</span> {selectedCamera.IP}</p>
                    </div>
                </div>
                <LiveLogs2 CameraName={selectedCamera?.CameraName || 'No Camera'} topicName={selectedCamera?.topic || null} />
              </div>

              <div className='col-span-1 p-0 grid grid-rows-[auto_1fr] gap-2 w-full h-full'>
                <h4 className="mb-4 text-sm font-medium leading-none self-start sticky top-0 z-10 pt-2 pb-4 ps-5 bg-[#121125]">Live AI Alerts</h4>
                <LiveCaptions CameraName={selectedCamera?.CameraName || 'No Camera'} topicName={selectedCamera?.topic || null} />
              </div>
            </div>
          </ScrollArea>
        ) : (
          <p>No camera selected.</p>
        )}
      </div>
  )
}

export default LiveLogs