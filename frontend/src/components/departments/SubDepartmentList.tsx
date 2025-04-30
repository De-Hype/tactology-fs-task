'use client';

import { SubDepartment } from '@/types/department';

interface SubDepartmentListProps {
  subDepartments: SubDepartment[];
}

export default function SubDepartmentList({ subDepartments }: SubDepartmentListProps) {
  if (!subDepartments || subDepartments.length === 0) {
    return <p className="text-sm text-gray-500">No sub-departments</p>;
  }

  return (
    <div className="mt-2">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Sub-departments</h4>
      <ul className="space-y-1">
        {subDepartments.map((subDept) => (
          <li 
            key={subDept.id}
            className="text-sm py-1 px-2 rounded-md bg-gray-100 text-gray-700"
          >
            {subDept.name}
          </li>
        ))}
      </ul>
    </div>
  );
}