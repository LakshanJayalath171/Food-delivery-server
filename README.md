# 🍔 Crave – Food Delivery Backend

<p align="center">
  <strong>A scalable REST API backend for the Crave food delivery application.</strong>
  <br />
  Built with NestJS, TypeScript, MongoDB and Cloudinary.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
</p>

---

## 📖 About the Project

**Crave Backend** is the server-side application powering Crave, an online food delivery platform.

It provides RESTful APIs for user authentication, product management, category management, customer profiles and order processing. It also provides the backend infrastructure required for the mobile application and admin dashboard.

The backend is developed using **NestJS and TypeScript**, with **MongoDB** for data persistence and **Cloudinary** for image storage.

The architecture is organized into modular components to make the application easier to maintain, extend and scale.

## ✨ Features

### 🔐 Authentication & Authorization
- User registration and login.
- Admin authentication.
- JWT-based authentication.
- Password hashing using bcrypt.
- Protected API endpoints.
- Role-based access control for users and administrators.

### 👤 User Management
- Create and manage user accounts.
- Retrieve user profile information.
- Update personal information.
- Manage delivery addresses.
- Manage favorite dishes.

### 🍔 Product Management
- Create and manage food products.
- Retrieve available products.
- Retrieve product details.
- Update product information.
- Manage product prices and availability.
- Support product offers and discounted prices.
- Store product images using Cloudinary.

### 📂 Category Management
- Create and manage food categories.
- Retrieve all categories.
- Update category information.
- Manage category images.
- Track the number of products associated with categories.
- Prevent duplicate category names.

### 🛒 Order Management
- Create customer orders.
- Retrieve customer orders.
- Retrieve orders for administration.
- Update order statuses.
- Manage order information and delivery details.

### ☁️ Cloud Image Management
- Upload product images.
- Upload category images.
- Store image URLs and Cloudinary identifiers.
- Manage uploaded media through Cloudinary.

### ⚡ Real-Time Order Updates
**Development status: In progress**

The planned real-time functionality uses WebSockets to notify customers when administrators change their order status.

Expected workflow:

1. Customer places an order.
2. The order appears in the admin dashboard.
3. Administrator updates the order status.
4. Backend sends a real-time notification.
5. Customer receives the updated order status without manually refreshing the application.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| NestJS | Backend framework |
| TypeScript | Programming language |
| Node.js | JavaScript runtime |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modeling |
| JWT | Authentication |
| bcrypt | Password hashing |
| Cloudinary | Image and media storage |
| Axios | HTTP communication from clients |
| class-validator | Request validation |
| class-transformer | Data transformation |
| WebSocket / Socket.IO | Real-time communication (if enabled) |

---


## ⚙️ Getting Started

Follow these instructions to run the backend locally.

### 1. Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB (local installation or MongoDB Atlas account)
- Git
- Cloudinary account

### 2. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

Navigate into the project:

```bash
cd crave-backend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory.



## 🔐 Security & Validation

The backend uses security and validation mechanisms to protect API operations.

- JWT-based authentication.
- Password hashing with bcrypt.
- Role-based access restrictions.
- Request validation using NestJS ValidationPipe.
- Whitelisted DTO properties.
- Rejection of unexpected request properties.
- Environment-based secret configuration.
- Protected administrative operations.

The global validation configuration can be implemented using:



## 👨‍💻 Author

**Crave – Food Delivery Application**

Backend developed using NestJS, TypeScript and MongoDB.


<p align="center">
  <strong>Crave – Bringing your favorite food closer to you. 🍔</strong>
</p>
