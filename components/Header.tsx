'use client';

import { Bell, Menu, Search, LogOut, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    try {
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
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed. Please try again.');
      window.location.href = '/auth/login';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 light-theme shadow-sm">
      <div className="flex items-center justify-between h-full px-4 bg-white">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>

          <div className="hidden md:flex items-center">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-indigo-500" />
              <input
                type="text"
                placeholder="Search..."
                className="input pl-12 w-48 lg:w-80 bg-gray-50 border-gray-200 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-white">
          {/* Notifications */}
          <button className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors group">
            <Bell className="w-5 h-5 text-gray-500 group-hover:text-indigo-600 transition-colors" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse-slow"></span>
          </button>

          {/* Desktop User Menu */}
          <div className="hidden md:block">
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-200"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-md">
                  <span className="text-white font-semibold text-sm">
                    {user?.fullName?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-sm font-bold text-gray-900">{user?.fullName || 'User'}</p>
                  <p className="text-xs text-muted-foreground">
                    {user?.role === 'STORE_OWNER' ? 'Store Owner' : 'Staff'}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-20 py-2 overflow-hidden">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-50 bg-gradient-to-br from-indigo-50 to-blue-50">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-md">
                          <span className="text-white font-bold text-sm">
                            {user?.fullName?.charAt(0) || 'U'}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate">{user?.fullName}</p>
                          <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                        </div>
                      </div>
                      <div className="inline-flex items-center px-2 py-1 rounded-full bg-indigo-100 text-indigo-600 text-xs font-semibold">
                        {user?.role === 'STORE_OWNER' ? '👑 Store Owner' : '👤 Sales Staff'}
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          // Navigate to profile
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <span className="mr-3">👤</span>
                        My Profile
                      </button>
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          // Navigate to settings
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <span className="mr-3">⚙️</span>
                        Settings
                      </button>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-50 pt-2">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-semibold"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
