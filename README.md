<div align="center">

# 🛍️ ChuyenDe1 - Fashion E-commerce Website

A modern **fashion e-commerce website** built with **ReactJS, Vite, TailwindCSS, AWS Lambda, API Gateway, and DynamoDB**.

This project includes product listing, product detail, cart, checkout, authentication, and an admin dashboard for product management.

<br />

![React](https://img.shields.io/badge/ReactJS-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![AWS](https://img.shields.io/badge/AWS_Lambda-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![DynamoDB](https://img.shields.io/badge/DynamoDB-4053D6?style=for-the-badge&logo=amazondynamodb&logoColor=white)

</div>

---

## 📌 Overview

**ChuyenDe1** is a frontend e-commerce project for selling fashion products such as clothes, shoes, watches, and accessories.

The project focuses on building a real shopping website interface with:

- Product category pages
- Product detail page
- Shopping cart
- Checkout page
- Login / Register
- Admin product management
- REST API integration
- AWS serverless backend connection

This project was developed as a practical school project to improve frontend development skills and understand how a React application communicates with backend APIs.

---

## ✨ Features

### 🏠 User Side

- 🛍️ View product categories
- 🔍 Filter products by price, size, and brand
- 📄 View product detail
- 🛒 Add products to cart
- ➕ Increase / decrease product quantity
- ❌ Remove products from cart
- 💰 Calculate total cart price
- 📦 Checkout page
- 🔐 Login / Register account
- 📱 Responsive layout for desktop and mobile

---

### 🛠️ Admin Side

- 📊 Admin dashboard
- 📦 View product list
- ➕ Create new product
- ✏️ Edit product information
- 🗑️ Delete product
- 🔍 Search products
- 🧩 Filter products by category and subcategory
- 🔐 Role-based admin access using token and role from localStorage

---

## 🧰 Tech Stack

| Category | Technologies |
|---|---|
| Frontend | ReactJS, Vite, JavaScript |
| Styling | TailwindCSS, CSS |
| Routing | React Router DOM |
| API Client | Axios, Fetch API |
| Icons | Heroicons, FontAwesome, Lucide React, React Icons |
| Slider | Swiper |
| Backend | AWS Lambda |
| API | AWS API Gateway |
| Database | Amazon DynamoDB |
| Storage | LocalStorage |

---

## 📁 Folder Structure

```bash
DuAn-ChuyenDe1/
│
├── public/
│
├── src/
│   ├── admin/
│   │   ├── components/
│   │   ├── AdminPage.jsx
│   │   └── CartAdmin.jsx
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Banner.jsx
│   │   ├── BrandFilter.jsx
│   │   ├── Breadcrumb.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── Detail.jsx
│   │   ├── Footer.jsx
│   │   ├── Login.jsx
│   │   ├── NavigationMenu.jsx
│   │   ├── PriceFilter.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductList.jsx
│   │   ├── ProductPage.jsx
│   │   ├── Register.jsx
│   │   ├── SizeFilter.jsx
│   │   └── ...
│   │
│   ├── css/
│   ├── data/
│   ├── services/
│   │   └── productApi.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
