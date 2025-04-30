'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CREATE_DEPARTMENT } from '@/lib/graphql/mutations';
import { GET_DEPARTMENTS } from '@/lib/graphql/queries';

const subDepartmentSchema = z.object({
  name: z.string().min(2, { message: 'Sub-department name must be at least 2 characters' }),
});

const createDepartmentSchema = z.object({
  name: z.string().min(2, { message: 'Department name must be at least 2 characters' }),
  hasSubDepartments: z.boolean().optional(),
  subDepartments: z.array(subDepartmentSchema).optional(),
});

type CreateDepartmentFormData = z.infer<typeof createDepartmentSchema>;

export default function CreateDepartmentForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [createDepartment, { loading }] = useMutation(CREATE_DEPARTMENT, {
    refetchQueries: [{ query: GET_DEPARTMENTS }],
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateDepartmentFormData>({
    resolver: zodResolver(createDepartmentSchema),
    defaultValues: {
      name: '',
      hasSubDepartments: false,
      subDepartments: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subDepartments',
  });

  const hasSubDepartments = watch('hasSubDepartments');

  const onSubmit = async (data: CreateDepartmentFormData) => {
    try {
      setError(null);
      
      const input = {
        name: data.name,
        subDepartments: data.hasSubDepartments && data.subDepartments ? data.subDepartments : undefined,
      };
      console.log(input);
      
  
      await createDepartment({
        variables: { input },
      });
  
      router.push('/departments');
    } catch (err) {
      setError('Failed to create department. Please try again.');
      console.error('Create department error:', err);
    }
  };
  

  return (
    <div className="bg-white text-black rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Create New Department</h2>
      
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
        
        <div className="flex items-center">
          <input
            id="hasSubDepartments"
            type="checkbox"
            {...register('hasSubDepartments')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="hasSubDepartments" className="ml-2 block text-sm text-gray-700">
            Add Sub-Departments
          </label>
        </div>
        
        {hasSubDepartments && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Sub-Departments</h3>
              <button
                type="button"
                onClick={() => append({ name: '' })}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Add Sub-Department
              </button>
            </div>
            
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2">
                <div className="flex-grow">
                  <input
                    {...register(`subDepartments.${index}.name`)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Sub-department name"
                  />
                  {errors.subDepartments?.[index]?.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.subDepartments[index]?.name?.message}
                    </p>
                  )}
                </div>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2 text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
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
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Department'}
          </button>
        </div>
      </form>
    </div>
  );
}
