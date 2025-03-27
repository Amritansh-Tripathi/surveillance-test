import React from 'react';
import PageHeader from '@/components/PageHeader';
import StepNavigation from '@/components/StepNavigation';
import { OnboardingProvider } from '@/app/onboarding/context/OnboardingContext';


export default function DealsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full px-2 lg:px-0 py-10">
      <PageHeader
        title="Onboarding"
        subtitle="Welcome! Please provide details for each step to get started."
      />

      <div className="mt-20 mb-28 flex flex-col gap-x-16 text-white lg:flex-row">
        <StepNavigation />
        <OnboardingProvider>
          <div className="w-full">{children}</div>
        </OnboardingProvider>
      </div>
    </div>
  );
}
