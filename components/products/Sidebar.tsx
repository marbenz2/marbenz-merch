"use client";

import React, { useCallback, useMemo, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useProductStore } from "@/app/stores/productStore";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { DropDownMenuComponent } from "../DropDownMenuComponent";
import Spinner from "../ui/Spinner";

export default function Sidebar() {
  const { categories, isLoading } = useProductStore();

  const ScrollableContainer = ({ children }: { children: React.ReactNode }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isScrollingRef = useRef(false);
    const startXRef = useRef(0);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
      startXRef.current = e.touches[0].clientX;
      isScrollingRef.current = false;
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
      const deltaX = Math.abs(e.touches[0].clientX - startXRef.current);
      if (deltaX > 5) {
        isScrollingRef.current = true;
      }
    }, []);

    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
      // Verhindert Bubble-Up des Events wenn wir scrollen
      if (isScrollingRef.current) {
        e.stopPropagation();
      }
      isScrollingRef.current = false;
    }, []);

    return (
      <div
        ref={containerRef}
        className="flex overflow-x-auto md:overflow-x-visible touch-pan-x"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    );
  };

  const categoriesStructure = useMemo(() => {
    const mainCategories = categories
      .filter((cat) => cat.category_type === "main")
      .sort((a, b) => a.name.localeCompare(b.name));

    const specialCategories = categories
      .filter((cat) => cat.category_type === "special")
      .sort((a, b) => a.name.localeCompare(b.name));

    return {
      main: mainCategories.map((mainCat) => ({
        ...mainCat,
        subCategories: categories.filter(
          (cat) => cat.category_type === "sub" && cat.parent_id === mainCat.id
        ),
      })),
      special: specialCategories,
    };
  }, [categories]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Kategorien</CardTitle>
      </CardHeader>
      {isLoading && (
        <div className="flex justify-center items-center h-full py-4">
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row md:overflow-x-auto">
            {/* Special Categories */}
            <ScrollableContainer>
              {categoriesStructure.special.map((specialCat, index) => (
                <Link
                  key={specialCat.id}
                  href={`/products?category=${specialCat.name.toLowerCase()}`}
                  className="flex h-14 items-center px-8 hover:bg-contrast transition-colors duration-300 text-sm whitespace-nowrap"
                >
                  {specialCat.name.toUpperCase()}
                </Link>
              ))}
            </ScrollableContainer>
            <Separator className="flex md:hidden bg-border-navigation" />
            {/* Main Categories */}
            <ScrollableContainer>
              {categoriesStructure.main.map((mainCat) => (
                <div key={mainCat.id} className="whitespace-nowrap">
                  <DropDownMenuComponent
                    className="flex h-14 items-center px-8 hover:bg-contrast transition-colors duration-300 text-sm hover:text-none data-[state=open]:bg-contrast"
                    link={{
                      label: mainCat.name.toUpperCase(),
                      subcategories: mainCat.subCategories.map((subCat) => ({
                        type: subCat.name,
                        href: `/products?category=${subCat.name.toLowerCase()}`,
                      })),
                    }}
                  />
                </div>
              ))}
            </ScrollableContainer>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
