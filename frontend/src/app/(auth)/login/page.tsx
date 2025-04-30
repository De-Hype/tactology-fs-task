'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/departments');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="max-w-md mx-auto py-12">
      <LoginForm />
    </div>
  );
}