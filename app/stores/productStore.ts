import { create } from "zustand";
import { Tables } from "@/database.types";
import { ProductWithImage } from "@/utils/supabase/additionalTypes";

type ProductStore = {
  productsWithImages: ProductWithImage[];
  setProductsWithImages: (productsWithImages: ProductWithImage[]) => void;
  categories: Tables<"categories">[];
  setCategories: (categories: Tables<"categories">[]) => void;
  bestsellers: Tables<"bestsellers">[];
  setBestsellers: (bestsellers: Tables<"bestsellers">[]) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  productsWithImages: [],
  setProductsWithImages: (productsWithImages) => set({ productsWithImages }),
  categories: [],
  setCategories: (categories) => set({ categories }),
  bestsellers: [],
  setBestsellers: (bestsellers) => set({ bestsellers }),
}));
