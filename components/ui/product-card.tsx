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
import { ProductWithImage } from "@/utils/supabase/additionalTypes";
import { Button } from "./button";
import Link from "next/link";

type Color = { name: string; value: string };

export default function ProductCard({
  productWithImage,
}: {
  productWithImage: ProductWithImage;
}) {
  const formatPrice = (price: number) => {
    return Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  return (
    <CardBackplate className="flex flex-col overflow-clip w-full max-w-sm">
      <div className="relative">
        <Image
          src={productWithImage.primaryImage ?? "/placeholder-image.jpg"}
          alt={productWithImage.name}
          width={400}
          height={200}
          className="object-cover w-full h-48"
        />
        {productWithImage.stock_quantity <= 0 && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Ausverkauft
          </Badge>
        )}
      </div>
      <div className="flex flex-col justify-between h-full">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{productWithImage.name}</CardTitle>
              <CardDescription className="mt-2">
                {productWithImage.short_description}
              </CardDescription>
            </div>
            <span className="text-xl font-bold">
              {formatPrice(productWithImage.price)}
            </span>
          </div>
        </CardHeader>

        {/*  <CardContent className="flex-grow">
        <Table>
          <TableBody>
            {productWithImage.material && (
              <TableRow>
                <TableCell className="font-medium">Material</TableCell>
                <TableCell>{productWithImage.material}</TableCell>
              </TableRow>
            )}
            {productWithImage.sizes && productWithImage.sizes.length > 0 && (
              <TableRow>
                <TableCell className="font-medium">Größen</TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {productWithImage.sizes.map((size) => (
                      <Badge key={size} variant="outline">
                        {size}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            )}
            {productWithImage.colors && productWithImage.colors.length > 0 && (
              <TableRow>
                <TableCell className="font-medium">Farben</TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {(productWithImage.colors as Color[]).map(
                      (color: Color) => (
                        <Badge key={color.name} variant="outline">
                          {color.name}
                        </Badge>
                      )
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell className="font-medium">Verfügbarkeit</TableCell>
              <TableCell>
                <Badge
                  variant={
                    productWithImage.stock_quantity > 0
                      ? "default"
                      : "destructive"
                  }
                >
                  {productWithImage.stock_quantity > 0
                    ? `${productWithImage.stock_quantity} Stk.`
                    : "Nicht verfügbar"}
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent> */}

        <CardFooter className="flex">
          <Link
            href={`/products/${productWithImage.id}`}
            className="flex flex-1"
          >
            <Button
              className="flex-1"
              disabled={productWithImage.stock_quantity <= 0}
            >
              Zum Produkt
            </Button>
          </Link>
        </CardFooter>
      </div>
    </CardBackplate>
  );
}
