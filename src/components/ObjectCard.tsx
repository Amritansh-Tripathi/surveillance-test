import React from 'react';
import Image from 'next/image';

interface ObjectCardProps {
  id: string;
  type?: string;
  name?: string;
  Snapshot?: string;
  timeStamp: number | string;
  borderColor: string;
  Camera?: string;
}

const ObjectCard: React.FC<ObjectCardProps> = ({ id, type, name, Snapshot, timeStamp, borderColor }) => {
  console.log('card rendered ' + name);

  const cardStyles = {
    person: 'border-[#1D36B9]',
    visitor: 'border-[#FFB903]',
    vehicle: 'border-[#1D36B9]',
    unknown: 'border-[#FF0000]',
  };

  function formatTimestamp(timestamp: number | string): string {
    const date = new Date(typeof timestamp === 'string' ? timestamp : timestamp * 1000);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
  }

  return (
    <div
      id={id}
      className={`relative col-span-1 row-span-1 flex flex-row align-middle justify-start gap-x-5 rounded-[15px] border overflow-hidden pr-[5px] min-w-fit w-fit max-w-[310px] border-[${borderColor}] mb-5 mr-5`}
    >
      <div
        className='flex w-full h-32 justify-center items-center max-h-[120px] bg-white bg-no-repeat bg-cover bg-center'
        style={{ backgroundImage: Snapshot ? `url(${Snapshot})` : 'none' }}
      >
        {Snapshot ? (
          <Image
            src={Snapshot}
            alt="Object snapshot"
            width={90}
            height={50}
            className='static h-full w-full min-w-[150px] object-contain object-center overflow-visible shadow-md'
          />
        ) : (
          <div className='flex justify-center items-center w-full text-nowrap text-white'>
            No Snapshot Captured
          </div>
        )}
      </div>
      <div className='w-full flex flex-col justify-center p-2'>
        <div className='flex flex-row justify-between'>
          <p className={`text-white font-roboto text-[14px] capitalize font-bold ${cardStyles[type as keyof typeof cardStyles]}`}>
            {type}
          </p>
        </div>
        <p className='text-white capitalize font-roboto text-[10px] font-medium opacity-60'>
          Name: {name}
        </p>
        <p className='text-white font-roboto text-[10px] font-normal opacity-60'>
          Time Stamp: {formatTimestamp(timeStamp)}
        </p>
      </div>
    </div>
  );
};

export default ObjectCard;
