export async function getProducts() {
  const res = await fetch(
    "https://ns414sbifk.execute-api.ap-southeast-1.amazonaws.com/api/products"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  // MAP data từ DynamoDB → đúng format ProductCard
  return data
    .filter(
      (p) => p.status === "Active" || p.status === 1 || p.status === undefined
    )
    .map((p) => ({
      id: p.id ?? p.product_id,
      name: p.name,
      price: p.price,
      imgMain: p.imgMain,
      imgHover: p.imgHover,
      images: p.images,
      descriptionHtml: p.descriptionHtml,
      specifications: p.specifications,
      sale: p.sale,
      brand: p.brand,
      sizes: p.sizes,
      quantity: p.quantity,
      raw: p,
    }));
}
