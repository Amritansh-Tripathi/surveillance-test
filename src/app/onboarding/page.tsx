import { OnboardingRoutes } from '@/types/index';
import { redirect } from 'next/navigation';
import React from 'react';

export default function AddPage() {
  redirect(OnboardingRoutes.Camera_Scan);
}
