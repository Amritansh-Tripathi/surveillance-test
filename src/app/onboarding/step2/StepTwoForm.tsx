'use client';
import SubmitButton from '@/components/SubmitButton';
import ExcelUploader from '@/components/ExcelUploaderImage';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';


  const StepTwoForm = () => {

    return (
      <div className='w-full h-full min-h-[500px] max-h-[620px] flex flex-col gap-4'> 
        <ExcelUploader/>
        <SubmitButton text="Continue" />
      </div>
    );
  }

export default StepTwoForm;