"use client";

import React from "react";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardBackplate,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Products } from "@/utils/supabase/additionalTypes";
import { Button } from "./button";
import Link from "next/link";

export default function ProductCard({ product }: { product: Products }) {
  const formatPrice = (price: number) => {
    return Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  return (
    <CardBackplate className="flex flex-col overflow-clip w-full group h-full">
      <div className="relative overflow-clip">
        <Image
          src={product.primaryImage ?? "/placeholder-image.jpg"}
          alt={product.name}
          width={400}
          height={400}
          className="object-cover w-full h-48 transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        {product.stock_quantity <= 0 && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Ausverkauft
          </Badge>
        )}
      </div>
      <div className="flex flex-col justify-between h-full">
        <CardHeader>
          <div className="flex justify-between items-start gap-2">
            <div className="flex flex-col">
              <CardTitle className="text-lg md:text-xl">
                {product.name}
              </CardTitle>
              <CardDescription className="mt-2">
                {product.short_description}
              </CardDescription>
            </div>
            <span className="text-lg md:text-xl font-bold">
              {formatPrice(product.price)}
            </span>
          </div>
        </CardHeader>
        <CardFooter className="flex">
          <Link href={`/products/${product.id}`} className="flex w-full">
            <Button className="flex-1" disabled={product.stock_quantity <= 0}>
              Zum Produkt
            </Button>
          </Link>
        </CardFooter>
      </div>
    </CardBackplate>
  );
}
