"use client";

import { useProductStore } from "@/app/stores/productStore";
import { Tables } from "@/database.types";
import { type Products } from "@/utils/supabase/additionalTypes";
import { useEffect } from "react";

interface ShopDataProviderProps {
  children: React.ReactNode;
  initialProducts: Products[];
  initialCategories: Tables<"categories">[];
  initialBestsellers: Tables<"bestsellers">[];
}

export default function ShopDataProvider({
  children,
  initialProducts,
  initialCategories,
  initialBestsellers,
}: ShopDataProviderProps) {
  const { setProducts, setCategories, setBestsellers, setIsLoading } =
    useProductStore();

  useEffect(() => {
    setIsLoading(true);
    setProducts(initialProducts);
    setIsLoading(false);
  }, [initialProducts, setProducts]);

  useEffect(() => {
    setIsLoading(true);
    setCategories(initialCategories);
    setIsLoading(false);
  }, [initialCategories, setCategories]);

  useEffect(() => {
    setIsLoading(true);
    setBestsellers(initialBestsellers);
    setIsLoading(false);
  }, [initialBestsellers, setBestsellers]);

  return <>{children}</>;
}
