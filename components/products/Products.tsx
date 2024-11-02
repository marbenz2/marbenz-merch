"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ProductCard from "../ui/product-card";
import { useProductStore } from "@/app/stores/productStore";
import Searchbar from "../ui/searchbar";

export default function Products() {
  const { productsWithImages } = useProductStore();

  return (
    <Card className="flex flex-col w-full">
      <CardHeader>
        <CardTitle>Produkte</CardTitle>
        <Searchbar />
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          {productsWithImages.map((productWithImage) => (
            <ProductCard
              key={productWithImage.id}
              productWithImage={productWithImage}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
