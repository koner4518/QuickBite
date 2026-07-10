# 🍔 QuickBite

A modern **Food Delivery Web Application** built using the **MERN Stack**. QuickBite enables users to browse delicious meals, place orders securely using Stripe, manage their cart, and track their orders, while providing administrators with a dedicated dashboard to manage food items and customer orders.

---

## 🚀 Live Demo

**Frontend:** https://quick-bite-ten-zeta.vercel.app/

**Admin Panel:** Coming Soon

---


# ✨ Features

## 👤 User Features

- User Registration & Login
- JWT Authentication
- Browse Food Categories
- Search & Explore Menu
- Add / Remove Items from Cart
- Responsive Shopping Cart
- Secure Stripe Checkout
- Order Tracking
- View Order History

---

## 🛠️ Admin Features

- Secure Admin Dashboard
- Add New Food Items
- Upload Images using Cloudinary
- Delete Food Items
- Manage Customer Orders
- Update Order Status

---

# 🧰 Tech Stack

## Frontend

- React.js
- Vite
- React Router DOM
- Context API
- Axios
- CSS3
- React Toastify

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Multer
- Cloudinary
- Stripe Payment Gateway

---

## Database

- MongoDB Atlas

---

## Cloud Services

- Cloudinary (Image Storage)
- Stripe (Payment Processing)

---

# 📂 Project Structure

```
QuickBite/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── AppDownload/
│   │   │   ├── Context/
│   │   │   ├── ExploreMenu/
│   │   │   ├── FoodDisplay/
│   │   │   ├── FoodItem/
│   │   │   ├── Footer/
│   │   │   ├── Header/
│   │   │   ├── LoginPopup/
│   │   │   └── Navbar/
│   │   ├── pages/
│   │   │   ├── Cart/
│   │   │   ├── Home/
│   │   │   ├── MyOrders/
│   │   │   ├── PlaceOrder/
│   │   │   └── Verify/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── cloudconfig.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── admin/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   └── Sidebar/
│   │   ├── pages/
│   │   │   ├── Add/
│   │   │   ├── List/
│   │   │   └── Orders/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

# 🔐 Authentication

- JWT Token Based Authentication
- Password Encryption using bcrypt
- Protected Routes
- Secure User Sessions

---

# 💳 Payment Gateway

QuickBite integrates **Stripe Checkout** for secure online payments.

Features:

- Secure Payment Flow
- Automatic Checkout Session
- Payment Verification
- Order Confirmation

---

# ☁️ Image Storage

Food images are uploaded securely using **Cloudinary**, providing:

- Fast CDN Delivery
- Optimized Images
- Cloud Storage
- Automatic Image URLs

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/QuickBite.git
```

```bash
cd QuickBite
```

---

## 2️⃣ Backend Setup

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file.

Example:

```env
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

STRIPE_SECRET_KEY=your_stripe_secret_key

CLOUD_NAME=your_cloudinary_name

CLOUD_API_KEY=your_cloudinary_api_key

CLOUD_API_SECRET=your_cloudinary_api_secret
```

Run backend

```bash
npm run server
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
```

```bash
npm install
```

Run

```bash
npm run dev
```

---

## 4️⃣ Admin Panel Setup

```bash
cd admin
```

```bash
npm install
```

Run

```bash
npm run dev
```

---


# 📖 Learning Outcomes

This project helped me gain practical experience in:

- Full Stack MERN Development
- REST API Development
- Authentication & Authorization
- Payment Gateway Integration
- Cloud Image Upload
- MongoDB Database Design
- State Management
- Responsive UI Design
- CRUD Operations

---

# 👨‍💻 Author

**Supriyo Koner**

GitHub: https://github.com/koner4518

LinkedIn: https://www.linkedin.com/in/supriyo-koner-249500241/

---

## ⭐ If you like this project, consider giving it a star!
