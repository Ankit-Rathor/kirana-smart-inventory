'use client';

import { useEffect, useState } from 'react';
import { salesAPI, productsAPI } from '@/lib/api';
import { Sale, Product } from '@/types';
import { formatCurrency, formatDate, getPaymentModeLabel } from '@/lib/utils';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    productId: '',
    quantity: '1',
    discount: '0',
    paymentMode: 'CASH',
    customerName: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [salesRes, productsRes] = await Promise.all([
        salesAPI.getAll(),
        productsAPI.getAll(),
      ]);
      setSales(salesRes.data);
      setProducts(productsRes.data.filter((p: Product) => p.currentStock > 0));
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const product = products.find((p) => p.id === formData.productId);
    if (!product) {
      toast.error('Please select a product');
      return;
    }

    const quantity = parseInt(formData.quantity);
    if (quantity > product.currentStock) {
      toast.error(`Insufficient stock. Available: ${product.currentStock}`);
      return;
    }

    const data = {
      productId: formData.productId,
      quantity,
      discount: parseFloat(formData.discount),
      paymentMode: formData.paymentMode,
      customerName: formData.customerName || undefined,
    };

    try {
      await salesAPI.create(data);
      toast.success('Sale recorded successfully');
      setShowModal(false);
      resetForm();
      loadData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to record sale');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this sale? Stock will be returned.')) return;

    try {
      await salesAPI.delete(id);
      toast.success('Sale deleted successfully');
      loadData();
    } catch (error) {
      toast.error('Failed to delete sale');
    }
  };

  const resetForm = () => {
    setFormData({
      productId: '',
      quantity: '1',
      discount: '0',
      paymentMode: 'CASH',
      customerName: '',
    });
  };

  const filteredSales = sales.filter((sale) =>
    sale.product?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalPrice, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales</h1>
          <p className="text-gray-600 mt-1">Record and manage sales</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center justify-center">
          <Plus className="w-5 h-5 mr-2" />
          New Sale
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-4">
          <p className="text-sm text-gray-600">Total Sales</p>
          <p className="text-2xl font-bold text-gray-900">{sales.length}</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-2xl font-bold text-indigo-600">{formatCurrency(totalRevenue)}</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-gray-600">Products in Stock</p>
          <p className="text-2xl font-bold text-green-600">{products.length}</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search sales..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input pl-10"
        />
      </div>

      {/* Sales Table */}
      <div className="card overflow-hidden">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Customer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((sale) => (
                <tr key={sale.id}>
                  <td>{formatDate(sale.date)}</td>
                  <td>
                    <p className="font-medium text-gray-900">{sale.product?.name}</p>
                  </td>
                  <td>{sale.quantity}</td>
                  <td className="font-medium">{formatCurrency(sale.totalPrice)}</td>
                  <td>
                    <span className="badge badge-info">{getPaymentModeLabel(sale.paymentMode)}</span>
                  </td>
                  <td>{sale.customerName || '-'}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(sale.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="card w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">New Sale</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="label">Product *</label>
                <select
                  value={formData.productId}
                  onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                  className="input"
                  required
                >
                  <option value="">Select product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} (Stock: {product.currentStock}) - {formatCurrency(product.sellingPrice)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Quantity *</label>
                <input
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="label">Discount (₹)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                  className="input"
                />
              </div>

              <div>
                <label className="label">Payment Mode *</label>
                <select
                  value={formData.paymentMode}
                  onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                  className="input"
                  required
                >
                  <option value="CASH">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="CREDIT">Credit</option>
                  <option value="KHATA">Khata</option>
                </select>
              </div>

              <div>
                <label className="label">Customer Name</label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="input"
                  placeholder="Optional"
                />
              </div>

              {formData.productId && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Summary</p>
                  <div className="flex justify-between mt-2">
                    <span>Subtotal:</span>
                    <span>
                      {formatCurrency(
                        (products.find((p) => p.id === formData.productId)?.sellingPrice || 0) *
                          parseInt(formData.quantity)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Discount:</span>
                    <span>-{formatCurrency(parseFloat(formData.discount) || 0)}</span>
                  </div>
                  <div className="flex justify-between mt-2 pt-2 border-t font-semibold">
                    <span>Total:</span>
                    <span>
                      {formatCurrency(
                        (products.find((p) => p.id === formData.productId)?.sellingPrice || 0) *
                          parseInt(formData.quantity) -
                          parseFloat(formData.discount)
                      )}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Record Sale
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
