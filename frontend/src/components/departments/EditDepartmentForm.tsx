'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { GET_DEPARTMENT, GET_DEPARTMENTS } from '@/lib/graphql/queries';
import { UPDATE_DEPARTMENT } from '@/lib/graphql/mutations';

const editDepartmentSchema = z.object({
  name: z.string().min(2, { message: 'Department name must be at least 2 characters' }),
});

type EditDepartmentFormData = z.infer<typeof editDepartmentSchema>;

interface EditDepartmentFormProps {
  departmentId: string;
}

export default function EditDepartmentForm({ departmentId }: EditDepartmentFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const parsedId = parseInt(departmentId);

  const { loading: queryLoading, error: queryError, data } = useQuery(GET_DEPARTMENT, {
    variables: { id: parsedId },
    fetchPolicy: 'network-only',
  });

  const [updateDepartment, { loading: mutationLoading }] = useMutation(UPDATE_DEPARTMENT, {
    refetchQueries: [{ query: GET_DEPARTMENTS, variables: { limit: 10, page: 1 } }],
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditDepartmentFormData>({
    resolver: zodResolver(editDepartmentSchema),
    defaultValues: { name: '' },
  });

  useEffect(() => {
    if (data?.department) {
      reset({ name: data.department.name });
    }
  }, [data, reset]);


const onSubmit = async (formData: EditDepartmentFormData) => {
    try {
      setError(null);
      console.log(typeof(departmentId))
  
      await updateDepartment({
        variables: {
          input: {
            id: Number(departmentId),
            name: formData.name,
          },
        },
      });
  
      router.push('/departments');
    } catch (err) {
      console.error('Update error:', err);
      setError('Failed to update department. Please try again.');
    }
  };
  
  if (queryLoading) {
    return (
      <div className="w-full text-center p-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2">Loading department...</p>
      </div>
    );
  }

  if (queryError) {
    return (
      <div className="bg-red-50 p-4 rounded-md border border-red-300">
        <h3 className="text-sm font-medium text-red-800">Error loading department</h3>
        <div className="mt-2 text-sm text-red-700">
          <p>{queryError.message}</p>
        </div>
      </div>
    );
  }

  if (!data?.department) {
    return (
      <div className="bg-yellow-50 p-4 rounded-md border border-yellow-300">
        <h3 className="text-sm font-medium text-yellow-800">Department not found</h3>
      </div>
    );
  }

  return (
    <div className="bg-white text-black rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Edit Department</h2>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Department Name
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter department name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {data.department.subDepartments?.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700">Sub-Departments</h3>
            <p className="text-sm text-gray-500">
              This department has {data.department.subDepartments.length} sub-departments.
              You can only edit the department name here.
            </p>
            <ul className="mt-2 space-y-1">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {data.department.subDepartments.map((subDept: any) => (
                <li key={subDept.id} className="text-sm py-1 px-2 rounded-md bg-gray-100 text-gray-700">
                  {subDept.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => router.push('/departments')}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={mutationLoading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mutationLoading ? 'Updating...' : 'Update Department'}
          </button>
        </div>
      </form>
    </div>
  );
}