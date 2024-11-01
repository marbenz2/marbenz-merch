"use client";

import { useProductStore } from "@/app/stores/productStore";
import { Tables } from "@/database.types";
import { useEffect } from "react";

type ProductWithImage = Tables<"products"> & {
  primaryImage?: string;
};

interface ShopDataProviderProps {
  children: React.ReactNode;
  initialProductsWithImages: ProductWithImage[];
  initialCategories: Tables<"categories">[];
  initialBestsellers: Tables<"bestsellers">[];
}

export default function ShopDataProvider({
  children,
  initialProductsWithImages,
  initialCategories,
  initialBestsellers,
}: ShopDataProviderProps) {
  const { setProductsWithImages } = useProductStore();
  const { setCategories } = useProductStore();
  const { setBestsellers } = useProductStore();

  useEffect(() => {
    setProductsWithImages(initialProductsWithImages);
  }, [initialProductsWithImages, setProductsWithImages]);

  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories, setCategories]);

  useEffect(() => {
    setBestsellers(initialBestsellers);
  }, [initialBestsellers, setBestsellers]);

  return <>{children}</>;
}
