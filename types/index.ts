export interface User {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  role: 'STORE_OWNER' | 'SALES_STAFF';
  profileImage?: string;
  is2FAEnabled?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category?: string;
  costPrice: number;
  sellingPrice: number;
  currentStock: number;
  leadTimeDays: number;
  expiryDate?: string;
  barcode?: string;
  minStockLevel: number;
  supplierId?: string;
  supplier?: Supplier;
  createdAt: string;
  updatedAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson?: string;
  phone?: string;
  address?: string;
  email?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sale {
  id: string;
  productId: string;
  product?: Product;
  quantity: number;
  totalPrice: number;
  paymentMode: 'CASH' | 'UPI' | 'CREDIT' | 'KHATA';
  date: string;
  userId: string;
  staffId?: string;
  customerName?: string;
  discount: number;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalStockValue: number;
  revenueToday: number;
  profitToday: number;
  lowStockCount: number;
  overstockCount: number;
  salesTrend: { date: string; revenue: number }[];
  topSellingProducts: (Product & { totalQuantitySold: number; totalRevenue: number })[];
}

export interface InventoryAlerts {
  lowStock: { productId: string; productName: string; currentStock: number; minStockLevel: number }[];
  overstock: { productId: string; productName: string; currentStock: number; excessStock: number }[];
  expiringSoon: { productId: string; productName: string; expiryDate: string; daysUntilExpiry: number; urgency: string }[];
  reorderNeeded: { productId: string; productName: string; currentStock: number; reorderPoint: number; suggestedOrderQuantity: number }[];
}
