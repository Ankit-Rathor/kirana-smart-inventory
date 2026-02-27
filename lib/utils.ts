export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

export const formatShortDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};

export const calculateDaysUntilExpiry = (expiryDate: string): number => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getStockStatus = (currentStock: number, minStockLevel: number): string => {
  if (currentStock === 0) return 'out-of-stock';
  if (currentStock <= minStockLevel) return 'low';
  if (currentStock > minStockLevel * 3) return 'overstock';
  return 'in-stock';
};

export const getPaymentModeLabel = (mode: string): string => {
  const labels: { [key: string]: string } = {
    CASH: 'Cash',
    UPI: 'UPI',
    CREDIT: 'Credit',
    KHATA: 'Khata',
  };
  return labels[mode] || mode;
};
