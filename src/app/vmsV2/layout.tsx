'use client';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import React from 'react';
import { TopicProvider, useTopicContext } from '@/contexts/TopicContext';



export default function DealsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full min-h-screen flex flex-col bg-[#121125] p-2 hidden-scrollbar overscroll-contain justify-start gap-3">
      <div className="sticky top-10">
        <div className="hidden md:block">
          <Navbar />
        </div>
      </div>
      <div className="flex w-full h-full mt-6 max-h-[90vh] overflow-y-auto md:overflow-y-clip">{children}</div>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1B1B2E]">
        <Navbar />
      </div>
    </main>
  );
}
