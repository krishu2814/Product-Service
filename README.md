# 📦 Product Service (Microservice)

A scalable **Product Management Service** built using **Node.js, Express, and MongoDB**, designed as a core component of a **microservices-based e-commerce system**.

This service is responsible for managing the **product catalog**, including CRUD operations, inventory tracking, and search functionality.

---

## 🚀 Features

* ➕ Create Products
* 📄 Fetch All Products
* 🔍 Get Product by ID
* ✏️ Update Product Details
* ❌ Delete Products
* 📦 Inventory Management (Stock)
* 🔎 Full-Text Search (MongoDB Indexing)
* ⭐ Ratings & Reviews Metadata

---

## 🏗️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose ODM)
* **Architecture:** Microservices
* **Search:** MongoDB Text Index
* **Version Control:** Git & GitHub

---

## 📂 Project Structure

```id="c7k29s"
product-service/
│
├── src/
│   ├── controller/
│   │   └── product-controller.js
│   ├── routes/
│   │   └── v1/
│   │       └── product-routes.js
│   ├── models/
│   │   └── product-model.js
│   ├── services/
│   ├── repository/
│   └── config/
│
├── package.json
├── .env
└── README.md
```

---

## ⚙️ API Endpoints

### 📦 Product APIs

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| POST   | `/products`     | Create a product  |
| GET    | `/products`     | Get all products  |
| GET    | `/products/:id` | Get product by ID |
| PATCH  | `/products/:id` | Update product    |
| DELETE | `/products/:id` | Delete product    |

---

## 🧠 Data Model

```js id="g72ksl"
{
  name: String,          // unique product name
  description: String,   // product details
  price: Number,         // product price
  category: String,      // product category
  brand: String,         // brand name
  stock: Number,         // inventory count
  images: [String],      // product images
  rating: Number,        // average rating (0-5)
  numReviews: Number     // total reviews count
}
```
---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository

```bash id="k29sll"
git clone https://github.com/your-username/product-service.git
cd product-service
```

### 2️⃣ Install Dependencies

```bash id="l92ksl"
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file:

```id="p82lsl"
PORT=4000
MONGO_URI=your_mongodb_connection_string
```

---

### 4️⃣ Run the Server

```bash id="z82lsl"
npm start
```

---

## 🧪 Testing

Test APIs using:

* Postman
* Thunder Client
* Mongodb Compass
* Mongodb Atlas

---

## 📈 Future Enhancements

* 🔐 Admin Authentication & Authorization
* 📊 Pagination, Filtering, Sorting
* ⚡ Redis Caching
* ☁️ Image Upload (AWS S3 / Cloudinary)
* 🔎 ElasticSearch Integration
* 🧠 AI-based Recommendations

---

## 🌐 Role in Microservices Architecture

This service works as part of a larger system:

* Product Service ✅
* User Service ✅
* Order Service ✅
* Cart Service 🚧
* Payment Service 🚧
* API Gateway 🚧

---

## 🧪 Best Practices

* ✅ RESTful API Design
* ✅ MVC Architecture
* ✅ Separation of Concerns
* ✅ Schema Validation (Mongoose)
* ✅ Index Optimization
* ✅ Clean & Maintainable Code

---

## 💼 Why This Project?

This project showcases:

* Backend development expertise
* Real-world product system design
* Microservices architecture understanding
* Database modeling and indexing skills

---

## 🤝 Contributing

```bash id="x92lsl"
# Fork the repository
git checkout -b feature/YourFeature

# Make changes
git commit -m "Add feature"

# Push changes
git push origin feature/YourFeature
```

---

## 📬 Contact

**Krishu Kumar**  
📧 Email: [krishukumarsingh06@gmail.com](mailto:krishukumarsingh06@gmail.com)  
🐙 GitHub: https://github.com/krishu2814

---
