"use client";

import { useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Products } from "@/utils/supabase/additionalTypes";
import { Button } from "./ui/button";
import HighlightCard from "./ui/highlight-card";
import Autoplay from "embla-carousel-autoplay";
import ProductCard from "./ui/product-card";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

interface CarouselComponentProps {
  products: Products[];
  autoplay?: boolean;
  loop?: boolean;
  variant?: "default" | "highlight";
}

const getProductCount = (products: Products[]) => {
  return `${products.length} Produkt${products.length > 1 ? "e" : ""}`;
};

export function CarouselComponent({
  products,
  autoplay = false,
  loop = false,
  variant = "default",
}: CarouselComponentProps) {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <div className="flex flex-col gap-4 w-full">
      <Carousel
        setApi={setApi}
        opts={{ loop: loop }}
        plugins={autoplay ? [Autoplay({ delay: 3000 })] : []}
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
            >
              {variant === "highlight" ? (
                <HighlightCard product={product} />
              ) : (
                <ProductCard product={product} />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex gap-4 justify-between items-center">
        {products.length > 0 ? (
          <>
            <Button onClick={() => api?.scrollPrev()} variant="outline">
              <ArrowLeftIcon />
            </Button>
            <p className="text-sm text-muted-foreground">
              {getProductCount(products)}
            </p>
            <Button onClick={() => api?.scrollNext()} variant="outline">
              <ArrowRightIcon />
            </Button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Momentan sind keine Produkte in dieser Kategorie verfügbar.
          </p>
        )}
      </div>
    </div>
  );
}
