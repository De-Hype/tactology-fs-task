'use client';

import { useAuth } from '@/providers/AuthProvider';
import Link from 'next/link';
import DepartmentList from '@/components/departments/DepartmentList';

export default function DepartmentsPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-slate-800 font-bold">Departments</h1>
        <Link
          href="/departments/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          New Department
        </Link>
      </div>
      
      <DepartmentList />
    </div>
  );
}