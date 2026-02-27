'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authAPI } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import toast, { Toaster } from 'react-hot-toast';
import { Package, Mail, Lock, User, Phone, Store, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email'),
  mobile: z.string().min(10, 'Mobile number is required'),
  storeName: z.string().min(2, 'Store name is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      const response = await authAPI.register(data);
      const { user, accessToken, refreshToken } = response.data;

      login(user, accessToken, refreshToken);
      toast.success(
        <div className="flex items-center gap-2">
          <span>🎉</span>
          <div>
            <p className="font-semibold">Welcome to KiranaIQ!</p>
            <p className="text-xs opacity-90">Account created successfully</p>
          </div>
        </div>,
        {
          duration: 3000,
          style: {
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
          },
        }
      );
      router.push('/dashboard');
    } catch (error: any) {
      const errorMsg = error.response?.data?.message;
      if (Array.isArray(errorMsg)) {
        toast.error(
          <div>
            <p className="font-semibold">Registration failed</p>
            <p className="text-xs opacity-90">{errorMsg.join(', ')}</p>
          </div>,
          {
            duration: 5000,
            style: {
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: '#fff',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: '0 8px 24px rgba(239, 68, 68, 0.3)',
            },
          }
        );
      } else {
        toast.error(
          <div>
            <p className="font-semibold">Registration failed</p>
            <p className="text-xs opacity-90">{errorMsg || 'Please try again'}</p>
          </div>,
          {
            duration: 4000,
            style: {
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: '#fff',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: '0 8px 24px rgba(239, 68, 68, 0.3)',
            },
          }
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 relative overflow-hidden">
      <Toaster position="top-center" />
      
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-bounce-slow"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-bounce-slow" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Logo & Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl mb-4 shadow-lg shadow-indigo-200 transform hover:scale-110 transition-transform duration-300">
            <Package className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            KiranaIQ
          </h1>
          <p className="text-muted-foreground mt-2 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Transform Your Kirana Store with AI
          </p>
        </div>

        {/* Register Card */}
        <div className="card p-8 animate-fade-in shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-foreground">Create Your Account</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Join thousands of store owners using smart inventory management
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="group">
                <label className="label flex items-center gap-2">
                  <User className="w-3 h-3" />
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <input
                    {...register('fullName')}
                    type="text"
                    className="input pl-12"
                    placeholder="John Doe"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-danger text-sm mt-2 flex items-center gap-1">
                    <span>⚠</span> {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="group">
                <label className="label flex items-center gap-2">
                  <Store className="w-3 h-3" />
                  Store Name
                </label>
                <div className="relative">
                  <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <input
                    {...register('storeName')}
                    type="text"
                    className="input pl-12"
                    placeholder="ABC General Store"
                  />
                </div>
                {errors.storeName && (
                  <p className="text-danger text-sm mt-2 flex items-center gap-1">
                    <span>⚠</span> {errors.storeName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="group">
              <label className="label flex items-center gap-2">
                <Mail className="w-3 h-3" />
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input
                  {...register('email')}
                  type="email"
                  className="input pl-12"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-danger text-sm mt-2 flex items-center gap-1">
                  <span>⚠</span> {errors.email.message}
                </p>
              )}
            </div>

            <div className="group">
              <label className="label flex items-center gap-2">
                <Phone className="w-3 h-3" />
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input
                  {...register('mobile')}
                  type="tel"
                  className="input pl-12"
                  placeholder="9876543210"
                />
              </div>
              {errors.mobile && (
                <p className="text-danger text-sm mt-2 flex items-center gap-1">
                  <span>⚠</span> {errors.mobile.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="group">
                <label className="label flex items-center gap-2">
                  <Lock className="w-3 h-3" />
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <input
                    {...register('password')}
                    type="password"
                    className="input pl-12"
                    placeholder="Min. 8 characters"
                  />
                </div>
                {errors.password && (
                  <p className="text-danger text-sm mt-2 flex items-center gap-1">
                    <span>⚠</span> {errors.password.message}
                  </p>
                )}
              </div>

              <div className="group">
                <label className="label flex items-center gap-2">
                  <Lock className="w-3 h-3" />
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <input
                    {...register('confirmPassword')}
                    type="password"
                    className="input pl-12"
                    placeholder="Re-enter password"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-danger text-sm mt-2 flex items-center gap-1">
                    <span>⚠</span> {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed text-base flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <div className="spinner w-5 h-5 border-2 border-white/30 border-t-white"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="divider"></div>

          <p className="text-center text-muted-foreground">
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="text-primary font-semibold hover:text-primary-hover transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mt-8 animate-fade-in">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl mb-2">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-xs font-semibold text-foreground">AI Predictions</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl mb-2">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-xs font-semibold text-foreground">Smart Stock</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl mb-2">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-xs font-semibold text-foreground">Profit Analytics</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 animate-fade-in">
          <p className="text-xs text-muted-foreground">
            🔒 Your data is secured with enterprise-grade encryption
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            © 2024 KiranaIQ. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
