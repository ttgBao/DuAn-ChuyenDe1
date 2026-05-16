// src/Collection.jsx
import { useState } from "react";
import "./collection.css";

// ảnh banner lớn cho từng bộ sưu tập
import nam from "./assets/nam.jpg";
import nu from "./assets/women.jpg";
import dongho from "./assets/dongho.jpg";

// data chung
import { products as PRODUCT_DATA } from "./data/products.mock";

// dùng card & popup chung
import ProductCard from "./components/ProductCard";
import ProductPopup from "./components/ProductPopup";

// Cấu hình từng collection + cách lọc sản phẩm từ data chung
const collectionsConfig = [
  {
    key: "men",
    title: "Men",
    image: nam,
    filter: (p) => p.categoryId === 1, // <- so sánh số trực tiếp
  },
  {
    key: "women",
    title: "Women",
    image: nu,
    filter: (p) => p.categoryId === 2,
  },
  {
    key: "watches",
    title: "ĐỒNG HỒ - TAI NGHE",
    image: dongho,
    filter: (p) => p.categoryId === 3,
  },
];

function Collection() {
  return (
    <main className="collections-page">
      <h1 className="page-title">Các Bộ Sưu Tập</h1>

      {collectionsConfig.map((col) => {
        // lấy sản phẩm cho từng collection
        const products = PRODUCT_DATA.filter(col.filter).slice(0, 6);

        if (!products.length) return null;

        return (
          <div key={col.key} className="collection-wrapper">
            <CollectionSection
              title={col.title}
              image={col.image}
              products={products}
            />
          </div>
        );
      })}
    </main>
  );
}

export default Collection;

function CollectionSection({ title, image, products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenPopup = (product) => {
    setSelectedProduct(product);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
  };

  return (
    <section className="collection">
      <h2 className="collection-title">{title}</h2>

      <div className="collection-content">
        <div className="collection-image">
          <img src={image} alt={title} />
        </div>

        <div className="collection-products">
          {products.map((p) => (
            <div key={p.id} className="product">
              <ProductCard product={p} onQuickView={handleOpenPopup} />
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <ProductPopup product={selectedProduct} onClose={handleClosePopup} />
      )}
    </section>
  );
}