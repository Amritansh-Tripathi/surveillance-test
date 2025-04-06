"use client";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Logo } from "@/components/icons";

const Navbar = () => {
  const pathname = usePathname();

  if (pathname === '/SignUp') {
    return null; // Hide Navbar on SignUp page
  }

  const isActive = (path: string) => {
    return pathname.startsWith(path) ? 'bg-[#121125] py-[8px] px-[6px] rounded-none' : '';
  };

  return (
    <div className='flex flex-col md:flex-row h-fit items-center justify-between w-full bg-[#1B1B2E] rounded-[5px] px-3 my-1'>
      <Link href="/" className='hidden md:flex justify-start items-center'>
        <Logo />
      </Link>
      <div className='flex flex-row justify-around md:justify-center items-center w-full px-2 md:px-5'>
        <Link href="/surveillance/mobile" className={`p-2 rounded ${isActive('/Surveillance')}`}>
          <Image src="/svg/surveillanceIcon.svg" width={30} height={30} alt="surveillance" className="md:w-[30px] md:h-[30px]" />
        </Link>
        <Link href="/Summary" className={` hidden p-2 rounded ${isActive('/Summary')}`}>
          <Image src="/svg/summaryIcon.svg" width={30} height={30} alt="summary" className="md:w-[30px] md:h-[30px]" />
        </Link>
        <Link href="/vmsV2" className={`p-2 rounded ${isActive('/VMS')}`}>
          <Image src="/svg/visitorIcon2.svg" width={30} height={30} alt="vms" className="md:w-[30px] md:h-[30px]" />
        </Link>
        <Link href="/Alarms&Device" className={` hidden p-2 rounded ${isActive('/Alarms&Device')}`}>
          <Image src="/svg/AlarmsDevice.svg" width={30} height={30} alt="alarms device" className="md:w-[30px] md:h-[30px]" />
        </Link>
        <Link href="/ControlPanel" className={`hidden p-2 rounded ${isActive('/ControlPanel')}`}>
          <Image src="/svg/controlpanelIcon.svg" width={30} height={30} alt="control panel" className="md:w-[30px] md:h-[30px]" />
        </Link>
      </div>
      <div className='hidden md:flex flex-row gap-2 justify-end items-center w-fit px-3'>
        <Image src="/svg/notifications.svg" width={20} height={20} alt="notification" className='w-[30px] h-[30px]' />
        <p className='text-white flex min-w-fit text-[16px] font-medium text-start font-roboto items-center whitespace-nowrap'>
          Username
        </p>
      </div>
    </div>
  );
};

export default Navbar;