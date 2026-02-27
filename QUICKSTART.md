# 🚀 Quick Start Guide - KiranaIQ

## Prerequisites
- Node.js 18 or higher
- npm or yarn

## Installation (First Time Setup)

### 1. Install Dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies (go back to root first)
cd ..
npm install --legacy-peer-deps
```

### 2. Setup PostgreSQL Database

**Option A: Using Docker (Easiest)**
```bash
docker-compose up -d
```

**Option B: Using Local PostgreSQL**
```bash
# Create database
psql -U postgres -h localhost -c "CREATE DATABASE kirana_iq;"
```

### 3. Run Database Migrations
```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Environment Variables
The `.env` files are already configured for development. You can modify them if needed:
- `backend/.env` - Backend configuration (PostgreSQL connection)
- `.env.local` - Frontend configuration

## Running the Application

### Option 1: Run Both Together (Recommended)
```bash
# From project root
npm run dev
```
This starts both frontend (port 3000) and backend (port 3001).

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **API Health Check:** http://localhost:3001/api/v1/health

## Getting Started with the App

### 1. Create an Account
1. Open http://localhost:3000
2. Click "Create Account" or go to http://localhost:3000/auth/register
3. Fill in the registration form:
   - Full Name
   - Email
   - Mobile Number
   - Store Name
   - Password (min 8 characters)

### 2. Explore the Dashboard
After registration, you'll be redirected to the dashboard showing:
- Total products and stock value
- Today's revenue and profit
- Inventory alerts
- 7-day sales trend

### 3. Add Products
1. Go to Products page
2. Click "Add Product"
3. Fill in product details:
   - Name, Category
   - Cost Price, Selling Price
   - Current Stock
   - Minimum Stock Level
   - Expiry Date (optional)

### 4. Record Sales
1. Go to Sales page
2. Click "New Sale"
3. Select product, quantity, and payment mode
4. Click "Record Sale"

### 5. Add Suppliers
1. Go to Suppliers page
2. Click "Add Supplier"
3. Enter supplier details

### 6. View Analytics
1. Go to Analytics page
2. Select date range
3. View profit margins, high-margin products, and sales trends

## Default Test Credentials

After registering, use your credentials to login:
- **Email:** The email you registered with
- **Password:** The password you set

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/refresh` - Refresh token

### Products
- `GET /api/v1/products` - Get all products
- `POST /api/v1/products` - Create product
- `PUT /api/v1/products/:id` - Update product
- `DELETE /api/v1/products/:id` - Delete product

### Sales
- `GET /api/v1/sales` - Get all sales
- `POST /api/v1/sales` - Create sale
- `GET /api/v1/sales/today` - Get today's sales

### Analytics
- `GET /api/v1/analytics/dashboard` - Dashboard stats
- `GET /api/v1/analytics/profit` - Profit analytics

## Building for Production

### Backend
```bash
cd backend
npm run build
npm run start:prod
```

### Frontend
```bash
npm run build
npm run start
```

## Troubleshooting

### Database Issues
```bash
# Check PostgreSQL connection
psql -U postgres -h localhost -d kirana_iq -c "\dt"

# Reset database (Docker)
docker-compose down -v
docker-compose up -d

# Re-run migrations
cd backend
npx prisma migrate reset
npx prisma generate
```

### Module Not Found
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
```bash
# Kill processes
pkill -f "ts-node.*main.ts"
pkill -f "next.*dev"
```

## Features Checklist

✅ User Registration & Login
✅ JWT Authentication
✅ Dashboard with Stats
✅ Product Management (CRUD)
✅ Sales Recording
✅ Supplier Management
✅ Inventory Alerts
✅ Profit Analytics
✅ Responsive Design
✅ Role-Based Access Control

## Next Steps

1. **Customize Settings**: Update store information in Profile
2. **Import Products**: Add your inventory
3. **Start Tracking**: Record daily sales
4. **Monitor Analytics**: Check profit margins regularly
5. **Set Alerts**: Configure minimum stock levels

## Support

For issues or questions:
1. Check the main README.md
2. Review API documentation in README.md
3. Check backend logs in `backend/` folder
4. Check frontend console in browser DevTools

---

**Happy Managing with KiranaIQ! 🎉**
