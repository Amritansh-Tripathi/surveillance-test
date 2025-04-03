'use client';
import React, { useEffect, useState, useRef } from 'react';
import EmployeeCard from './EmployeeDataCardnew';
import EmployeeDataTable from './EmployeeDataTable';
import { Employee } from '@/types/employeetypes';
import { ScrollArea } from "@/components/ui/scroll-area"

interface EmployeeFromAPI {
  _id: string;
  PhoneNumber: string;
  Password: string;
  ProfilePic: string;
  DeviceIP: string;
  Name: string;
  Person_id: string;
  Department: string;
  Vehicle: string;
  VehicleNumber: string;
  Age: number;
  Role: string;
  Status: boolean;
  Snapshot: string;
  __v: number;
  type: string;
}

const transformEmployeeToCardProps = (employee: EmployeeFromAPI): Employee => ({
  id: employee._id,
  name: employee.Name,
  Snapshot: employee.ProfilePic,
  designation: employee.Role,
  timeStamp: Date.now(),
  purpose: employee.Department,
  image: employee.Snapshot,
  department: employee.Department,
  borderColor: employee.Status ? '#1D36B9' : '#FF0000', // Example logic for border color
  age: employee.Age,
  remark: employee.Status,
  ProfilePic: employee.ProfilePic,
  type: "Personal",
  role: employee.Role,
  PhoneNumber: employee.PhoneNumber,
  Person_id: employee.Person_id,
  Vehicle: employee.Vehicle,
  VehicleNumber: employee.VehicleNumber,
});

interface EmployeesProps {
  view: 'card' | 'table';
}

const Employees = ({ view }: EmployeesProps) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const componentRef = useRef(null);

  useEffect(() => {
    fetch('http://192.168.193.113:3000/api/oldapi/personals')
      .then((response) => response.json())
      .then((data) => {
        const transformedEmployees = data.personals.map((employee: EmployeeFromAPI) =>
          transformEmployeeToCardProps(employee)
        );
        setEmployees(transformedEmployees);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="flex flex-col justify-start items-start w-full h-full">
      {/* Content */}
      <div ref={componentRef} className="w-full h-full p-2 bg-[#1B1B2E]">
      <ScrollArea className="h-40 w-full">
        {view === 'card' ? (
          <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-2">
            {employees.map((employee) => (
              <EmployeeCard key={employee.id} {...employee} />
            ))}
          </div>
        ) : (
          <EmployeeDataTable data={employees} />
        )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default Employees;
