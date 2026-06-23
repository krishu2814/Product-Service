# 🛒 E-Commerce Microservices Platform

A production-inspired **E-Commerce Backend System** built using **Node.js, Express.js, MongoDB, JWT Authentication, and Microservices Architecture**.

The platform is designed following real-world distributed system principles where independent services communicate through REST APIs behind a centralized API Gateway.

---

## 🚀 Core Features

### 🔐 Authentication & Authorization

* JWT-based Authentication
* Secure Login & Registration
* Password Hashing using Bcrypt
* Role-Based Access Control (RBAC)

### 👥 User Roles

| Role     | Permissions                                               |
| -------- | --------------------------------------------------------- |
| Customer | Browse products, manage cart, place orders, make payments |
| Vendor   | Create and manage own products                            |
| Admin    | Manage users, products, orders, and platform operations   |

---

## 🏗️ Microservices Architecture

The system is divided into independent services:

### 📦 Product Service

* Product CRUD Operations
* Inventory Management
* Category Management
* Full Text Search
* Filtering, Sorting & Pagination

### 🛒 Cart Service

* Add Products to Cart
* Update Cart Quantity
* Remove Cart Items
* Clear Cart
* Cart Total Calculation
* Product Validation via Product Service

### 📋 Order Service

* Create Orders from Cart
* Order Tracking
* Order Status Management
* Payment Status Tracking
* Order History

### 💳 Payment Service

* Payment Processing Workflow
* Order Validation Before Payment
* Duplicate Payment Prevention
* Transaction Tracking
* Order Status Synchronization
* Automatic Cart Cleanup After Successful Payment

### 🚪 API Gateway

* Single Entry Point for Clients
* Request Routing
* Authentication Middleware
* Authorization Layer
* Service Isolation
* Scalability Support

---

## 🧠 System Flow

### Product Purchase Journey

1. Customer logs in and receives JWT Token
2. Customer browses products
3. Product added to Cart Service
4. Cart validates product from Product Service
5. Customer creates Order
6. Order Service stores order with `PENDING` status
7. Customer initiates Payment
8. Payment Service validates Order
9. Payment succeeds
10. Order updated to `PLACED`
11. Cart is automatically cleared
12. Order moves through lifecycle:

    * PENDING
    * PLACED
    * CONFIRMED
    * DELIVERED

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose ODM

### Authentication

* JWT
* Bcrypt

### Communication

* REST APIs
* Axios (Inter-Service Communication)

### Architecture

* Microservices
* API Gateway Pattern
* Repository Pattern
* Service Layer Pattern

### Tools

* Postman
* MongoDB Compass
* Git
* GitHub

---

## 📂 Services Structure

```bash
ecommerce-platform/

├── api-gateway/
│
├── auth-service/
│
├── product-service/
│
├── cart-service/
│
├── order-service/
│
├── payment-service/
│
└── shared/
```

---

## ⚙️ Major Implementations

### Product Service

* CRUD APIs
* Search
* Filtering
* Pagination
* Sorting
* Inventory Tracking

### Authentication Service

* Signup/Login
* JWT Generation
* Password Encryption
* Role Management

### Cart Service

* Product Validation
* Quantity Updates
* Price Calculation
* Cart Management

### Order Service

* Order Creation
* Status Tracking
* Delivery Information
* Order History

### Payment Service

* Payment Validation
* Transaction Generation
* Duplicate Payment Protection
* Order Synchronization

### API Gateway

* Route Aggregation
* Centralized Authentication
* Request Forwarding
* Security Layer

---

## 📊 Database Design

### Product

```js
{
  name,
  description,
  price,
  category,
  brand,
  stock,
  images,
  rating,
  numReviews
}
```

### Cart

```js
{
  userId,
  items: [
    {
      productId,
      quantity,
      price
    }
  ],
  totalPrice
}
```

### Order

```js
{
  userId,
  orderNumber,
  items,
  totalAmount,
  orderStatus,
  paymentStatus,
  transactionId,
  deliveryAddress
}
```

### Payment

```js
{
  orderId,
  userId,
  amount,
  paymentMethod,
  status,
  transactionId
}
```

---

## 🔒 Security Features

* JWT Authentication
* Password Hashing (Bcrypt)
* RBAC Authorization
* Protected Routes
* Service-Level Validation
* Input Validation
* Error Handling Middleware

---

## 📈 Future Enhancements

* Redis Caching
* RabbitMQ Event Bus
* Stripe/Razorpay Integration
* Docker & Kubernetes Deployment
* Elasticsearch
* AWS S3 Product Images
* Notification Service
* Recommendation Engine

---

## 🎯 What This Project Demonstrates

* Backend Engineering
* Distributed Systems Design
* Microservices Architecture
* API Gateway Implementation
* Secure Authentication & Authorization
* Inter-Service Communication
* Database Design
* Scalable E-Commerce System Development

---

## 👨‍💻 Author

Krishu Kumar

GitHub:
https://github.com/krishu2814

Email:
[krishukumarsingh06@gmail.com](mailto:krishukumarsingh06@gmail.com)
