'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Package, Sparkles, TrendingUp, Shield, Zap, ArrowRight, CheckCircle } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: Sparkles,
      title: 'AI Predictions',
      description: 'Smart demand forecasting using 7-day moving average',
      color: 'from-purple-500 to-pink-500',
      bgLight: 'bg-purple-50',
    },
    {
      icon: Package,
      title: 'Smart Stock',
      description: 'Automated reorder alerts and overstock warnings',
      color: 'from-blue-500 to-indigo-500',
      bgLight: 'bg-blue-50',
    },
    {
      icon: TrendingUp,
      title: 'Profit Analytics',
      description: 'Real-time profit tracking and margin analysis',
      color: 'from-green-500 to-emerald-500',
      bgLight: 'bg-green-50',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Enterprise-grade encryption for your data',
      color: 'from-amber-500 to-orange-500',
      bgLight: 'bg-amber-50',
    },
  ];

  const benefits = [
    'Reduce stockouts by 80%',
    'Increase profit margins by 25%',
    'Save 10+ hours weekly on inventory',
    'Make data-driven decisions',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-bounce-slow"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-bounce-slow" style={{ animationDelay: '2s' }}></div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/20 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                KiranaIQ
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                Sign In
              </Link>
              <Link href="/auth/register" className="btn-primary text-sm">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm mb-6">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-semibold text-foreground">AI-Powered Inventory Intelligence</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Transform Your Kirana Store
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                With Smart Inventory
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              From guess-based management to data-driven decisions. Optimize stock, predict demand,
              and maximize profitability with AI-powered insights.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                href="/auth/register"
                className="btn-primary py-4 px-8 text-base flex items-center gap-2 group shadow-xl shadow-indigo-200"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/auth/login"
                className="btn-secondary py-4 px-8 text-base"
              >
                Already have an account?
              </Link>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/40 shadow-sm"
                >
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card p-6 text-center group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${feature.bgLight} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center animate-fade-in">
              <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
                1000+
              </p>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Stores Powered
              </p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                25%
              </p>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Avg Profit Increase
              </p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                80%
              </p>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Fewer Stockouts
              </p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
                10h+
              </p>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Saved Weekly
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Store?
              </h2>
              <p className="text-lg text-indigo-100 max-w-2xl mx-auto mb-8">
                Join thousands of smart kirana store owners who are already using AI to optimize their inventory and boost profits.
              </p>
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-base hover:bg-indigo-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white/50 backdrop-blur-sm border-t border-white/20 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-foreground">KiranaIQ</span>
              </div>
              <p className="text-sm text-muted-foreground">
                © 2024 KiranaIQ. Smart Inventory & Profit Optimization System.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
