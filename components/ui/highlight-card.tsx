"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { type Products } from "@/utils/supabase/additionalTypes";
import Link from "next/link";
import { Table, TableBody, TableCell, TableRow } from "./table";

export default function HighlightCard({ product }: { product: Products }) {
  return (
    <Link href={`/products/${product.id}`} className="flex w-full h-full group">
      <Card className="flex-col w-full h-full overflow-clip relative border-none">
        <Image
          src={product.primaryImage ?? "/placeholder-image.jpg"}
          alt={product.name}
          width={400}
          height={400}
          className="object-cover w-full h-full absolute inset-0 transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        {product.stock_quantity <= 0 && (
          <Badge variant="destructive" className="absolute top-2 right-2 z-10">
            Ausverkauft
          </Badge>
        )}
        <div className="relative flex flex-col h-full">
          <CardHeader className="bg-background/80 h-full">
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent className="mt-auto bg-background/80 flex flex-col gap-4">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Verfügbarkeit</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.stock_quantity > 0 ? "default" : "destructive"
                      }
                    >
                      {product.stock_quantity > 0
                        ? `${product.stock_quantity} Stk.`
                        : "Nicht verfügbar"}
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="flex w-full items-center justify-center pb-4">
              {product.is_sale && (
                <Badge className="flex flex-col text-lg bg-contrast w-fit px-6 py-3 border-2 border-white">
                  Sale{" "}
                  <span className="text-3xl font-black">
                    -{product.sale_percentage}%
                  </span>
                </Badge>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
