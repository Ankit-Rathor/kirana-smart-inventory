'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Package } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md text-center">
        <div className="card p-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-6">
            <Package className="w-10 h-10 text-indigo-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">KiranaIQ</h1>
          <p className="text-gray-600 mb-8">
            Smart Inventory & Profit Optimization System
          </p>

          <div className="space-y-4">
            <Link href="/auth/login" className="block w-full btn-primary py-3 text-center">
              Sign In
            </Link>
            <Link href="/auth/register" className="block w-full btn-secondary py-3 text-center">
              Create Account
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Transform your kirana store with data-driven inventory management
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
