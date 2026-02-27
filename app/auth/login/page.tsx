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
import {
  Package,
  AtSign,
  LockKeyhole,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  ShieldCheck,
  TrendingUp,
  Smartphone,
  CheckCircle2
} from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const response = await authAPI.login(data);
      const { user, accessToken, refreshToken } = response.data;

      login(user, accessToken, refreshToken);
      toast.success(
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <div>
            <p className="font-semibold">Welcome back, {user.fullName}!</p>
            <p className="text-xs opacity-90">Accessing your dashboard...</p>
          </div>
        </div>,
        {
          duration: 3000,
          style: {
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 10px 25px rgba(79, 70, 229, 0.4)',
          },
        }
      );
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(
        <div>
          <p className="font-semibold">Authentication failed</p>
          <p className="text-xs opacity-90">{error.response?.data?.message || 'Invalid email or password'}</p>
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
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: ShieldCheck, text: "Secure Data Encryption" },
    { icon: TrendingUp, text: "Real-time Profit Analytics" },
    { icon: Smartphone, text: "Mobile Inventory Control" }
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f8fafc] overflow-hidden">
      <Toaster position="top-center" />

      {/* Left Pane - Branding & Info (Hidden on mobile) */}
      <div className="hidden md:flex md:w-[45%] lg:w-[40%] bg-indigo-600 relative overflow-hidden items-center justify-center p-12 text-white">
        {/* Animated Background Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-500 rounded-full blur-[100px] opacity-40 animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-500 rounded-full blur-[100px] opacity-40 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

        <div className="relative z-10 max-w-sm animate-fade-in-left">
          <div className="inline-flex flex-col mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                <Package className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight">KiranaIQ</h1>
            </div>
            <div className="h-1 w-20 bg-white/30 rounded-full"></div>
          </div>

          <h2 className="text-3xl font-bold mb-6 leading-tight">
            The Smart Way to Manage Your Kirana Store.
          </h2>

          <p className="text-indigo-100 text-lg mb-10 opacity-90">
            Empower your business with AI-driven inventory insights, real-time sales tracking, and simplified management.
          </p>

          <div className="space-y-6">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 group cursor-default">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                  <feature.icon className="w-5 h-5 text-indigo-200" />
                </div>
                <span className="font-medium text-indigo-50">{feature.text}</span>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-12 border-t border-white/10 text-indigo-200 text-sm">
            <p>© 2024 KiranaIQ Enterprise Edition. Trusted by 2,000+ store owners across India.</p>
          </div>
        </div>
      </div>

      {/* Right Pane - Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative">
        {/* Mobile Header Logo */}
        <div className="md:hidden flex flex-col items-center mb-10 animate-fade-in">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-indigo-200 shadow-xl mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">KiranaIQ</h1>
        </div>

        <div className="w-full max-w-[400px] animate-fade-in">
          <div className="mb-10 text-center md:text-left">
            <h3 className="text-3xl font-extrabold text-gray-900 flex items-center justify-center md:justify-start gap-2">
              Sign In <Sparkles className="w-6 h-6 text-indigo-500" />
            </h3>
            <p className="text-gray-500 mt-2 font-medium">Welcome back! Please enter your details.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <AtSign className="w-5 h-5" />
                </div>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="name@company.com"
                  className={`w-full bg-white border-2 rounded-xl py-3.5 pl-14 pr-4 focus:outline-none focus:ring-4 focus:ring-indigo-50 transition-all duration-200 text-gray-900 font-medium ${errors.email ? 'border-red-200 focus:border-red-500' : 'border-gray-100 focus:border-indigo-600'
                    }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs font-semibold mt-1 ml-1 animate-fade-in">
                  *{errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <LockKeyhole className="w-5 h-5" />
                </div>
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`w-full bg-white border-2 rounded-xl py-3.5 pl-14 pr-12 focus:outline-none focus:ring-4 focus:ring-indigo-50 transition-all duration-200 text-gray-900 font-medium ${errors.password ? 'border-red-200 focus:border-red-500' : 'border-gray-100 focus:border-indigo-600'
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs font-semibold mt-1 ml-1 animate-fade-in">
                  *{errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100 transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-70 active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-600 font-medium">
              New store owner?{' '}
              <Link
                href="/auth/register"
                className="text-indigo-600 font-bold hover:underline underline-offset-4"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer info (only on mobile) */}
        <div className="md:hidden mt-auto pt-10 text-center">
          <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">
            Encrypted • Secure • Cloud-Sync
          </p>
        </div>
      </div>
    </div>
  );
}
