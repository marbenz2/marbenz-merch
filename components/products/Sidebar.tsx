"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useProductStore } from "@/app/stores/productStore";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { DropDownMenuComponent } from "../DropDownMenuComponent";
import { ShirtIcon } from "lucide-react";
import Spinner from "../ui/Spinner";

export default function Sidebar() {
  const { categories, isLoading } = useProductStore();

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
            <div className="flex overflow-x-auto md:overflow-x-visible touch-pan-x">
              {categoriesStructure.special.map((specialCat, index) => (
                <Link
                  key={specialCat.id}
                  href={`/products?category=${specialCat.name.toLowerCase()}`}
                  className="flex h-14 items-center px-8 hover:bg-contrast transition-colors duration-300 text-sm whitespace-nowrap"
                >
                  {specialCat.name.toUpperCase()}
                </Link>
              ))}
            </div>
            <Separator className="flex md:hidden bg-border-navigation" />
            {/* Main Categories */}
            <div className="flex overflow-x-auto md:overflow-x-visible touch-pan-x">
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
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
