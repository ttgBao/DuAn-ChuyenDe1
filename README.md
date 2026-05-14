# DuAn-ChuyenDe1 - E-commerce Product Management Website

A React-based e-commerce web application with an admin dashboard for managing products.  
The project connects to a serverless backend deployed on AWS and stores product data in DynamoDB.

## Overview

This project was built as a web application for displaying and managing product data through a clean user interface.  
It includes both a customer-facing homepage and an admin management area for handling product CRUD operations.

The main goal of this project is to practice building a real-world web application with React, REST API integration, cloud deployment, and database-driven product management.

## Features

### User Interface

- Product homepage layout
- Banner section
- Product collection section
- Policy section
- Footer and navigation components
- Responsive layout with React components

### Admin Dashboard

- View product list
- Create new products
- Update existing products
- Delete products
- Validate admin access using local storage token and role
- Manage product state after API actions

### API Integration

- Fetch product data from AWS API Gateway
- Send product create/update/delete requests to backend API
- Map DynamoDB product data into frontend-friendly format
- Handle API loading and error cases

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- CSS
- React Router DOM
- Axios / Fetch API
- React Icons
- Font Awesome
- Lucide React
- Swiper

### Backend & Cloud

- Python
- AWS Lambda
- AWS API Gateway
- DynamoDB

## Project Structure

```bash
DuAn-ChuyenDe1/
├── public/
├── src/
│   ├── admin/
│   │   ├── components/
│   │   ├── AdminPage.jsx
│   │   └── CartAdmin.jsx
│   ├── assets/
│   ├── components/
│   ├── css/
│   ├── data/
│   ├── services/
│   │   └── productApi.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
