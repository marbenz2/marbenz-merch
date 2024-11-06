import { Tables } from "@/database.types";
import { OrderWithItems } from "@/utils/supabase/additionalTypes";
import { create } from "zustand";

interface OrderStore {
  orders: OrderWithItems[] | null;
  currentOrder: OrderWithItems | null;
  setOrders: (orders: OrderWithItems[]) => void;
  setCurrentOrder: (order: OrderWithItems) => void;
  clearOrders: () => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: null,
  currentOrder: null,
  setOrders: (orders) => set({ orders }),
  setCurrentOrder: (order) => set({ currentOrder: order }),
  clearOrders: () => set({ orders: null, currentOrder: null }),
}));
