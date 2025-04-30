'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_DEPARTMENTS } from '@/lib/graphql/queries';
import { Department } from '@/types/department';
import DepartmentCard from './DepartmentCard';

export default function DepartmentList() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  
  const { loading, error, data } = useQuery(GET_DEPARTMENTS, {
    variables: { page, limit },
    fetchPolicy: 'network-only',
  });
  console.log(data)

  if (loading) {
    return (
      <div className="w-full text-center p-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2">Loading departments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md border border-red-300">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading departments</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error.message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const departments: Department[] = data.departments || [];

  if (departments.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium text-gray-500">No departments found</h3>
        <p className="mt-2 text-gray-500">Create your first department to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department) => (
          <DepartmentCard key={department.id} department={department} />
        ))}
      </div>
      
      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-2 mt-8">
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">Page {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={departments.length < limit}
          className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
