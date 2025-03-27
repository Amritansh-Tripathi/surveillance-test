'use client';
import Icon from '@/components/Icon';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import path from 'path';
import { useEffect, useState } from 'react';
import { OnboardingRoutes } from '@/types/index';
import { ChevronLeft } from 'lucide-react';

const steps = [
  {
    title: 'Camera Scan',
    route: 'step1',
    link: OnboardingRoutes.Camera_Scan,
  },
  {
    title: 'Employee Data',
    route: 'step2',
    link: OnboardingRoutes.EMPLOYEE_DATA,
  },
  {
    title: 'Operation Timing',
    route: 'step3',
    link: OnboardingRoutes.OPERATION_TIMING,
  },
  { title: 'Review', route: 'review', link: OnboardingRoutes.REVIEW },
];

export default function StepNavigation() {
  const pathname = usePathname();
  // const currentPath = path.basename(pathname);
  const currentPath = pathname.split('/').pop();
  console.log('currentPath:', currentPath);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    setCurrentStep(steps.findIndex((step) => step.route === currentPath));
  }, [currentPath]);

  return (
    <div className="mb-12 mt-4 lg:mb-0 min-w-60">
      {/* back button */}
      <Link
        href={steps[currentStep - 1]?.link || steps[0].link}
        className="mb-4 flex items-center justify-center hover:text-blue-200 max-w-fit border-none "
      >
        <ChevronLeft />
        <span className="hidden sm:inline">Go back</span>
      </Link>
      

      {/* list of form steps */}
      <div className="relative flex flex-row justify-between lg:flex-col lg:justify-start lg:gap-8">
        {steps.map((step, i) => (
          <Link
            href={step.link}
            key={step.link}
            className="group z-20 flex items-center gap-3 text-2xl"
            prefetch={true}
          >
            <span
              className={clsx(
                'flex h-10 w-10 items-center justify-center rounded-full border  text-sm  transition-colors duration-200  lg:h-12 lg:w-12 lg:text-lg',
                {
                  'border-solid border-spacing-6 border-4 border-[#1D36B9] bg-[#1B1B2E] text-white font-semibold group-hover:border-none group-hover:text-white':
                    currentPath === step.route,
                  'border-white/75 bg-gray-900 group-hover:border-white group-hover:text-white text-white/75':
                    currentPath !== step.route,
                }
              )}
            >
              {i + 1}
            </span>
            <span
              className={clsx(
                'hidden text-white/75 transition-colors duration-200 group-hover:text-white lg:block',
                {
                  'font-light': currentPath !== step.route,
                  'font-semibold text-white': currentPath === step.route,
                }
              )}
            >
              {step.title}
            </span>
          </Link>
        ))}
        {/* mobile background dashes */}
        <div className="absolute top-4 flex h-1 w-full border-b border-dashed lg:hidden" />
      </div>
    </div>
  );
}
