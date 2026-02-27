'use client';

import { useEffect, useState } from 'react';
import { analyticsAPI, inventoryAPI } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { DashboardStats, InventoryAlerts } from '@/types';
import {
  Package,
  TrendingUp,
  AlertTriangle,
  ShoppingCart,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
  AlertCircle,
  Zap,
  Clock,
  TrendingDown,
  Package2,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [alerts, setAlerts] = useState<InventoryAlerts | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [statsRes, alertsRes] = await Promise.all([
        analyticsAPI.getDashboard(),
        inventoryAPI.getAlerts(),
      ]);
      setStats(statsRes.data);
      setAlerts(alertsRes.data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-muted-foreground text-sm">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Revenue Today',
      value: formatCurrency(stats?.revenueToday || 0),
      icon: DollarSign,
      trend: '+8.2%',
      trendUp: true,
      alert: null,
      gradient: 'from-emerald-500 to-teal-500',
      bgLight: 'bg-emerald-50',
      textColor: 'text-emerald-600',
    },
    {
      title: 'Gross Profit',
      value: formatCurrency(stats?.profitToday || 0),
      icon: TrendingUp,
      trend: '+12%',
      trendUp: true,
      alert: null,
      gradient: 'from-blue-500 to-indigo-500',
      bgLight: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Low Stock',
      value: `${alerts?.lowStock.length || 0}`,
      subtitle: 'items need attention',
      icon: AlertCircle,
      trend: 'Action required',
      trendUp: null,
      alert: 'ALERT',
      gradient: 'from-red-500 to-rose-500',
      bgLight: 'bg-red-50',
      textColor: 'text-red-600',
    },
    {
      title: 'Overstock',
      value: `${alerts?.overstock.length || 0}`,
      subtitle: 'excess inventory',
      icon: Package2,
      trend: 'Reduce orders',
      trendUp: null,
      alert: 'WARN',
      gradient: 'from-amber-500 to-orange-500',
      bgLight: 'bg-amber-50',
      textColor: 'text-amber-600',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Store Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back! Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-ghost text-sm flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="hidden sm:inline">Last updated: Just now</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <div key={stat.title} className="stat-card group">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bgLight} transition-transform group-hover:scale-110`}>
                <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
              </div>
              {stat.alert && (
                <span className={`badge ${stat.alert === 'ALERT' ? 'badge-danger' : 'badge-warning'} animate-pulse-slow`}>
                  <AlertCircle className="w-3 h-3" />
                  {stat.alert}
                </span>
              )}
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">
                {stat.title}
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {stat.value}
              </p>
              {stat.subtitle && (
                <p className="text-xs text-muted-foreground mb-2">{stat.subtitle}</p>
              )}
              {stat.trend && (
                <div className={`flex items-center text-xs font-medium ${
                  stat.trendUp === true ? 'text-success' :
                  stat.trendUp === false ? 'text-danger' : 'text-muted-foreground'
                }`}>
                  {stat.trendUp === true && <ArrowUpRight className="w-3 h-3 mr-1" />}
                  {stat.trendUp === false && <ArrowDownRight className="w-3 h-3 mr-1" />}
                  {stat.trend}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 7-Day Sales Trend */}
        {stats?.salesTrend && stats.salesTrend.length > 0 && (
          <div className="card p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  7-Day Sales Trend
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.salesTrend[0]?.date} - {stats.salesTrend[6]?.date}
                </p>
              </div>
              <button className="text-sm text-primary font-medium hover:underline transition-all">
                Details →
              </button>
            </div>

            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.salesTrend}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    stroke="#e2e8f0"
                    tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    stroke="#e2e8f0"
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{
                      borderRadius: '0.75rem',
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Top Selling Products */}
        {stats?.topSellingProducts && stats.topSellingProducts.length > 0 && (
          <div className="card p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  Top Selling Products
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Best performers this week
                </p>
              </div>
              <button className="text-sm text-primary font-medium hover:underline transition-all">
                View All →
              </button>
            </div>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {stats.topSellingProducts.map((product, index) => (
                <div key={product.id} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0 ? 'bg-amber-100 text-amber-600' :
                        index === 1 ? 'bg-slate-100 text-slate-600' :
                        index === 2 ? 'bg-orange-100 text-orange-600' :
                        'bg-blue-50 text-blue-600'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {product.name}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-foreground">
                      {product.totalQuantitySold} units
                    </span>
                  </div>
                  <div className="progress-bar ml-9">
                    <div
                      className={`progress-bar-fill ${
                        index === 0 ? 'success' : 
                        index === 1 ? 'primary' : 
                        index === 2 ? 'warning' : 'primary'
                      }`}
                      style={{
                        width: `${(product.totalQuantitySold / (stats.topSellingProducts[0]?.totalQuantitySold || 1)) * 100}%`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Smart Insight */}
      <div className="smart-insight animate-fade-in">
        <div className="flex items-start gap-3 relative z-10">
          <div className="p-2 rounded-xl bg-indigo-100 flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-indigo-900 mb-1 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              AI Smart Insight
            </h3>
            <p className="text-sm text-indigo-700 leading-relaxed">
              Based on the last 7 days of sales data, we predict a{' '}
              <span className="font-bold text-indigo-900">20% spike in Beverages demand</span> this
              weekend due to upcoming local events. Consider restocking by tomorrow to avoid stockouts.
            </p>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alerts */}
        {alerts?.lowStock && alerts.lowStock.length > 0 && (
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  Low Stock Products
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Items below minimum threshold
                </p>
              </div>
              <span className="badge badge-danger">{alerts.lowStock.length} items</span>
            </div>
            <div className="space-y-3 max-h-72 overflow-y-auto">
              {alerts.lowStock.slice(0, 5).map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between p-3 rounded-xl bg-red-50 border border-red-100 hover:border-red-200 transition-all"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-red-900">{item.productName}</p>
                    <p className="text-xs text-red-600 mt-1">
                      Min level: {item.minStockLevel} units
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-red-600">{item.currentStock} units</p>
                    <p className="text-xs text-red-500 mt-1">In stock</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Overstock Alerts */}
        {alerts?.overstock && alerts.overstock.length > 0 && (
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Overstock Products
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Excess inventory items
                </p>
              </div>
              <span className="badge badge-warning">{alerts.overstock.length} items</span>
            </div>
            <div className="space-y-3 max-h-72 overflow-y-auto">
              {alerts.overstock.slice(0, 5).map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-100 hover:border-amber-200 transition-all"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-amber-900">{item.productName}</p>
                    <p className="text-xs text-amber-600 mt-1">
                      Excess: {item.excessStock} units
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-amber-600">{item.currentStock} units</p>
                    <p className="text-xs text-amber-500 mt-1">In stock</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="card p-5">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-indigo-500" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 hover:border-blue-200 hover:shadow-md transition-all group text-center">
            <Package className="w-6 h-6 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-blue-700">Add Product</span>
          </button>
          <button className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 hover:border-green-200 hover:shadow-md transition-all group text-center">
            <ShoppingCart className="w-6 h-6 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-green-700">Record Sale</span>
          </button>
          <button className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 hover:border-amber-200 hover:shadow-md transition-all group text-center">
            <TrendingUp className="w-6 h-6 text-amber-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-amber-700">View Reports</span>
          </button>
          <button className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 hover:border-purple-200 hover:shadow-md transition-all group text-center">
            <AlertCircle className="w-6 h-6 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-purple-700">Alerts</span>
          </button>
        </div>
      </div>
    </div>
  );
}
