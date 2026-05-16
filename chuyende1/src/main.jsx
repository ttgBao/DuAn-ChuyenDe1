import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Detail from "./components/Detail";
import CartPage from "./components/CartPage";
import ProductPage from "./components/ProductPage";
// Import trang Admin
import AdminPage from "./admin/AdminPage";
import CheckoutPage from "./components/CheckoutPage";
import CartAdmin from "./admin/CartAdmin";
import Register from "./components/Register";
import Login from "./components/Login";

const routers = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <App /> }, // Trang chủ
      
      { path: "product/:productId", element: <Detail /> },
      
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      // === THÊM ROUTE ADMIN VÀO ĐÂY ===
      // Truy cập: http://localhost:5173/admin
      { path: "admin", element: <AdminPage /> },
      { path: "/admin/cart", element: <CartAdmin /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },



      // Route danh mục (để cuối cùng để tránh xung đột)
      { path: ":category", element: <ProductPage /> }, 
      { path: ":category/:subCategory", element: <ProductPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routers} />
  </React.StrictMode>
);