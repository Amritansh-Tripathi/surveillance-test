import React from 'react';
import StepOneForm from '@/app/onboarding/step1/StepOneForm';
import AddCamera from '@/components/AddCamera';

export default function StepOne() {
  return (
    <div className='gap-4'>
      <div className='float-right'>
        <AddCamera />
      </div>
      <StepOneForm />
    </div>
  );
}
