"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useProductStore } from "@/app/stores/productStore";
import { CarouselComponent } from "../CarouselComponent";
import Spinner from "../ui/Spinner";

export default function Highlights() {
  const { bestsellers, isLoading, products } = useProductStore();

  const sortedBestsellers = bestsellers.sort((a, b) => a.rank - b.rank);

  const highlights = products
    .filter((product) =>
      sortedBestsellers.some(
        (sortedBestseller) => sortedBestseller.product_id === product.id
      )
    )
    .sort((a, b) => {
      const rankA =
        sortedBestsellers.find((item) => item.product_id === a.id)?.rank || 0;
      const rankB =
        sortedBestsellers.find((item) => item.product_id === b.id)?.rank || 0;
      return rankA - rankB;
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-contrast">Bestseller</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex justify-center items-center h-full py-12">
            <Spinner />
          </div>
        )}
        {!isLoading && (
          <CarouselComponent
            products={highlights}
            variant="highlight"
            loop={true}
            autoplay={true}
          />
        )}
      </CardContent>
    </Card>
  );
}
