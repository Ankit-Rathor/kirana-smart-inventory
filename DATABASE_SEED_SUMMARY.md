# 📦 Database Seed - Sample Products Added

## ✅ Successfully Seeded Database

### **Default User Created:**
- **Email:** `admin@kirana.com`
- **Password:** `admin123`
- **Role:** STORE_OWNER
- **Store:** Kirana Smart Store

---

## 📊 Products Added (41 Items)

### **Categories:**

#### 1. **Grains & Pulses (5 items)**
- Basmati Rice (Premium) - ₹95
- Wheat Flour (Atta) - 10kg - ₹420
- Toor Dal (Arhar) - ₹140
- Moong Dal - ₹110
- Chana Dal - ₹105

#### 2. **Essentials (3 items)**
- Sugar - 1kg - ₹48
- Salt (Tata) - 1kg - ₹22
- Cooking Oil (Fortune) - 1L - ₹160

#### 3. **Dairy (4 items)**
- Ghee (Amul) - 500ml - ₹310
- Amul Milk - 500ml - ₹32
- Amul Butter - 100g - ₹60
- Eggs - 1 tray (30 pcs) - ₹210

#### 4. **Spices (6 items)**
- Turmeric Powder - 100g - ₹45
- Red Chilli Powder - 100g - ₹50
- Coriander Powder - 100g - ₹40
- Cumin Seeds (Jeera) - 100g - ₹95
- Mustard Seeds - 100g - ₹35
- Garam Masala - 50g - ₹60

#### 5. **Beverages (5 items)**
- Tea (Tata Tea) - 250g - ₹140
- Coffee (Nescafe) - 50g - ₹115
- Coca Cola - 750ml - ₹45
- Pepsi - 750ml - ₹45
- Mineral Water (Bisleri) - 1L - ₹20

#### 6. **Snacks & Biscuits (6 items)**
- Lays Chips (Classic) - 50g - ₹25
- Kurkure - 50g - ₹20
- Bingo Chips - 50g - ₹25
- Parle-G Biscuits - 500g - ₹65
- Britannia Marie Gold - 300g - ₹42
- Good Day Butter Cookies - 200g - ₹75

#### 7. **Personal Care (4 items)**
- Lifebuoy Soap - 100g - ₹32
- Dettol Soap - 100g - ₹42
- Colgate Toothpaste - 100g - ₹80
- Shampoo (Head & Shoulders) - 180ml - ₹180

#### 8. **Household (4 items)**
- Surf Excel Detergent - 500g - ₹100
- Vim Bar - 100g - ₹32
- Harpic Toilet Cleaner - 500ml - ₹115
- Hit Insecticide Spray - 300ml - ₹165

#### 9. **Instant Food & Condiments (4 items)**
- Maggi Noodles - 70g - ₹16
- Yippee Noodles - 70g - ₹16
- Kissan Ketchup - 750ml - ₹130
- Ching's Soy Sauce - 250ml - ₹80

---

## 📈 Sample Data Created

### **Sales Records:** 50
- Random sales from last 7 days
- Different payment modes: CASH, UPI, CREDIT, KHATA
- Various products sold

### **Supplier:** 1
- **Name:** Mumbai Wholesale Suppliers
- **Contact:** Rajesh Kumar
- **Phone:** 9876543211
- **Address:** Crawford Market, Mumbai

---

## 🎯 Database Statistics

| Metric | Value |
|--------|-------|
| Total Products | 41 |
| Total Sales | 50 |
| Total Stock Units | 4,505 |
| Categories | 10 |
| Suppliers | 1 |

---

## 🔧 How to Run Seed Again

```bash
cd backend
npm run prisma:seed
```

---

## 📱 Access Prisma Studio

View and manage database visually:

```bash
cd backend
npx prisma studio
```

Opens at: http://localhost:5555

---

## 🚀 Login to Application

1. Open: http://localhost:3000/auth/login
2. Email: `admin@kirana.com`
3. Password: `admin123`
4. You'll see all 41 products in Inventory page!

---

## 📦 Product Stock Alerts

### Low Stock Items (< minStockLevel):
- Some products will show low stock alerts
- Perfect for testing inventory management

### Expiring Soon:
- Amul Milk (2 days)
- Eggs (10 days)
- Amul Butter (30 days)

---

## 🎨 Features to Test

✅ **Inventory Management**
- View all 41 products
- Check stock levels
- Low stock alerts

✅ **Sales Tracking**
- 50 sample sales records
- 7-day sales trend
- Payment mode breakdown

✅ **Analytics**
- Revenue calculations
- Top selling products
- Stock value reports

✅ **Supplier Management**
- View supplier details
- Contact information

---

**Database seeded successfully! 🎉**
