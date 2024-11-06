"use client";

import { useMemo, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useProductStore } from "@/app/stores/productStore";
import Searchbar from "../ui/searchbar";
import { debounce } from "lodash";
import { CategoryProducts } from "./CategoryProducts";
import { SearchResults } from "./SearchResult";
import { ProductWithCategories } from "@/utils/supabase/additionalTypes";
import Spinner from "../ui/Spinner";

interface ProductsProps {
  category?: string | null;
}

export default function Products({ category }: ProductsProps) {
  const { products, categories, isLoading } = useProductStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [uniqueFilteredProducts, setUniqueFilteredProducts] =
    useState<ProductWithCategories[]>(products);

  const filteredProductsByCategory = useMemo(() => {
    if (!category) {
      return products;
    }

    const categoryObject = categories.find(
      (cat) => cat.name.toLowerCase() === category
    );

    if (!categoryObject) {
      console.warn("Kategorie nicht gefunden:", category);
      return [];
    }

    if (categoryObject.category_type === "sub") {
      return products.filter((product) =>
        product.categories?.some((cat) => cat.id === categoryObject.id)
      );
    }

    const subCategoryIds = categories
      .filter((cat) => cat.parent_id === categoryObject.id)
      .map((cat) => cat.id);

    return products.filter((product) =>
      product.categories?.some(
        (cat) => cat.id === categoryObject.id || subCategoryIds.includes(cat.id)
      )
    );
  }, [category, products, categories]);

  const filterProducts = useMemo(
    () => (term: string) => {
      if (!term.trim()) return filteredProductsByCategory;

      return filteredProductsByCategory.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    },
    [filteredProductsByCategory]
  );

  const debouncedSearch = useMemo(
    () =>
      debounce((term: string) => {
        setUniqueFilteredProducts(filterProducts(term));
      }, 300),
    [filterProducts]
  );

  useEffect(() => {
    setUniqueFilteredProducts(filteredProductsByCategory);
    return () => {
      debouncedSearch.cancel();
    };
  }, [filteredProductsByCategory, debouncedSearch]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    debouncedSearch(term);
  };

  return (
    <Card className="flex-w-full">
      <CardHeader>
        <CardTitle>
          {category
            ? categories.find((cat) => cat.id === category)?.name
            : "Alle Produkte"}
        </CardTitle>
        <Searchbar onSearch={handleSearch} />
      </CardHeader>
      <CardContent>
        {searchTerm ? (
          <SearchResults products={uniqueFilteredProducts} />
        ) : isLoading ? (
          <div className="flex justify-center items-center h-full py-12">
            <Spinner />
          </div>
        ) : (
          <CategoryProducts
            categoryName={category}
            products={filteredProductsByCategory}
            categories={categories}
          />
        )}
      </CardContent>
    </Card>
  );
}
