// src/components/ExcelUploaderImage.tsx
import { useState, ChangeEvent, FormEvent } from "react";
import { Workbook } from "exceljs";
import SaveUsersButton from "./SaveUsersButton";
import DownloadSampleData from "./DownloadSampleData";

interface ExcelRow {
  [key: string]: string | number;
}

interface ImageData {
  id: string;
  base64: string;
}

const ExcelUploader: React.FC = () => {
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [typeError, setTypeError] = useState<string | null>(null);
  const [excelData, setExcelData] = useState<ExcelRow[] | null>(null);
  const [images, setImages] = useState<ImageData[]>([]);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        setExcelFile(selectedFile);
      } else {
        setTypeError("Please select only Excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("Please select your file");
    }
  };

  // const handleFileSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (excelFile) {
  //     const formData = new FormData();
  //     formData.append("file", new Blob([excelFile]));

  //     try {
  //       const response = await fetch("/api/upload-excel", {
  //         method: "POST",
  //         body: formData,
  //       });

  //       if (response.ok) {
  //         const result = await response.json();
  //         setExcelData(result.data);
  //         setImages(result.images);
  //       } else {
  //         console.error("Error uploading file");
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   }
  // };

  const handleFileSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (excelFile) {
      const formData = new FormData();
      formData.append("file", new Blob([excelFile]));
  
      try {
        const response = await fetch("/api/upload-excel", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          const result = await response.json();
          setExcelData(result.data); // Set the Excel data
          setImages(result.images); // Set the images from the API response
        } else {
          console.error("Error uploading file");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  
  return (
    <div className="flex flex-col items-start py-10 px-4">
      <h3 className="text-md lg:text-2xl font-semibold mb-6 text-white text-start">Upload Employee data Sheets</h3>
      <DownloadSampleData />

      <form
        className="w-full  self-center bg-[#1B1B2E] p-6 rounded-lg shadow-md"
        onSubmit={handleFileSubmit}
      >
        <input
          type="file"
          className="block w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          onChange={handleFile}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          UPLOAD
        </button>
        {typeError && (
          <div
            className="mt-4 bg-red-100 text-red-600 border border-red-300 p-2 rounded"
            role="alert"
          >
            {typeError}
          </div>
        )}
      </form>

      <div className="w-full  mt-10 rounded-md max-h-80 overflow-y-auto">
        {excelData ? (
          <div className="overflow-x-auto mb-6 flex flex-col items-center gap-2">
            <table className="table-auto w-full border-collapse border border-gray-600">
              <thead>
                <tr className="bg-gray-400">
                  {Object.keys(excelData[0]).map((key) => (
                    <th
                      key={key}
                      className="border border-gray-700 px-4 py-2 text-left text-white"
                    >
                      {key}
                    </th>
                  ))}
                  <th className="border border-gray-700 px-4 py-2 text-left text-white">Image</th>
                </tr>
              </thead>
              <tbody>
                {excelData.map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-600" : "bg-gray-200"}
                  >
                    {Object.keys(row).map((key) => (
                      <td
                        key={key}
                        className="border border-gray-700 px-4 py-2 text-black"
                      >
                        {row[key]}
                      </td>
                    ))}
                    <td className="border border-gray-700 px-4 py-2 text-black">
                      {images[index] ? (
                        <img
                          src={images[index].base64}
                          alt={`Embedded Image ${images[index].id}`}
                          className="w-full h-auto border border-gray-300 rounded-md"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <SaveUsersButton excelData={excelData} images={images} />

            {/* <SaveUsersButton excelData={excelData} /> */}
          </div>
          
        ) : (
          <div className="text-gray-600 text-center mb-6">
            No file is uploaded yet!
          </div>
        )}
      </div>
    </div>
  );
};

export default ExcelUploader;
