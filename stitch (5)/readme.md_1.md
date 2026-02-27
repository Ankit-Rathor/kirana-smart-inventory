# 🚀 KiranaIQ – Smart Inventory & Profit Optimization System

A full-stack inventory intelligence platform built with **Next.js (Frontend)** and **NestJS (Backend)** to help small retailers optimize stock, predict demand, and improve profitability using data-driven forecasting and safety stock logic.

---

## 📌 Product Vision

KiranaIQ transforms traditional kirana stores from guess-based inventory management to a structured, data-driven decision-support system.

It enables:
- ✅ Intelligent demand prediction
- ✅ Smart reorder alerts
- ✅ Overstock detection
- ✅ Profit visibility
- ✅ Secure user management
- ✅ Fully responsive UI across all devices

---

## 🏗 Tech Stack

### 🔹 Frontend
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts
- **HTTP Client:** Axios
- **Notifications:** React Hot Toast

### 🔹 Backend
- **Framework:** NestJS
- **Language:** TypeScript
- **Database ORM:** Prisma
- **Database:** PostgreSQL (Production ready)
- **Authentication:** JWT + bcrypt
- **2FA:** Speakeasy (TOTP)
- **Validation:** class-validator

---

## 🔐 Authentication & User Management

### ✅ Registration
- Full Name
- Email (Unique)
- Mobile Number
- Store Name
- Password (Min 8 characters)
- Confirm Password

### ✅ Login
- Email + Password
- JWT-based authentication
- Protected routes
- Auto token refresh

### ✅ Forgot Password
- Reset token generation
- Expiry validation (1 hour)
- Secure password update

### ✅ Profile Management
- Update personal details
- Change password
- Role-based access

### ✅ Role-Based Access Control (RBAC)
- **Store Owner**: Full access to settings, profit analytics, and user management
- **Sales Staff**: Access restricted to Sales Module and Product Lookups only

### ✅ Security Features
- **Two-Factor Authentication (2FA)**: Mobile OTP login support for store owners
- **JWT Token Refresh**: Automatic token rotation
- **Password Hashing**: bcrypt with configurable rounds
- **Rate Limiting**: Throttling on API endpoints

---

## 📦 Core Functional Modules

### 1️⃣ Product Management
- Add / Edit / Delete products
- Define:
  - Cost Price
  - Selling Price
  - Current Stock
  - Supplier Lead Time
  - Category
  - Barcode
  - Expiry Date
  - Minimum Stock Level

**Validation:**
- Stock ≥ 0
- Selling price warning if below cost

### 2️⃣ Sales & Billing Module
- Log daily sales with product selection
- Support for multiple payment modes:
  - Cash
  - UPI
  - Credit/Khata
- Auto-deduct stock upon sale
- Prevent overselling (Warning if stock < required)
- Digital receipt generation

### 3️⃣ Supplier & Purchase Management
- Register and manage suppliers
- Track supplier contact information
- Link products to suppliers
- Purchase history tracking

---

## 🧠 Inventory Intelligence Engine

### 📊 Demand Prediction
Uses 7-day moving average:
```
Moving Average = Total Sales (Last 7 Days) / 7
```
Trend adjustment applied if recent sales spike detected.

### 📉 Reorder Point Calculation
```
Reorder Point = (Avg Daily Sales × Lead Time) + Safety Stock
Safety Stock = (Max Daily Sales − Avg Daily Sales) × Lead Time
```
If Current Stock < Reorder Point → 🔴 Low Stock Alert

### ⚠ Overstock Detection
```
If Current Stock > (Predicted Daily Demand × 15)
→ ⚠ Overstock Warning
```

### ⏳ Expiry Tracking
- Field for product expiry date
- Dashboard alerts for products expiring within 30/60/90 days
- Prevent sale of expired items

### 💰 Profit Analytics
- Total Revenue
- Gross Profit
- Profit Margin %
- Fast-moving products
- High-margin products

```
Profit = (Selling Price − Cost Price) × Units Sold
Margin % = ((Selling − Cost) / Selling) × 100
```

