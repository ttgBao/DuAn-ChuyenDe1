import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../services/productApi";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(err => {
        console.error(err);
        setError("Không tải được sản phẩm");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Đang tải sản phẩm...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex gap-4 flex-wrap">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}
