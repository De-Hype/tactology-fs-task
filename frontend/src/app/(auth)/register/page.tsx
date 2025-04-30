'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import CreateUserForm from '@/components/auth/CreateUserForm';

export default function RegisterPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/departments');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="max-w-md mx-auto py-12">
      <CreateUserForm />
    </div>
  );
}