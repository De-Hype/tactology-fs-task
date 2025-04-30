
"use client";

import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";
import EditDepartmentForm from "@/components/departments/EditDepartmentForm";
import { use } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EditDepartmentPage({ params }: any) {
  const { isAuthenticated } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resolvedParams: any = use(params);

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
          <svg
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Departments
        </Link>
        <h1 className="text-2xl text-black font-bold">Edit Department</h1>
      </div>

      <div className="container mx-auto px-4 py-8">
        <EditDepartmentForm departmentId={resolvedParams.id} />
      </div>
    </div>
  );
}
