"use client";

import { useProductStore } from "@/app/stores/productStore";
import { ProductDetails } from "@/components/products/ProductDetails";
import { use } from "react";

export default function ProductPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = use(props.params);
  const { productsWithImages } = useProductStore();
  const productWithImage = productsWithImages.find((p) => p.id === params.id);

  if (!productWithImage) {
    return <div>Produkt nicht gefunden</div>;
  }

  return <ProductDetails productWithImage={productWithImage} />;
}
