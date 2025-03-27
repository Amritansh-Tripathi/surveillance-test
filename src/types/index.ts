import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// filepath: /my-mongoose-app/types/index.ts
export type UserProps = {
  name: string;
  age: number;
  profilePic: string; // Add profilePic field
};

export type ExcelRow =  {
  name: string | null,
  email: string | null,
  phone: string | null,
  department: string | null,
  age: number | null,
  role: string | null,
  status: boolean,
};

export const excelRows: ExcelRow[] = [
  {
    name: null,
    email: null,
    phone: null,
    department: null,
    age: null,
    role: null,
    status: true,
  },
  // Add more objects as needed
];

export interface FormErrors {
  [key: string]: string | undefined;
}

export enum OnboardingRoutes {
  Camera_Scan = '/onboarding/step1',
  EMPLOYEE_DATA = '/onboarding/step2',
  OPERATION_TIMING = '/onboarding/step3',
  REVIEW = '/onboarding/review',
}
  