---

## 📊 Dashboard Highlights

- **Total Products** - Count of all products
- **Total Stock Value** - Inventory investment
- **Revenue Today** - Today's sales revenue
- **Profit Today** - Today's gross profit
- **Low Stock Alerts** - Products needing reorder
- **Overstock Warnings** - Products with excess stock
- **7-Day Sales Trend** - Visual sales chart
- **Top 5 Selling Products** - Best performers

---

## 📱 Responsive Design

KiranaIQ is fully responsive and optimized for:

### 🖥 Desktop (≥1280px)
- Fixed Sidebar
- Multi-column layout
- Side-by-side charts

### 💻 Laptop (1024px–1279px)
- Collapsible sidebar
- Compact card layout

### 📲 Tablet (768px–1023px)
- Hamburger menu navigation
- Stacked charts
- Scrollable tables

### 📱 Mobile (≤767px)
- Single-column layout
- Slide-out navigation
- Full-width dashboard cards
- Touch-friendly buttons

---

## 🗂 Backend Modules (NestJS)

- **Auth Module** - Registration, Login, JWT, 2FA
- **Users Module** - User management, Profile
- **Products Module** - CRUD operations, Stock management
- **Sales Module** - Sales recording, History
- **Suppliers Module** - Supplier management
- **Analytics Module** - Profit analytics, Reports
- **Inventory Engine Module** - Demand prediction, Reorder alerts

---

## 🗄 Database Schema

### User
- id, fullName, email, mobile, passwordHash
- role (STORE_OWNER | SALES_STAFF)
- profileImage, is2FAEnabled, twoFASecret
- timestamps

### Product
- id, name, category, costPrice, sellingPrice
- currentStock, leadTimeDays, expiryDate
- barcode, minStockLevel
- supplierId (FK), userId (FK)
- timestamps

### Supplier
- id, name, contactPerson, phone, address, email
- userId (FK)
- timestamps

### Sale
- id, productId (FK), quantity, totalPrice
- paymentMode (CASH | UPI | CREDIT | KHATA)
- date, userId (FK), staffId, customerName, discount
- timestamps

### StockMovement
- id, productId (FK), quantity, type, reason, userId
- createdAt

### PasswordReset
- id, userId (FK), token, expiry, used
- createdAt

---

## 🏛 System Architecture

```
┌─────────────────┐
│   Frontend      │
│   (Next.js)     │
└────────┬────────┘
         │ REST API (Axios)
         ▼
┌─────────────────┐
│   Backend       │
│   (NestJS)      │
└────────┬────────┘
         │ Prisma ORM
         ▼
┌─────────────────┐
│   Database      │
│   (SQLite/PG)   │
└─────────────────┘
```

**Core Business Logic:**
- Prediction Engine (7-day moving average)
- Reorder Engine (Safety stock calculation)
- Profit Engine (Margin analysis)

---

## 🛡 Security Features

- ✅ JWT Authentication
- ✅ Password Hashing (bcrypt)
- ✅ DTO Validation (class-validator)
- ✅ Protected API Routes (Guards)
- ✅ Input Sanitization
- ✅ Rate Limiting (Throttler)
- ✅ CORS Configuration
- ✅ Helmet (Security headers)

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Ankit-Rathor/kirana-smart-inventory.git
cd kirana-smart-inventory
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Go back to root and install frontend
cd ..
npm install --legacy-peer-deps
```

### 3. Setup PostgreSQL Database

**Option A: Using Docker (Recommended)**
```bash
# Start PostgreSQL
docker-compose up -d

# Wait for database to be ready
sleep 5
```

**Option B: Using Local PostgreSQL**
```bash
# Install PostgreSQL (Ubuntu/Debian)
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL
sudo systemctl start postgresql

# Create database
psql -U postgres -h localhost -c "CREATE DATABASE kirana_iq;"
```

See `DATABASE_SETUP.md` for detailed instructions.

### 4. Environment Configuration

**Backend (.env):**
```env
# Application
NODE_ENV=development
PORT=3001
API_PREFIX=api/v1

