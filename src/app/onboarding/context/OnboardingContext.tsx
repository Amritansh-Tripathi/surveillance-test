// app/onboarding/context/OnboardingContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';

interface OnboardingData {
  cameras: { name: string; label: string }[];
  users: string[];
  operationTimes: { start: string; end: string };
}

const OnboardingContext = createContext<any>(null);

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<OnboardingData>({
    cameras: [],
    users: [],
    operationTimes: { start: '', end: '' },
  });

  return (
    <OnboardingContext.Provider value={{ data, setData }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboardingContext = () => useContext(OnboardingContext);
