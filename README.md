
# 🚀 KiranaIQ – Smart Inventory & Profit Optimization System

A full-stack inventory intelligence platform built with **Next.js (Frontend)** and **NestJS (Backend)** to help small retailers optimize stock, predict demand, and improve profitability using data-driven forecasting and safety stock logic.

---

# 📌 Product Vision

KiranaIQ transforms traditional kirana stores from guess-based inventory management to a structured, data-driven decision-support system.

It enables:
- Intelligent demand prediction
- Smart reorder alerts
- Overstock detection
- Profit visibility
- Secure user management
- Fully responsive UI across all devices

---

# 🏗 Tech Stack

## 🔹 Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS / CSS Modules
- Responsive Design (Mobile, Tablet, Laptop, Desktop)

## 🔹 Backend
- NestJS
- TypeScript
- JWT Authentication
- bcrypt (Password Hashing)
- Prisma / TypeORM
- PostgreSQL / SQLite

---

# 🔐 Authentication & User Management

## ✅ Registration
- Full Name
- Email (Unique)
- Mobile Number
- Store Name
- Password (Min 8 characters)
- Confirm Password

## ✅ Login
- Email + Password
- JWT-based authentication
- Protected routes

## ✅ Forgot Password
- Reset token generation
- Expiry validation
- Secure password update

## ✅ Profile Management
- Update personal details
- Change password
- Upload profile image

## ✅ Role-Based Access Control (RBAC)
- **Store Owner**: Full access to settings, profit analytics, and user management.
- **Sales Staff**: Access restricted to the Sales Module and Product Lookups only.

## ✅ Security & Audit
- **Two-Factor Authentication (2FA)**: Mobile OTP login support for store owners.
- **Activity Logs**: Track all critical actions (Stock updates, Price changes, Deletions).

---

# 📦 Core Functional Modules

## 1️⃣ Product Management
- Add / Edit / Delete products
- Define:
  - Cost Price
  - Selling Price
  - Current Stock
  - Supplier Lead Time
  - Category

Validation:
- Stock ≥ 0
- Selling price warning if below cost

---

## 2️⃣ Sales & Billing Module
- Log daily sales with barcode scanning support.
- Support for multiple payment modes (Cash, UPI, Credit/Khata).
- Auto-deduct stock upon sale.
- Prevent overselling (Warning if stock < 1).
- Generate digital receipts (printable or shareable).

## 3️⃣ Supplier & Purchase Management
- Register and manage suppliers.
- Log purchases to auto-update stock and cost prices.
- Track purchase history for price fluctuation analysis.

---

# 🧠 Inventory Intelligence Engine

## 📊 Demand Prediction

Uses 7-day moving average:

Moving Average = Total Sales (Last 7 Days) / 7

Trend adjustment applied if recent sales spike.

---

## 📉 Reorder Point Calculation

Reorder Point = (Avg Daily Sales × Lead Time) + Safety Stock  

Safety Stock = (Max Daily Sales − Avg Daily Sales) × Lead Time  

If Current Stock < Reorder Point → 🔴 Low Stock Alert

---

## ⚠ Overstock Detection

If Current Stock > (Predicted Daily Demand × 15)  
→ ⚠ Overstock Warning

---

## ⏳ Expiry Tracking
- Field for product expiry date.
- Dashboard alerts for products expiring within 30/60/90 days.
- Prevent sale of expired items.

---

## 💰 Profit Analytics

- Total Revenue
- Gross Profit
- Profit Margin %
- Fast-moving products
- High-margin products

Profit = (Selling Price − Cost Price) × Units Sold  
Margin % = ((Selling − Cost) / Selling) × 100

---

# 📊 Dashboard Highlights

- Total Products
- Total Stock Value
- Revenue Today
- Profit Today
- Low Stock Alerts
- Overstock Warnings
- 7-Day Sales Trend
- Top 5 Selling Products

---

# 📱 Responsive Design

KiranaIQ is fully responsive and optimized for:

## 🖥 Desktop (≥1280px)
- Fixed Sidebar
- Multi-column layout
- Side-by-side charts

## 💻 Laptop (1024px–1279px)
- Collapsible sidebar
- Compact card layout

## 📲 Tablet (768px–1023px)
- Hamburger menu navigation
- Stacked charts
- Scrollable tables

## 📱 Mobile (≤767px)
- Single-column layout
- Slide-out navigation
- Full-width dashboard cards
- Touch-friendly buttons

---

# 🗂 Backend Modules (NestJS)

- Auth Module
- Users Module
- Products Module
- Sales Module
- Analytics Module
- Inventory Engine Module

---

# 🗄 Database Schema

## User
- id
- fullName
- email
- mobile
- passwordHash
- role
- profileImage
- createdAt
- updatedAt

## Product
- id
- name
- category
- costPrice
- sellingPrice
- currentStock
- leadTimeDays
- expiryDate
- barcode
- supplierId
- userId

## Supplier
- id
- name
- contactPerson
- phone
- address
- userId

## Sale
- id
- productId
- quantity
- totalPrice
- paymentMode (CASH, UPI, CREDIT)
- date
- userId
- staffId (Optional)

## PasswordReset
- id
- userId
- token
- expiry

---

# 🏛 System Architecture

Frontend (Next.js)  
↓  
REST API Calls  
↓  
NestJS Controllers  
↓  
Service Layer (Business Logic)  
↓  
Database  

Core Business Logic Modules:
- Prediction Engine
- Reorder Engine
- Profit Engine

---

# 🛡 Security Features

- JWT Authentication
- Password Hashing (bcrypt)
- DTO Validation
- Protected API Routes
- Input Sanitization

---

# 📦 Installation

Clone the repository:

```
git clone https://github.com/Ankit-Rathor/kirana-smart-inventory.git
```

---

# 🏁 Running the Project

## 🔹 Frontend

```
cd frontend
npm install
npm run dev
```

## 🔹 Backend

```
cd backend
npm install
npm run start:dev
```

---

# 🎯 Success Criteria

- Secure authentication system
- Accurate demand forecasting
- Correct reorder alerts
- Real-time profit analytics
- Fully responsive UI
- Modular and clean architecture

---

## 🔌 Technical Enhancements
- **PWA Support**: Installable on Android/iOS home screens for mobile-first usage.
- **Offline Mode**: Cache basic product data for billing during internet drops.
- **Barcode/QR Scanning**: Mobile camera integration for fast product entry.

---

# 🚀 Future Enhancements

- Multi-store support
- GST billing module
- Real-time WhatsApp notifications for low stock
- AI-based seasonal demand modeling (Holi, Diwali trends)
- Supplier performance scoring

---

# 🎤 Demo Positioning Statement

KiranaIQ is not just an inventory tracker.  
It is a secure, full-stack inventory intelligence system that applies forecasting and safety stock modeling to optimize small retail businesses.

---

# 👨‍💻 Author

Ankit Rathore  
Vibe Coding Hackathon Submission 🚀