# Database - PostgreSQL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kirana_iq?schema=public"

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

### 5. Database Migration

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

---

## 🏁 Running the Project

### Option 1: Run Both (Root)

```bash
# From project root
npm run dev
```

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

### Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **API Health:** http://localhost:3001/api/v1/health

---

## 📚 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login |
| POST | `/api/v1/auth/forgot-password` | Request password reset |
| POST | `/api/v1/auth/reset-password` | Reset password |
| POST | `/api/v1/auth/change-password` | Change password (auth) |
| POST | `/api/v1/auth/refresh` | Refresh token |
| POST | `/api/v1/auth/2fa/generate` | Generate 2FA secret |
| POST | `/api/v1/auth/2fa/enable` | Enable 2FA |
| POST | `/api/v1/auth/2fa/verify` | Verify 2FA token |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/products` | Get all products |
| GET | `/api/v1/products/:id` | Get product by ID |
| POST | `/api/v1/products` | Create product |
| PUT | `/api/v1/products/:id` | Update product |
| DELETE | `/api/v1/products/:id` | Delete product |
| POST | `/api/v1/products/:id/stock` | Adjust stock |
| GET | `/api/v1/products/low-stock` | Get low stock products |
| GET | `/api/v1/products/expiring` | Get expiring products |

### Sales
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/sales` | Get all sales |
| GET | `/api/v1/sales/today` | Get today's sales |
| POST | `/api/v1/sales` | Create sale |
| PUT | `/api/v1/sales/:id` | Update sale |
| DELETE | `/api/v1/sales/:id` | Delete sale |

### Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/analytics/dashboard` | Get dashboard stats |
| GET | `/api/v1/analytics/profit` | Get profit analytics |
| GET | `/api/v1/analytics/sales-report` | Get sales report |

### Inventory
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/inventory/alerts` | Get inventory alerts |
| GET | `/api/v1/inventory/product/:id/demand` | Get demand prediction |
| GET | `/api/v1/inventory/product/:id/reorder` | Get reorder point |

---

## 🎯 Success Criteria

- ✅ Secure authentication system with JWT
- ✅ Accurate demand forecasting (7-day MA)
- ✅ Correct reorder alerts
- ✅ Real-time profit analytics
- ✅ Fully responsive UI
- ✅ Modular and clean architecture
- ✅ PWA support ready

---

## 🔌 Technical Enhancements

### Implemented
- ✅ JWT Authentication with refresh tokens
- ✅ Role-based access control
- ✅ Responsive design (Mobile-first)
- ✅ Real-time dashboard updates
- ✅ Inventory alerts system

### Future (PWA & Offline)
- 🔄 PWA Support: Installable on Android/iOS home screens
- 🔄 Offline Mode: Cache basic product data for billing
- 🔄 Barcode/QR Scanning: Mobile camera integration

---

## 🚀 Future Enhancements

- [ ] Multi-store support
- [ ] GST billing module
- [ ] Real-time WhatsApp notifications for low stock
- [ ] AI-based seasonal demand modeling (Holi, Diwali trends)
- [ ] Supplier performance scoring
- [ ] Customer management (Khata ledger)
- [ ] Barcode scanner integration
- [ ] Export reports (PDF, Excel)

---

## 🎤 Demo Positioning Statement

> **KiranaIQ is not just an inventory tracker.**
> It is a secure, full-stack inventory intelligence system that applies forecasting and safety stock modeling to optimize small retail businesses.

---

## 🔔 Smart Alert System

| Alert | Description |
|-------|-------------|
| 🔴 Low Stock | Stock below minimum level |
| ⚠ Expiry Soon | Products expiring within 30 days |
| 📉 Slow Moving | Products with low sales velocity |
| 💰 High Profit | High margin products |
| 📦 Overstock | Excess inventory warning |

---

## 👨💻 Author

**Ankit Rathore**  
*Vibe Coding Hackathon Submission 🚀*

---

## 📄 License

MIT License - feel free to use this project for learning and commercial purposes.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

For issues and feature requests, please create an issue in the GitHub repository.
