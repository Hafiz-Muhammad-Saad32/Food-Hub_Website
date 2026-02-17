# 🤝 Contribution & Responsibilities

This document outlines the contribution and responsibilities for the **FoodHub Restaurant Web App**, developed using a **feature-based MVC architecture**.

Work was divided based on **complete feature ownership** and **frontend–backend separation**, following real-world development practices.

---

# 👤 Suraish — Backend Developer 

### Backend Architecture & Setup
- ✅ Created the **backend root folder**
- ✅ Designed and implemented **feature-based MVC structure**
- ✅ Separated concerns into:
  - Models
  - Controllers
  - Services
  - Routes
  - Validations
- ✅ Created base project files (`app.ts`, config, utils)
- ✅ Setup MongoDB connection
- ✅ Environment configuration (.env usage)

#### 🔐 Authentication (Auth Feature)
- ✅ User registration & login
- ✅ JWT access token generation and verification
- ✅ Password hashing using bcrypt
- ✅ Auth routes, controllers, services
- ✅ Zod validation for auth inputs
- ✅ Auth middleware (protected routes)

#### 👤 Users Feature
- ✅ User CRUD operations
- ✅ User Mongoose schema
- ✅ User validation using Zod
- ✅ User routes, controllers, services

#### ⚙️ Core Infrastructure
- Designed **feature-based MVC architecture**
- MongoDB connection setup
- Environment configuration
- Shared utilities (JWT, bcrypt helpers)
- Project setup & folder structure
- Code organization and best practices

#### 🛡️ Admin Feature
- Admin-specific routes and controllers
- Role-based admin middleware
- Admin validation logic

---

# 👤 Muhammad Saad — Backend Developer

### ✅ Frontend Application (React)
- ✅ Designed and implemented **complete frontend UI**
- ✅ Built using **React, Vite, Tailwind CSS**
- ✅ Implemented pages:
  - Home
  - Login / Signup
  - Cart
  - Admin Panel
  - Order & Checkout
- ✅ Created reusable UI components
- ✅ Implemented client-side routing
- ✅ Axios setup for backend API integration
- ✅ Responsive design (mobile, tablet, desktop)

#### 🍔 Foods / Products Feature
- Food CRUD operations
- Food Mongoose schema
- Food input validation (Zod)
- Food routes, controllers, services

#### 📦 Orders Feature
- Create and manage food orders
- Order Mongoose schema
- Order validation (Zod)
- Order routes, controllers, services

#### 🏠 Address Feature
- Delivery address management
- Address Mongoose schema
- Address validation (Zod)
- Address routes, controllers, services

---

## 🤝 Collaboration Summary

- ✅ Backend follows **Feature-Based MVC Architecture**
- ✅ Frontend and backend developed independently but aligned
- ✅ Clear ownership of responsibilities
- ✅ Clean and scalable project structure
- ✅ Designed for real-world usage and academic evaluation

📌 This contribution model reflects **industry-standard full-stack development practices**.
