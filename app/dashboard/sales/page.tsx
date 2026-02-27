'use client';

import { useEffect, useState } from 'react';
import { salesAPI, productsAPI } from '@/lib/api';
import { Product, Sale } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Plus, Minus, Search, ShoppingCart, Barcode, User, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

interface CartItem {
  product: Product;
  quantity: number;
}

export default function QuickSalesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState('');
  const [paymentMode, setPaymentMode] = useState<'CASH' | 'UPI' | 'KHATA'>('CASH');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      setProducts(response.data.filter((p: Product) => p.currentStock > 0));
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = () => {
    if (!selectedProduct) return;

    if (quantity > selectedProduct.currentStock) {
      toast.error(`Only ${selectedProduct.currentStock} units available`);
      return;
    }

    const existingItem = cart.find(item => item.product.id === selectedProduct.id);
    if (existingItem) {
      if (existingItem.quantity + quantity > selectedProduct.currentStock) {
        toast.error('Not enough stock');
        return;
      }
      setCart(cart.map(item => 
        item.product.id === selectedProduct.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { product: selectedProduct, quantity }]);
    }

    setSelectedProduct(null);
    setQuantity(1);
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        if (newQty <= 0) return item;
        if (newQty > item.product.currentStock) {
          toast.error('Not enough stock');
          return item;
        }
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
    setDiscount('');
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((sum, item) => 
      sum + (item.product.sellingPrice * item.quantity), 0
    );
    const discountValue = parseFloat(discount) || 0;
    return subtotal - discountValue;
  };

  const calculateProfit = () => {
    const profit = cart.reduce((sum, item) => 
      sum + ((item.product.sellingPrice - item.product.costPrice) * item.quantity), 0
    );
    const discountValue = parseFloat(discount) || 0;
    return Math.max(0, profit - discountValue);
  };

  const handleCompleteSale = async () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    try {
      for (const item of cart) {
        await salesAPI.create({
          productId: item.product.id,
          quantity: item.quantity,
          discount: 0,
          paymentMode,
        });
      }

      toast.success('Sale completed successfully!');
      clearCart();
      loadProducts();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to complete sale');
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.barcode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <Zap className="w-6 h-6 mr-2 text-primary" />
            Quick Sales
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Fast checkout for your customers</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-muted rounded-lg">
            <Barcode className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search product or scan barcode..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input pl-10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Product Selection */}
        <div className="lg:col-span-2 space-y-4">
          {/* Active Item */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold uppercase text-muted-foreground">Active Item</h3>
              <button onClick={() => { setSelectedProduct(null); setQuantity(1); }} className="text-sm text-primary">
                Clear All
              </button>
            </div>

            {selectedProduct ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-lg">{selectedProduct.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Stock: {selectedProduct.currentStock} • {formatCurrency(selectedProduct.sellingPrice)}/unit
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 rounded-lg bg-muted hover:bg-muted/80"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 rounded-lg bg-muted hover:bg-muted/80"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Select a product from the list below</p>
              </div>
            )}

            {selectedProduct && (
              <button
                onClick={addToCart}
                className="w-full mt-4 btn-primary flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
            )}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filteredProducts.slice(0, 12).map((product) => (
              <button
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className={`card p-3 text-left hover:border-primary transition-all ${
                  selectedProduct?.id === product.id ? 'border-primary border-2' : ''
                }`}
              >
                <p className="font-medium text-sm truncate">{product.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {product.currentStock} units
                </p>
                <p className="text-sm font-semibold mt-2">
                  {formatCurrency(product.sellingPrice)}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Cart Summary */}
        <div className="space-y-4">
          <div className="card p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Cart Summary</h3>
              <span className="badge badge-info">{cart.length} ITEMS</span>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Cart is empty</p>
              </div>
            ) : (
              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.quantity} × {formatCurrency(item.product.sellingPrice)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">
                        {formatCurrency(item.product.sellingPrice * item.quantity)}
                      </p>
                      <div className="flex items-center justify-end space-x-2 mt-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="p-1 hover:bg-muted rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="p-1 hover:bg-muted rounded"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1 hover:bg-danger/10 text-danger rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Discount */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Add Discount (e.g. 10 or 5%)"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="input pr-10"
                />
              </div>
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Est. Profit:</span>
                <span className="text-success font-medium">
                  {formatCurrency(calculateProfit())}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">TOTAL PAYABLE</span>
                <span className="text-2xl font-bold">{formatCurrency(calculateTotal())}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                Payment Method
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPaymentMode('CASH')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    paymentMode === 'CASH'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:bg-muted'
                  }`}
                >
                  <div className="text-xs font-semibold">Cash</div>
                </button>
                <button
                  onClick={() => setPaymentMode('UPI')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    paymentMode === 'UPI'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:bg-muted'
                  }`}
                >
                  <div className="text-xs font-semibold">UPI</div>
                </button>
                <button
                  onClick={() => setPaymentMode('KHATA')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    paymentMode === 'KHATA'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:bg-muted'
                  }`}
                >
                  <div className="text-xs font-semibold">Khata</div>
                </button>
              </div>
            </div>

            {/* Complete Sale Button */}
            <button
              onClick={handleCompleteSale}
              disabled={cart.length === 0}
              className="w-full mt-4 btn-success py-4 text-lg font-semibold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              COMPLETE SALE
              <span className="mx-2">|</span>
              {formatCurrency(calculateTotal())} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
