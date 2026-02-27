'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  X,
  Bell,
  TrendingUp,
  AlertTriangle,
  Zap,
  ChevronRight,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Inventory', href: '/dashboard/products', icon: Package },
  { name: 'Sales History', href: '/dashboard/sales', icon: ShoppingCart },
  { name: 'Suppliers', href: '/dashboard/suppliers', icon: Users },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
];

export default function Sidebar({
  isOpen,
  onClose,
  currentPath,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}) {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout();
    toast.success(
      <div className="flex items-center gap-2">
        <span>👋</span>
        <div>
          <p className="font-semibold">Logged out successfully!</p>
        </div>
      </div>,
      {
        duration: 2000,
        style: {
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: '#fff',
          borderRadius: '12px',
          padding: '12px 16px',
          boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
        },
      }
    );
    setTimeout(() => {
      window.location.href = '/auth/login';
    }, 500);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-shrink-0 w-72 bg-white border-r border-gray-200 flex-col light-theme shadow-lg">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-blue-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                KiranaIQ
              </h1>
            </div>
            <button className="p-2 hover:bg-white/60 rounded-lg relative transition-colors group">
              <Bell className="w-5 h-5 text-gray-500 group-hover:text-indigo-600 transition-colors" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse-slow"></span>
            </button>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-5 border-b border-gray-100 bg-white">
          <div className="flex items-center space-x-3 mb-4 p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">
                {user?.fullName?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 truncate">{user?.fullName}</p>
              <p className="text-xs text-muted-foreground">
                {user?.role === 'STORE_OWNER' ? (
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-500" />
                    Store Owner
                  </span>
                ) : (
                  'Sales Staff'
                )}
              </p>
            </div>
          </div>

          {/* Mini Stats */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-50 to-rose-50 border border-red-100 text-center hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center gap-1 mb-1">
                <AlertTriangle className="w-3 h-3 text-red-500" />
                <p className="text-xs text-red-600 font-semibold">Alerts</p>
              </div>
              <p className="text-xl font-bold text-red-600">12</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 text-center hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <p className="text-xs text-green-600 font-semibold">Growth</p>
              </div>
              <p className="text-xl font-bold text-green-600">+8%</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto bg-white">
          <p className="text-xs font-bold uppercase text-muted-foreground mb-3 px-3 tracking-wide">
            Main Menu
          </p>
          {navigation.map((item) => {
            const isActive =
              currentPath === item.href ||
              (item.href !== '/dashboard' && currentPath.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`group flex items-center px-3 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-lg shadow-indigo-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`w-5 h-5 mr-3 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'
                  }`}
                />
                {item.name}
                {item.name === 'Inventory' && (
                  <span className="ml-auto badge badge-danger text-xs animate-pulse-slow">
                    LOW
                  </span>
                )}
                {isActive && (
                  <ChevronRight className="w-4 h-4 ml-auto text-white/80" />
                )}
              </Link>
            );
          })}

          <p className="text-xs font-bold uppercase text-muted-foreground mt-6 mb-3 px-3 tracking-wide">
            Operations
          </p>

          <Link
            href="/dashboard/suppliers"
            onClick={onClose}
            className={`group flex items-center px-3 py-3 rounded-xl text-sm font-semibold transition-all text-gray-600 hover:bg-gray-50 hover:text-gray-900`}
          >
            <Users className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-600 transition-colors" />
            Suppliers
          </Link>

          <Link
            href="/dashboard/analytics"
            onClick={onClose}
            className={`group flex items-center px-3 py-3 rounded-xl text-sm font-semibold transition-all text-gray-600 hover:bg-gray-50 hover:text-gray-900`}
          >
            <BarChart3 className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-600 transition-colors" />
            Analytics
          </Link>

          <Link
            href="/dashboard/profile"
            onClick={onClose}
            className={`group flex items-center px-3 py-3 rounded-xl text-sm font-semibold transition-all text-gray-600 hover:bg-gray-50 hover:text-gray-900`}
          >
            <Settings className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-600 transition-colors" />
            Settings
          </Link>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-slate-50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-red-50 to-rose-50 text-red-600 hover:from-red-100 hover:to-rose-100 transition-all border border-red-100 hover:shadow-md"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
          <div className="mt-4 text-center">
            <p className="text-xs font-bold text-gray-400 tracking-wide">KIRANAIQ</p>
            <p className="text-xs text-gray-300 mt-0.5">Enterprise Edition v1.0.4</p>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white transform transition-transform duration-300 lg:hidden light-theme shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-blue-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                KiranaIQ
              </h1>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/60 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* User Profile */}
          <div className="p-5 border-b border-gray-100 bg-white">
            <div className="flex items-center space-x-3 mb-4 p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">
                  {user?.fullName?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 truncate">{user?.fullName}</p>
                <p className="text-xs text-muted-foreground">
                  {user?.role === 'STORE_OWNER' ? (
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-500" />
                      Store Owner
                    </span>
                  ) : (
                    'Sales Staff'
                  )}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-xl bg-gradient-to-br from-red-50 to-rose-50 border border-red-100 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <AlertTriangle className="w-3 h-3 text-red-500" />
                  <p className="text-xs text-red-600 font-semibold">Alerts</p>
                </div>
                <p className="text-lg font-bold text-red-600">12</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <p className="text-xs text-green-600 font-semibold">Growth</p>
                </div>
                <p className="text-lg font-bold text-green-600">+8%</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto bg-white">
            <p className="text-xs font-bold uppercase text-muted-foreground mb-3 px-3 tracking-wide">
              Main Menu
            </p>
            {navigation.map((item) => {
              const isActive =
                currentPath === item.href ||
                (item.href !== '/dashboard' && currentPath.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`group flex items-center px-3 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-lg shadow-indigo-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 mr-3 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                  />
                  {item.name}
                  {isActive && (
                    <ChevronRight className="w-4 h-4 ml-auto text-white/80" />
                  )}
                </Link>
              );
            })}

            <p className="text-xs font-bold uppercase text-muted-foreground mt-6 mb-3 px-3 tracking-wide">
              Operations
            </p>

            <Link
              href="/dashboard/suppliers"
              onClick={onClose}
              className="group flex items-center px-3 py-3 rounded-xl text-sm font-semibold transition-all text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Users className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-600" />
              Suppliers
            </Link>

            <Link
              href="/dashboard/analytics"
              onClick={onClose}
              className="group flex items-center px-3 py-3 rounded-xl text-sm font-semibold transition-all text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <BarChart3 className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-600" />
              Analytics
            </Link>

            <Link
              href="/dashboard/profile"
              onClick={onClose}
              className="group flex items-center px-3 py-3 rounded-xl text-sm font-semibold transition-all text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Settings className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-600" />
              Settings
            </Link>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-slate-50">
            <button
              onClick={() => {
                handleLogout();
                onClose();
              }}
              className="w-full flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-red-50 to-rose-50 text-red-600 hover:from-red-100 hover:to-rose-100 transition-all border border-red-100"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
            <div className="mt-4 text-center">
              <p className="text-xs font-bold text-gray-400 tracking-wide">KIRANAIQ</p>
              <p className="text-xs text-gray-300 mt-0.5">Enterprise Edition v1.0.4</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
