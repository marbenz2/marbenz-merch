"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ProductWithImage } from "@/utils/supabase/additionalTypes";
import Link from "next/link";
import { Table, TableBody, TableCell, TableRow } from "./table";

export default function HighlightCard({
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
  const salePrice =
    productWithImage.price *
    (1 - (productWithImage.sale_percentage ?? 0) / 100);

  return (
    <Link
      href={`/products/${productWithImage.id}`}
      className="flex w-full max-w-sm"
    >
      <Card className="flex flex-col w-full h-full overflow-clip relative">
        <Image
          src={productWithImage.primaryImage ?? "/placeholder-image.jpg"}
          alt={productWithImage.name}
          width={400}
          height={400}
          className="object-cover w-full h-full absolute inset-0"
        />
        {productWithImage.stock_quantity <= 0 && (
          <Badge variant="destructive" className="absolute top-2 right-2 z-10">
            Ausverkauft
          </Badge>
        )}
        <div className="relative flex flex-col h-full">
          <CardHeader className="bg-background/80">
            <CardTitle>{productWithImage.name}</CardTitle>
          </CardHeader>
          <CardContent className="mt-auto bg-background/80 flex flex-col gap-4">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Verfügbarkeit</TableCell>
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
                <TableRow>
                  <TableCell>Preis</TableCell>
                  <TableCell className="flex gap-2">
                    <span
                      className={`${
                        productWithImage.is_sale
                          ? "line-through decoration-contrast decoration-2 decoration-wavy"
                          : ""
                      }`}
                    >
                      {formatPrice(productWithImage.price)}{" "}
                    </span>
                    {productWithImage.sale_percentage &&
                      productWithImage.sale_percentage > 0 && (
                        <span className="text-contrast">
                          -{productWithImage.sale_percentage}%
                        </span>
                      )}
                  </TableCell>
                </TableRow>
                {productWithImage.is_sale && (
                  <TableRow>
                    <TableCell className="text-xl text-contrast">
                      Sale
                    </TableCell>
                    <TableCell>
                      <span className="text-xl text-contrast">
                        {formatPrice(salePrice)}
                      </span>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
