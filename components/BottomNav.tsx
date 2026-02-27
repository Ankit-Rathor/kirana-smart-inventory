'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, ShoppingCart, BarChart3, Settings, Plus } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Stock', href: '/dashboard/products', icon: Package },
    { name: 'Sales', href: '/dashboard/sales', icon: ShoppingCart },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Setup', href: '/dashboard/profile', icon: Settings },
  ];

  return (
    <>
      {/* Bottom Navigation - Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 flex justify-around p-2 z-50 lg:hidden light-theme shadow-lg">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-bold transition-all ${isActive
                  ? 'text-white bg-gradient-to-r from-indigo-500 to-blue-600 shadow-md shadow-indigo-200 scale-105'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }`}
            >
              <item.icon className={`w-5 h-5 mb-1 ${isActive ? 'animate-bounce-slow' : ''}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* FAB - Quick Add */}
      <button className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white flex items-center justify-center shadow-xl shadow-indigo-300 hover:shadow-2xl hover:shadow-indigo-400 transition-all hover:scale-110 active:scale-95 z-40 lg:hidden group">
        <Plus className="w-7 h-7 group-hover:rotate-90 transition-transform duration-300" />
      </button>

    </>
  );
}
