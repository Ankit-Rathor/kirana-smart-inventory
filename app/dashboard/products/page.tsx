'use client';

import { useEffect, useState } from 'react';
import { productsAPI } from '@/lib/api';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Plus, Search, Edit, Trash2, AlertCircle, Barcode, Calendar, TrendingUp, Package } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    costPrice: '',
    sellingPrice: '',
    currentStock: '',
    leadTimeDays: '7',
    minStockLevel: '10',
    barcode: '',
    expiryDate: '',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      setProducts(response.data);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      ...formData,
      costPrice: parseFloat(formData.costPrice),
      sellingPrice: parseFloat(formData.sellingPrice),
      currentStock: parseInt(formData.currentStock) || 0,
      leadTimeDays: parseInt(formData.leadTimeDays),
      minStockLevel: parseInt(formData.minStockLevel),
      expiryDate: formData.expiryDate || undefined,
    };

    try {
      if (selectedProduct) {
        await productsAPI.update(selectedProduct.id, data);
        toast.success('Product updated successfully');
      } else {
        await productsAPI.create(data);
        toast.success('Product created successfully');
      }
      setShowModal(false);
      resetForm();
      loadProducts();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      category: product.category || '',
      costPrice: product.costPrice.toString(),
      sellingPrice: product.sellingPrice.toString(),
      currentStock: product.currentStock.toString(),
      leadTimeDays: product.leadTimeDays.toString(),
      minStockLevel: product.minStockLevel.toString(),
      barcode: product.barcode || '',
      expiryDate: product.expiryDate ? product.expiryDate.split('T')[0] : '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await productsAPI.delete(id);
      toast.success('Product deleted successfully');
      loadProducts();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      costPrice: '',
      sellingPrice: '',
      currentStock: '',
      leadTimeDays: '7',
      minStockLevel: '10',
      barcode: '',
      expiryDate: '',
    });
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.barcode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (product: Product) => {
    const { currentStock, minStockLevel } = product;
    if (currentStock === 0) return { label: 'Out of Stock', color: 'danger', percent: 0 };
    if (currentStock <= minStockLevel) {
      return { label: 'Low Stock', color: 'danger', percent: (currentStock / minStockLevel) * 100 };
    }
    if (currentStock > minStockLevel * 2) {
      return { label: 'In Stock', color: 'success', percent: Math.min(100, (currentStock / (minStockLevel * 3)) * 100) };
    }
    return { label: 'In Stock', color: 'primary', percent: 50 };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Inventory</h1>
          <p className="text-sm text-muted-foreground mt-1">{products.length} products</p>
        </div>
        <button 
          onClick={() => setShowModal(true)} 
          className="btn-primary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Add Product</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input pl-10"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded">
          <Barcode className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProducts.map((product) => {
          const stockStatus = getStockStatus(product);
          const isLowStock = product.currentStock <= product.minStockLevel;
          const isExpiring = product.expiryDate && new Date(product.expiryDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
          
          return (
            <div key={product.id} className="product-card">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  {product.category && (
                    <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">
                      {product.category}
                    </p>
                  )}
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{formatCurrency(product.sellingPrice)}</p>
                  {isLowStock && (
                    <span className="badge badge-danger text-xs mt-1">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Low Stock
                    </span>
                  )}
                </div>
              </div>

              {/* Stock Level */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Stock Level</span>
                  <span className={`font-semibold ${isLowStock ? 'text-danger' : 'text-success'}`}>
                    {product.currentStock} / {product.minStockLevel} units
                  </span>
                </div>
                <div className="progress-bar">
                  <div 
                    className={`progress-bar-fill ${stockStatus.color}`}
                    style={{ width: `${stockStatus.percent}%` }}
                  />
                </div>
              </div>

              {/* Additional Info */}
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                {isExpiring && (
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span className="text-warning font-medium">
                      Expiring: {Math.ceil((new Date(product.expiryDate!).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} Days
                    </span>
                  </div>
                )}
                {product.barcode && (
                  <div className="flex items-center">
                    <Barcode className="w-3 h-3 mr-1" />
                    <span>{product.barcode}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-sm text-primary font-medium hover:underline flex items-center"
                >
                  Manage →
                </button>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-primary"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-danger"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No products found</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold">
                {selectedProduct ? 'Edit Product' : 'Add Product'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Product Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label className="label">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input"
                  />
                </div>

                <div>
                  <label className="label">Cost Price (₹) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.costPrice}
                    onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label className="label">Selling Price (₹) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.sellingPrice}
                    onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })}
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label className="label">Current Stock</label>
                  <input
                    type="number"
                    value={formData.currentStock}
                    onChange={(e) => setFormData({ ...formData, currentStock: e.target.value })}
                    className="input"
                  />
                </div>

                <div>
                  <label className="label">Min Stock Level</label>
                  <input
                    type="number"
                    value={formData.minStockLevel}
                    onChange={(e) => setFormData({ ...formData, minStockLevel: e.target.value })}
                    className="input"
                  />
                </div>

                <div>
                  <label className="label">Barcode</label>
                  <input
                    type="text"
                    value={formData.barcode}
                    onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                    className="input"
                  />
                </div>

                <div>
                  <label className="label">Expiry Date</label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="input"
                  />
                </div>
              </div>

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
                  {selectedProduct ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
