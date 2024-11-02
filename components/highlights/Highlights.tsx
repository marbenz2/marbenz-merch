"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useProductStore } from "@/app/stores/productStore";
import HighlightCard from "../ui/highlight-card";

export default function Highlights() {
  const { bestsellers } = useProductStore();
  const { productsWithImages } = useProductStore();

  const sortedBestsellers = bestsellers.sort((a, b) => a.rank - b.rank);

  const highlightsWithImages = productsWithImages
    .filter((productWithImage) =>
      sortedBestsellers.some(
        (sortedBestseller) =>
          sortedBestseller.product_id === productWithImage.id
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
    <Card className="flex flex-col w-full">
      <CardHeader>
        <CardTitle className="text-contrast">Bestseller</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          {highlightsWithImages.map((highlightWithImage) => (
            <HighlightCard
              key={highlightWithImage.id}
              productWithImage={highlightWithImage}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
