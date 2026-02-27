'use client';

import { useEffect, useState } from 'react';
import { analyticsAPI, inventoryAPI } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { DashboardStats, InventoryAlerts } from '@/types';
import {
  Package,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
        <div className="spinner"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats?.totalProducts || 0,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Stock Value',
      value: formatCurrency(stats?.totalStockValue || 0),
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: "Today's Revenue",
      value: formatCurrency(stats?.revenueToday || 0),
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      title: "Today's Profit",
      value: formatCurrency(stats?.profitToday || 0),
      icon: ShoppingCart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  const alertCards = [
    {
      title: 'Low Stock',
      value: alerts?.lowStock.length || 0,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      type: 'danger',
    },
    {
      title: 'Overstock',
      value: alerts?.overstock.length || 0,
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      type: 'warning',
    },
    {
      title: 'Expiring Soon',
      value: alerts?.expiringSoon.length || 0,
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      type: 'warning',
    },
    {
      title: 'Reorder Needed',
      value: alerts?.reorderNeeded.length || 0,
      icon: AlertTriangle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      type: 'info',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your inventory and sales</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <div key={stat.title} className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alerts Grid */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Inventory Alerts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {alertCards.map((alert) => (
            <div key={alert.title} className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{alert.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{alert.value}</p>
                </div>
                <div className={`${alert.bgColor} p-3 rounded-lg`}>
                  <alert.icon className={`w-6 h-6 ${alert.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sales Trend Chart */}
      {stats?.salesTrend && stats.salesTrend.length > 0 && (
        <div className="card p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">7-Day Sales Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.salesTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '8px' }}
                />
                <Bar dataKey="revenue" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Top Selling Products */}
      {stats?.topSellingProducts && stats.topSellingProducts.length > 0 && (
        <div className="card p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Stock</th>
                  <th>Sold</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {stats.topSellingProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${
                        product.currentStock <= 10 ? 'badge-danger' : 'badge-success'
                      }`}>
                        {product.currentStock}
                      </span>
                    </td>
                    <td>{product.totalQuantitySold}</td>
                    <td className="font-medium">{formatCurrency(product.totalRevenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Low Stock Alerts */}
      {alerts?.lowStock && alerts.lowStock.length > 0 && (
        <div className="card p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Low Stock Products</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Current Stock</th>
                  <th>Min Level</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {alerts.lowStock.slice(0, 5).map((item) => (
                  <tr key={item.productId}>
                    <td>
                      <p className="font-medium text-gray-900">{item.productName}</p>
                    </td>
                    <td>
                      <span className="badge badge-danger">{item.currentStock}</span>
                    </td>
                    <td>{item.minStockLevel}</td>
                    <td>
                      <span className="badge badge-danger">Low Stock</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
