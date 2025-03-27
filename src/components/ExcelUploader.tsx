import { useState, ChangeEvent, FormEvent } from "react";
import * as XLSX from "xlsx";

interface ExcelRow {
  [key: string]: string | number;
}

const ExcelUploader: React.FC = () => {
  const [excelFile, setExcelFile] = useState<ArrayBuffer | null>(null);
  const [typeError, setTypeError] = useState<string | null>(null);
  const [excelData, setExcelData] = useState<ExcelRow[] | null>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (event) => {
          if (event.target?.result) {
            setExcelFile(event.target.result as ArrayBuffer);
          }
        };
      } else {
        setTypeError("Please select only Excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("Please select your file");
    }
  };

  const handleFileSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (excelFile) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data: ExcelRow[] = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data.slice(0, 10));
    }
  };

  return (
    <div className="flex flex-col items-center py-10 px-4 bg-gray-100 min-h-screen">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Upload & View Excel Sheets</h3>

      <form
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
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

      <div className="w-full max-w-4xl mt-10">
        {excelData ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  {Object.keys(excelData[0]).map((key) => (
                    <th
                      key={key}
                      className="border border-gray-300 px-4 py-2 text-left text-gray-700"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {excelData.map((row, index) => (
                  <tr
                    key={index}
                    className={`$ {
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    {Object.keys(row).map((key) => (
                      <td
                        key={key}
                        className="border border-gray-300 px-4 py-2 text-gray-600"
                      >
                        {row[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-gray-600 text-center">No file is uploaded yet!</div>
        )}
      </div>
    </div>
  );
};

export default ExcelUploader;
