'use client';
import CamCard from '@/components/CamCard';
import Input from '@/components/Input';
import SubmitButton from '@/components/SubmitButton';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';
// import Spline from "@splinetool/react-spline";
import Spline from "@splinetool/react-spline";
import Image from 'next/image';
import { Typewriter } from 'react-simple-typewriter';

interface CameraData {
    topic: string;
    CameraName: string;
    IP: string;
  }
  const StepOneForm = () => {
    const [camData, setCamData] = useState<CameraData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(!false);

    useEffect(() => {
        const fetchCameras = async () => {
          try {
            const response = await fetch('/api/cameras/get_all');
            if (!response.ok) {
              throw new Error('Failed to fetch cameras');
            }
            const data = await response.json();
            // toast({
            //   variant: "default",
            //   title: "Success",
            //   description: "Cameras discovered successfully",
            // });
            toast.success('Cameras discovered successfully');
            setCamData(data.cameras);
          } catch (error) {
            console.error('Error fetching cameras:', error);
            setError('Failed to fetch cameras');
            toast.error('Failed to fetch cameras');
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 5000);
    }
        };

    fetchCameras();
      }, [toast]);


    if (isLoading) {
      return <div className='w-full h-full flex flex-col gap-[10px] p-[40px]'>
      <div className='w-full h-full flex flex-col gap-[20px] justify-between'>
        <div className='flex flex-row justify-center align-center px-[20px] '>
          <p className='text-white font-roboto font-semibold text-[24px] '>
            <Typewriter
              delaySpeed={300}
              deleteSpeed={35}
              loop={1}
              typeSpeed={55}
              words={['Welcome to', 'Camera Onboarding']}
            />
          </p>
        </div>
        <div className='flex flex-row justify-center align-center px-[20px] '>
          <p className='font-digital text-[32px] text-center text-white font-bold'>
            <Typewriter
              delaySpeed={300}
              deleteSpeed={35}
              loop={0}
              typeSpeed={75}
              words={['Scanning Cameras...',]}
            />
          </p>
        </div>
        <div className='flex flex-col w-full h-full min-h-[500px] max-h-[620px] justify-center items-center align-center px-[10px] py-[10px] bg-[#121125] rounded-md hidden-scrollbar '>
          {/* <Spline scene="https://prod.spline.design/mNiu7iU7WnbitP06/scene.splinecode" className='w-max-[500px]' /> */}
          <Spline scene="https://prod.spline.design/T3x9op91a7hfLREA/scene.splinecode" className='w-max-[500px]' />
          
        </div>
        
        <div className='flex justify-end align-center px-[20px] '>
          <Link href={'/Surveillance'}>
            <button type="submit" className="hidden flex-row gap-[10px] algn-center w-fit h-fit rounded-[15px] bg-[#121125] bg-opacity-25 py-[5px] px-[10px] border border-[#1D36B9] hover:bg-[#121125] text-center font-semibold text-white font-roboto text-[16px]">
              <span className='flex flex-row justify-center align-center gap-[5px]'>
                <Image src="/arrow-right.svg" alt="add" width={16} height={16} />Next
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>;
    }
    if (error) {
      return <div>{error}</div>;
    }
    else if (camData.length === 0) {
      return <div>No cameras found</div>;
    }
    else {
    return (
      <div className='w-full h-full min-h-[500px] max-h-[620px] flex flex-col gap-4'> 
        <div className='w-full h-full min-h-[500px] max-h-[620px]  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-start items-start px-2 py-[10px] bg-[#121125] rounded-md custom-scrollbar scollbar-hidden'>
          {camData.map((cam, index) => (
              <CamCard key={index} variant={1} topic={cam.topic} CameraName={cam.CameraName} IP={cam.IP} />
          ))}
      </div>

      <SubmitButton text="Continue" />
      </div>
    );
  }
};

export default StepOneForm;