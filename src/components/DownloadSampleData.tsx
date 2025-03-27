import React from 'react';

const DownloadSampleData: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center m-2 md:flex-row w-full md:justify-end md:items-center">
      <a
        href="/sample-data.xlsx" // Path to the file in the `public` folder
        download="sample-data.xlsx" // Suggested file name when downloaded
        className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out flex w-full md:w-fit justify-center items-center"  
      >
        Download Sample Excel File
      </a>
    </div>
  );
};

export default DownloadSampleData;
