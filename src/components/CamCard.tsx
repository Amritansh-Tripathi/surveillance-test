const CamCard: React.FC<CamCardProps> = ({ 
  variant, 
  topic, 
  CameraName, 
  IP, 
  location, 
  floor, 
  EntryExit 
}) => {
  let cardStyle = '';
  let content: JSX.Element | null = null;

  switch (variant) {
    case 1:
      cardStyle = 'bg-[#1B1B2E]';
      content = (
        <>
          <div className='flex rounded-[15px] flex-center bg-opacity-[50] justify-center'>
            <iframe 
              src={`http://192.168.1.5:8889/${topic}`} 
              id={IP}
              className='w-full h-full rounded-sm'
            ></iframe>
          </div>
          <div className='flex flex-col gap-[5px] md:gap-[10px] justify-center align-center'>
            <p className='text-white font-roboto font-semibold text-[12px] md:text-[16px]'>Name {CameraName}</p>
            <p className='text-white font-roboto font-regular text-[10px] md:text-[14px] opacity-[60]'>I.P. {IP}</p>
            <p className='text-white font-roboto font-regular text-[10px] md:text-[14px] opacity-[60]'>Floor {floor}</p>
            <p className='text-white font-roboto font-regular text-[10px] md:text-[14px] opacity-[60]'>Location {location}</p>
            <p className='text-white/50 text-nowrap font-roboto font-regular text-[10px] md:text-[14px] opacity-[60]'>Entry/Exit {EntryExit}</p>
          </div>
          <button
            className="flex flex-row justify-center align-center w-full rounded-[10px] bg-[#1B1B2E] bg-opacity-25 py-[3px] md:py-[5px] px-[8px] md:px-[10px] border border-[#1D36B9] hover:bg-[#121125] text-center font-semibold text-white font-roboto text-[12px] md:text-[16px] mt-[10px] md:mt-[20px]"
          >
            Label
          </button>
        </>
      );
      break;
    case 2:
      cardStyle = 'bg-[#1B1B2E]';
      content = (
        <>
          <div className='flex rounded-[15px] flex-center bg-opacity-[50] justify-center'>
            {/* <Mqttplayer topicName={topic} id={IP} className='w-full h-full' /> */}
          </div>
          <div className='flex flex-col gap-[5px] md:gap-[10px] justify-center align-center'>
            <p className='text-white font-roboto font-semibold text-[12px] md:text-[16px]'>{CameraName}</p>
            <p className='text-white font-roboto font-regular text-[10px] md:text-[14px] opacity-[60]'>{IP}</p>
          </div>
          <button
            type="submit"
            className="flex flex-row justify-center align-center w-full rounded-[10px] bg-[#121125] bg-opacity-25 py-[3px] md:py-[5px] px-[8px] md:px-[10px] text-white border border-[#1D36B9] hover:bg-[#121125] text-center font-semibold text-white font-roboto text-[12px] md:text-[16px] mt-[10px] md:mt-[20px]"
          >
            Connected
          </button>
        </>
      );
      break;
    case 3:
      cardStyle = 'bg-[#1B1B2E]';
      content = (
        <>
          <div className='flex rounded-[15px] flex-center bg-[#121125] bg-opacity-[50] py-[20px] md:py-[40px] px-[40px] md:px-[80px] justify-center'>
            <Image src="/Camera.svg" alt="Sample Image" width={40} height={40} />
          </div>
          <div className='flex flex-col gap-[5px] md:gap-[10px] justify-center align-center'>
            <p className='text-white font-roboto font-semibold text-[12px] md:text-[16px]'>Name {CameraName}</p>
            <p className='text-white font-roboto font-regular text-[10px] md:text-[14px] opacity-[60]'>I.P. {IP}</p>
            <p className='text-white font-roboto font-regular text-[10px] md:text-[14px] opacity-[60]'>Floor {floor}</p>
            <p className='text-white font-roboto font-regular text-[10px] md:text-[14px] opacity-[60]'>Location {location}</p>
            <p className='text-white/50 font-roboto font-regular text-[10px] md:text-[14px] opacity-[60]'>Entry/Exit {EntryExit}</p>
          </div>
          <button
            type="submit"
            className="flex flex-row justify-center align-center w-full rounded-[10px] bg-[#1B1B2E] bg-opacity-25 py-[3px] md:py-[5px] px-[8px] md:px-[10px] text-white border border-[#1D36B9] hover:bg-[#121125] text-center font-semibold text-white font-roboto text-[12px] md:text-[16px] mt-[10px] md:mt-[20px]"
          >
            Connecting
          </button>
        </>
      );
      break;
    default:
      cardStyle = 'bg-[#1B1B2E]';
      content = (
        <>
          <div className='flex rounded-[15px] flex-center bg-[#121125] bg-opacity-[50] py-[20px] md:py-[40px] px-[40px] md:px-[80px] justify-center'>
            <Image src="/Camera.svg" alt="Camera Connecting" width={40} height={40} />
          </div>
          <div className='flex flex-col gap-[5px] md:gap-[10px] justify-center align-center'>
            <p className='text-white font-roboto font-semibold text-[12px] md:text-[16px]'>HIKIVISION_2MP_C342</p>
            <p className='text-white font-roboto font-regular text-[10px] md:text-[14px] opacity-[60]'>IP: 192.168.11.2</p>
          </div>
          <button
            type="submit"
            className="flex flex-row justify-center align-center w-full rounded-[10px] bg-[#121125] bg-opacity-25 py-[3px] md:py-[5px] px-[8px] md:px-[10px] text-white border border-[#1D36B9] hover:bg-[#121125] text-center font-semibold text-white font-roboto text-[12px] md:text-[16px] mt-[10px] md:mt-[20px]"
          >
            Connected
          </button>
        </>
      );
  }

  return (
    <div className={`flex flex-col w-fit h-fit gap-2 px-3 md:px-5 py-2 md:py-3 rounded-xl mb-2 md:mb-3 ${cardStyle}`}>
      {content}
    </div>
  );
};

export default CamCard;
