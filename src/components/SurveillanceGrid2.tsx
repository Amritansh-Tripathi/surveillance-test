// import clsx from 'clsx';
// import Image from 'next/image';

// const SurveillanceGrid2 = ({ gridView }: { gridView: number}) => {
//     const totalPlayers = 16; // Assuming a maximum of 16 video players
//     const players = Array.from({ length: totalPlayers }, (_, index) => index + 1); // Mock player data

//     return (
//         <div className="grid bg-[#1B1B2E] rounded-lg w-full h-full p-2  m-1 overflow-y-scroll gap-y-2" 
//             style={{
//                 gridTemplateColumns: `repeat(${gridView}, minmax(0, 2fr))`,
//                 gridTemplateRows: `repeat(${gridView}, minmax(0, 2fr))`,
//                 gap: '2rem', // Gap between grid items
//             }}>
//             {players.slice(0, gridView * gridView).map((player) => (
//                 <div 
//                     key={player}
//                     className="bg-[#121125] rounded-md flex items-center justify-center py-12 text-white gap-2 m-2"
//                 >
//                     {/* Replace the text below with your video player component */}
//                     <div
//                     className={`relative col-span-1 row-span-1 flex flex-row align-middle justify-start gap-x-5 rounded-[15px] border overflow-hidden pr-[5px] min-w-fit  w-fit max-w-[310px] bg-[#1D369B] m-1`}
//                     >
//                     <div className='flex w-full h-full justify-center items-center max-h-[200px] bg-white bg-no-repeat bg-cover bg-center' >
                     
//                         <Image
//                             src=''
//                             alt="Object snapshot"
//                             width={90}
//                             height={50}
//                             className='static h-full w-full min-w-[150px] object-contain object-center overflow-visible shadow-md'
//                         />
                       
//                         </div>
//                     <div className='w-full flex flex-col justify-center p-2'>
//                         <div className='flex flex-row justify-between'>
//                         <p className='text-white font-roboto text-[14px] capitalize font-bold '>
                            
//                         </p>
//                         </div>
//                         <p className='text-white capitalize font-roboto text-[10px] font-medium opacity-60'>
//                         Name: 
//                         </p>
//                         <p className='text-white font-roboto text-[10px] font-normal opacity-60'>
//                         Time Stamp: 
//                         </p>
//                     </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default SurveillanceGrid2;


import clsx from 'clsx';

const SurveillanceGrid = ({ gridView }: { gridView: number}) => {
    const totalPlayers = 16; // Assuming a maximum of 16 video players
    const players = Array.from({ length: totalPlayers }, (_, index) => index + 1); // Mock player data

    return (
        <div className="grid bg-[#1B1B2E] rounded-lg w-full h-full p-2 m-1" 
            style={{
                gridTemplateColumns: `repeat(${gridView}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${gridView}, minmax(0, 1fr))`,
                gap: '0.5rem', // Gap between grid items
            }}>
            {players.slice(0, gridView * gridView).map((player) => (
                <div 
                    key={player}
                    className="bg-[#121125] rounded-md flex items-center justify-center text-white"
                >
                    {/* Replace the text below with your video player component  ${camera.topic} */}
                    <iframe 
              src={`http://192.168.175.113:8889/mystream`} 
              className="w-full h-full rounded-sm" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
                </div>
            ))}
            
        </div>
    );
};

export default SurveillanceGrid;
