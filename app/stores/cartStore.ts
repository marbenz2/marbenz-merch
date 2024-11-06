import { create } from "zustand";
import { Tables } from "@/database.types";
import { Products } from "@/utils/supabase/additionalTypes";

interface CartItem {
  product: Products;
  quantity: number;
  size?: string;
  color?: string;
}

type CartStore = {
  items: CartItem[];
  addItem: (
    product: Tables<"products">,
    quantity?: number,
    size?: string,
    color?: string,
    showToast?: () => void
  ) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setItems: (items: CartItem[]) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  setItems: (items) => set({ items }),

  addItem: (product, quantity = 1, size, color, showToast) =>
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity, size, color }
              : item
          ),
        };
      }
      showToast?.();
      return { items: [...state.items, { product, quantity, size, color }] };
    }),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),

  clearCart: () => set({ items: [] }),

  getTotalItems: () => {
    const state = get();
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  getTotalPrice: () => {
    const state = get();
    return state.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  },
}));
