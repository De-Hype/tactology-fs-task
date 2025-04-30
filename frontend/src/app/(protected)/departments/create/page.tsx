'use client';

import { useAuth } from '@/providers/AuthProvider';
import Link from 'next/link';
import CreateDepartmentForm from '@/components/departments/CreateDepartmentForm';

export default function CreateDepartmentPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link 
          href="/departments"
          className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
        >
          <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Departments
        </Link>
        <h1 className="text-2xl text-black font-bold">Create Department</h1>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <CreateDepartmentForm />
      </div>
    </div>
  );
}