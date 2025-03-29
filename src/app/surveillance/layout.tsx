'use client';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import React from 'react';
import {
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import GridSlider from '@/components/GridSlider';
import { GridViewProvider } from '@/contexts/GridViewContext';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CameraProvider, useCameraContext } from '@/contexts/CameraContext';
import { TopicProvider, useTopicContext } from '@/contexts/TopicContext';

const SidebarCameraMenu = () => {
  const { cameras, setSelectedCamera, selectedCamera } = useCameraContext();
  const { selectTopic } = useTopicContext();

  const handleTopicSelect = (camera) => {
    setSelectedCamera(camera); // Update selected camera
    if (selectTopic) {
      selectTopic(camera.topic); // Update selected topic via context
      console.log(`Topic selected: ${camera.topic}`);
    } else {
      console.error("Context function 'selectTopic' is not available.");
    }
  };

  return (
    <ScrollArea className="min-h-80 h-auto w-full rounded-lg border">
      <div className='grid grid-flow-row w-full space-y-4 p-2'>
        {Array.isArray(cameras) ? cameras.map((camera) => (
          <SidebarMenuItem
            key={camera._id}
            onClick={() => handleTopicSelect(camera)} // Pass the click handler
            className={`cursor-pointer rounded-md bg-[#121125] ${selectedCamera?._id === camera._id ? 'border border-blue-500' : ''}`}
          >
            <div
              key={camera.CameraName}
              className={`flex flex-row p-2 gap-3  w-full min-w-fit`}
            >
              <div className='flex w-[110px] h-[95px] max-w-[110px] justify-center items-center overflow-clip rounded-[8px]'>
                <iframe
                  src={`https://192.168.193.113:8889/${camera.topic}`}
                  className="w-full h-fit rounded"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className='flex w-full min-w-fit text-start text-white flex-col font-roboto justify-center items-start gap-[5px]'>
                <div className='flex flex-row w-full justify-between gap-1 px-1'>
                  <h4 className='font-bold text-[14px] font-roboto'>{camera.CameraName}</h4>
                  <div className='flex flex-row w-fit gap-2'>
                    <Image src="/svg/network.svg" alt="network" height={12} width={12} />
                    <Image src="/svg/cctv.svg" alt="cctv" height={16} width={16} />
                  </div>
                </div>
                <p className='text-[10px] font-semibold'>{camera.IP}</p>
                <p className='font-regular text-[10px]'>{camera.Location}</p>
                <div className='flex flex-row justify-start w-full overflow-hidden flex-nowrap gap-1'>
                  <div className='flex flex-row justify-center p-1 gap-2 bg-[#292932] rounded-md w-fit align-middle'>
                    <Image src="/svg/car.svg" alt="cars" height={12} width={12} />
                    <p className='text-[#A4A4AB] text-[12px] font-bold font-roboto'>
                      0
                    </p>
                  </div>
                  <div className='flex flex-row justify-center p-1 gap-2 bg-[#292932] rounded-md w-fit align-middle'>
                    <Image src="/svg/person2.svg" alt="persons" height={12} width={12} />
                    <p className='text-[#A4A4AB] text-[12px] font-bold font-roboto'>
                      0
                    </p>
                  </div>
                  <div className='flex flex-row justify-center p-1 gap-2 bg-[#292932] rounded-md w-fit align-middle'>
                    <Image src="/svg/fire.svg" alt="fire alert" height={12} width={12} />
                    <p className='text-[#A4A4AB] text-[12px] font-bold font-roboto'>
                      0
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SidebarMenuItem>
        )) : <p>No cameras available</p>}
      </div>
    </ScrollArea>
  );
};

export default function DealsLayout({ children }: { children: React.ReactNode }) {
  return (
    <TopicProvider>
      <CameraProvider>
        <GridViewProvider>
          <SidebarProvider>
            <Sidebar>
              <SidebarHeader>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <PageHeader
                      title="Surveillance"
                      subtitle="You can view live feed & alerts here."
                    />
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarHeader>

              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Actions</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <GridSlider />
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarGroup>
                    <SidebarGroupLabel asChild>
                      <CollapsibleTrigger>
                        All Cameras
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          <SidebarCameraMenu />
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </CollapsibleContent>
                  </SidebarGroup>
                </Collapsible>
              </SidebarContent>
              <SidebarFooter />
            </Sidebar>
            <main className="w-full min-h-screen flex flex-col bg-[#121125] p-2 hidden-scrollbar overscroll-contain ">
              <div className="sticky top-10">
                <SidebarTrigger />
                <div className="hidden md:block">
                  <Navbar />
                </div>
              </div>
              <div className=" overflow-y-auto max-h-[82vh] w-full md:overflow-y-clip mt-4 scrollbar-hide">{children}</div>
              <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1B1B2E]">
                <Navbar />
              </div>
            </main>
          </SidebarProvider>
        </GridViewProvider>
      </CameraProvider>
    </TopicProvider>
  );
}
