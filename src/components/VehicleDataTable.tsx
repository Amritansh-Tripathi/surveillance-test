import React from 'react';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Image from 'next/image';

interface Vehicle {
  id: string;
  vehicle: string;
  vehicleNumber: string;
  Snapshot: string;
  ownerName: string;
  ownerContactNumber: string;
  status: boolean;
  borderColor: string;
}

interface VehicleDataTableProps {
  data: Vehicle[];
}

const VehicleDataTable: React.FC<VehicleDataTableProps> = ({ data }) => {
  const columns: ColumnDef<Vehicle>[] = [
    {
      accessorKey: 'vehicle',
      header: 'Vehicle',
    },
    {
      accessorKey: 'vehicleNumber',
      header: 'Vehicle Number',
    },
    {
      accessorKey: 'Snapshot',
      header: 'Snapshot',
      cell: ({ cell }) => (
        <div className='flex w-full justify-center items-center p-1'>
          <Image
            src={cell.getValue() as string} // Ensure this is a string
            alt="Snapshot"
            width={90}
            height={50}
            className="border-opacity-30 border-2 border-[#121125] rounded-full object-cover w-12 h-12"
          />
        </div>
      ),
    },
    {
      accessorKey: 'ownerName',
      header: 'Owner Name',
    },
    {
      accessorKey: 'ownerContactNumber',
      header: 'Owner Contact',
    },
    {
      accessorKey: 'status',
      header: 'Access',
      cell: (info) => (info.getValue() ? 'Granted' : 'Restricted'),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="min-w-full bg-[#1B1B2E] outline-4 outline-[#1B1B2E]">
      <thead className='rounded-md'>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="py-2 px-4 border-b-2 border-gray-200 bg-[#1B1B2E] text-white ">
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="py-2 px-4 border-b text-center border-gray-200 text-white">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VehicleDataTable;
