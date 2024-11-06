"use client";

import { useCartStore } from "@/app/stores/cartStore";
import { User } from "@supabase/supabase-js";
import { useEffect } from "react";

interface CartDataProviderProps {
  user: User | null;
  children: React.ReactNode;
}

export default function CartDataProvider({
  user,
  children,
}: CartDataProviderProps) {
  const { setItems } = useCartStore();

  // Lade Cart aus localStorage beim Mount
  useEffect(() => {
    if (!user) return;

    const savedCart = localStorage.getItem("cart-items");
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, [setItems, user]);

  // Speichere Cart-Änderungen in localStorage
  useEffect(() => {
    if (!user) return;

    const unsubscribe = useCartStore.subscribe((state) => {
      localStorage.setItem("cart-items", JSON.stringify(state.items));
    });

    return () => unsubscribe();
  }, [user]);

  return <>{children}</>;
}
