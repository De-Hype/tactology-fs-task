'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { Department } from '@/types/department';
import { DELETE_DEPARTMENT } from '@/lib/graphql/mutations';
import { GET_DEPARTMENTS } from '@/lib/graphql/queries';
import SubDepartmentList from './SubDepartmentList';
import { useRouter } from 'next/navigation';


interface DepartmentCardProps {
  department: Department;
}

export default function DepartmentCard({ department }: DepartmentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  
  const [deleteDepartment] = useMutation(DELETE_DEPARTMENT, {
    refetchQueries: [{ query: GET_DEPARTMENTS }],
  });

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${department.name}?`)) {
      setIsDeleting(true);
      try {
         await deleteDepartment({
          variables: { id: Number(department.id) }, 
        });
        router.push('/departments');
        window.location.reload()
      } catch (error) {
        console.error('Error deleting department:', error);
        alert('Failed to delete department. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };
  

  return (
    <div className="border rounded-lg shadow-sm overflow-hidden bg-white">
      <div className="p-4 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{department.name}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {department.subDepartments.length} Sub-departments
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {isExpanded && department.subDepartments.length > 0 && (
        <div className="px-4 pb-3 pt-1 border-t border-gray-200">
          <SubDepartmentList subDepartments={department.subDepartments} />
        </div>
      )}
      
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex justify-between items-center">
        <div className="flex space-x-2">
          <Link 
            href={`/departments/${department.id}/edit`}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}