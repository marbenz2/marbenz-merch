"use client";

import { useOrderStore } from "@/app/stores/orderStore";
import { getServerOrders } from "@/utils/supabase/server-queries";
import { User } from "@supabase/supabase-js";
import { useEffect } from "react";
/* import { createClient } from "@/utils/supabase/client"; */
import { Tables } from "@/database.types";
import { OrderWithItems } from "@/utils/supabase/additionalTypes";

interface OrderDataProviderProps {
  user: User | null;
  children: React.ReactNode;
  initialOrders?: OrderWithItems[];
}

export default function OrderDataProvider({
  user,
  children,
  initialOrders,
}: OrderDataProviderProps) {
  /* const supabase = createClient(); */
  const { setOrders } = useOrderStore();

  useEffect(() => {
    if (!user || !initialOrders) return;
    setOrders(initialOrders);
  }, [initialOrders, setOrders, user]);

  // Subscription für Echtzeit-Updates
  /*  useEffect(() => {
    if (!user) return;

    const ordersSubscription = supabase
      .channel("orders")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
          filter: `user_id=eq.${user.id}`,
        },
        async () => {
          // Nur bei Änderungen neue Daten laden
          const { data, error } = await getServerOrders(user.id);
          if (error) {
            console.error("Fehler beim Laden der Orders:", error);
            return;
          }
          if (data) setOrders(data);
        }
      )
      .subscribe();

    return () => {
      ordersSubscription.unsubscribe();
    };
  }, [user, setOrders]); */

  return <>{children}</>;
}
