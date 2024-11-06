import { create } from "zustand";
import { Tables } from "@/database.types";
import { Products } from "@/utils/supabase/additionalTypes";

type ProductStore = {
  products: Products[];
  setProducts: (products: Products[]) => void;
  categories: Tables<"categories">[];
  setCategories: (categories: Tables<"categories">[]) => void;
  bestsellers: Tables<"bestsellers">[];
  setBestsellers: (bestsellers: Tables<"bestsellers">[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  categories: [],
  setCategories: (categories) => set({ categories }),
  bestsellers: [],
  setBestsellers: (bestsellers) => set({ bestsellers }),
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
}));
