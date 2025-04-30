'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import Link from 'next/link';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/departments');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Department Management System
      </h1>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        Easily manage your organizations departments and sub-departments structure.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          href="/login"
          className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {isAuthenticated ? 'Go to Dashboard' : 'Login to Get Started'}
        </Link>
      </div>
      
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900">Features</h2>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Department Hierarchy</h3>
            <p className="mt-2 text-gray-600">
              Create and manage departments with multiple sub-departments in a structured hierarchy.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Easy Management</h3>
            <p className="mt-2 text-gray-600">
              Add, edit, or remove departments with a simple and intuitive interface.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Secure Access</h3>
            <p className="mt-2 text-gray-600">
              JWT authentication ensures that only authorized users can access and modify department data.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Responsive Design</h3>
            <p className="mt-2 text-gray-600">
              Access and manage your departments from any device with our fully responsive interface.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}