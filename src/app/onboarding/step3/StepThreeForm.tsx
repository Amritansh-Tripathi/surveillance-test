'use client';

import SubmitButton from '@/components/SubmitButton';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker'
import '@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css';
import 'react-clock/dist/Clock.css';

    type ValuePiece = Date | string | null;

    type Value = ValuePiece | [ValuePiece, ValuePiece];
  
  const StepThreeForm = () => {
    
    const [value, onChange] = useState<Value>(['', '']);

    useEffect(() => {

        toast.success("Operation timings updated successfully to " + value);
        //need to add custmtoast messages

    }, [value]);

    return (
      <div className='w-full h-full min-h-[500px] max-h-[620px] flex flex-col gap-4'> 
      <div className="flex flex-col items-start py-10 px-4">
      <h3 className="text-2xl font-semibold mb-6 text-white text-start">Operation timings</h3>

      <form className="w-full self-center bg-[#1B1B2E] p-6 rounded-lg shadow-md">
        <div className=' flex-row w-[60%] justify-between hidden'>
          <span className='text-xl font-semibold text-white text-center'>Opening time</span>
          <span className='text-xl font-semibold text-white text-center'>to</span>
          <span className='text-xl font-semibold text-white text-center'>Closing time</span>
        </div>
        <label className="block text-white/60 disabled:text-gray-700 text-sm font-bold mb-2" htmlFor="TimePicker">
        Opening & Closing Time
      </label>
        <TimeRangePicker id='TimePicker' onChange={onChange} format='h:m a' rangeDivider='' value={value} amPmAriaLabel='Select Opening and Closing Time' hourPlaceholder='h' name='' clearIcon='clear' minutePlaceholder='m' required={true} className='text-white rounded-lg border-2 border-white w-full flex flex-row justify-evenly' disableClock={true}/>
      </form>
      </div>

        <SubmitButton text="Continue" />
      </div>
    );
  }

export default StepThreeForm;