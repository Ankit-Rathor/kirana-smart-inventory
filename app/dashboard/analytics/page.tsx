'use client';

import { useEffect, useState } from 'react';
import { analyticsAPI } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { TrendingUp, DollarSign, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [profitData, setProfitData] = useState<any>(null);
  const [salesReport, setSalesReport] = useState<any>(null);

  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    loadAnalytics();
  }, [dateRange]);

  const loadAnalytics = async () => {
    try {
      const [profitRes, salesRes] = await Promise.all([
        analyticsAPI.getProfit(dateRange.startDate, dateRange.endDate),
        analyticsAPI.getSalesReport(dateRange.startDate, dateRange.endDate),
      ]);
      setProfitData(profitRes.data);
      setSalesReport(salesRes.data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const paymentModeColors = ['#4F46E5', '#22C55E', '#F59E0B', '#EF4444'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Profit and sales insights</p>
      </div>

      {/* Date Range */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div className="flex-1">
            <label className="label">Start Date</label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
              className="input"
            />
          </div>
          <div className="flex-1">
            <label className="label">End Date</label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
              className="input"
            />
          </div>
        </div>
      </div>

      {/* Profit Summary */}
      {profitData && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {formatCurrency(profitData.totalRevenue)}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Cost</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {formatCurrency(profitData.totalCost)}
                  </p>
                </div>
                <div className="bg-red-100 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-red-600 rotate-180" />
                </div>
              </div>
            </div>

            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Gross Profit</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">
                    {formatCurrency(profitData.grossProfit)}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Profit Margin</p>
                  <p className="text-2xl font-bold text-indigo-600 mt-1">
                    {profitData.profitMargin}%
                  </p>
                </div>
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </div>
          </div>

          {/* High Margin Products */}
          {profitData.highMarginProducts && profitData.highMarginProducts.length > 0 && (
            <div className="card p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">High Margin Products</h2>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Units Sold</th>
                      <th>Revenue</th>
                      <th>Profit</th>
                      <th>Margin %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profitData.highMarginProducts.map((product: any) => (
                      <tr key={product.productId}>
                        <td>
                          <p className="font-medium text-gray-900">{product.productName}</p>
                        </td>
                        <td>{product.unitsSold}</td>
                        <td>{formatCurrency(product.revenue)}</td>
                        <td className="text-green-600">{formatCurrency(product.profit)}</td>
                        <td>
                          <span className="badge badge-success">{product.marginPercent}%</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Fast Moving Products */}
          {profitData.fastMovingProducts && profitData.fastMovingProducts.length > 0 && (
            <div className="card p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Fast Moving Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profitData.fastMovingProducts.map((product: any) => (
                  <div key={product.productId} className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900">{product.productName}</p>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="text-gray-600">Sold: {product.unitsSold}</span>
                      <span className="text-green-600 font-medium">
                        {formatCurrency(product.profit)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Sales Report */}
      {salesReport && (
        <>
          {/* Payment Mode Distribution */}
          {Object.keys(salesReport.byPaymentMode).length > 0 && (
            <div className="card p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Mode Distribution</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={Object.entries(salesReport.byPaymentMode).map(([key, value]) => ({
                        name: key,
                        value,
                      }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {Object.entries(salesReport.byPaymentMode).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={paymentModeColors[index % paymentModeColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Daily Sales Trend */}
          {salesReport.dailySales && salesReport.dailySales.length > 0 && (
            <div className="card p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Daily Sales Trend</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesReport.dailySales}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    <Bar dataKey="revenue" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
