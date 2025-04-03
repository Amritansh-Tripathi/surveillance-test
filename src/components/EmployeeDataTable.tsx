import React from 'react';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Image from 'next/image';
import { Employee } from '@/types/employeetypes';

interface EmployeeDataTableProps {
  data: Employee[];
}

const EmployeeDataTable: React.FC<EmployeeDataTableProps> = ({ data }) => {
  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'ProfilePic',
      header: 'Snapshot',
      cell: ({ cell }) => (
        <div className='flex w-full justify-center items-center p-1'>
          <Image
            src={cell.getValue() as string}  // Ensure the value is cast to string
            alt="Snapshot"
            width={90}
            height={50}
            className="border-opacity-30 border-2 border-[#121125] rounded-full object-cover w-12 h-12"
          />
        </div>
      ),
    },
    {
      accessorKey: 'designation',
      header: 'Designation',
    },
    {
      accessorKey: 'timeStamp',
      header: 'Time Stamp',
    },
    {
      accessorKey: 'purpose',
      header: 'Purpose',
    },
    {
      accessorKey: 'department',
      header: 'Department',
    },
    {
      accessorKey: 'carNumber',
      header: 'Car Number',
    },
    {
      accessorKey: 'owner',
      header: 'Owner',
    },
    {
      accessorKey: 'age',
      header: 'Age',
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full bg-[#1B1B2E] outline-4 outline-[#1B1B2E]">
      <thead className="rounded-md">
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                className="py-2 px-4 border-b-2 border-gray-200 bg-[#1B1B2E] text-white"
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
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

export default EmployeeDataTable;
