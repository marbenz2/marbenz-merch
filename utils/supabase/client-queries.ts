"use client";

import { Tables } from "@/database.types";
import { cache } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import { createClient } from "./client";

// Typdefinitionen für die Rückgabewerte
type QueryResult<T> = {
  data: T | null;
  error: PostgrestError | null;
};

// User Profile
export const getUserProfile = cache(
  async (userId: string): Promise<QueryResult<Tables<"profiles">>> => {
    const supabase = await createClient();
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .returns<Tables<"profiles">>()
        .single();

      return { data, error };
    } catch (e) {
      console.error("Exception in getUserProfile:", e);
      return { data: null, error: e as PostgrestError };
    }
  }
);

type OrderInput = {
  user_id: string;
  total_amount: number;
  shipping_address: string;
};

export const createOrder = async (
  orderData: OrderInput
): Promise<QueryResult<Tables<"orders">>> => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          ...orderData,
          status: "pending",
        },
      ])
      .select()
      .returns<Tables<"orders">>()
      .single();

    console.log("order data", data);
    console.log("order error", error);

    return { data, error };
  } catch (e) {
    console.error("Exception in createOrder:", e);
    return { data: null, error: e as PostgrestError };
  }
};

type OrderItemInput = {
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_time: number;
};

export const createOrderItems = async (
  items: OrderItemInput[]
): Promise<QueryResult<Tables<"order_items">[]>> => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("order_items")
      .insert(items)
      .select()
      .returns<Tables<"order_items">[]>();

    console.log("order_items data", data);
    console.log("order_items error", error);

    return { data, error };
  } catch (e) {
    console.error("Exception in createOrderItems:", e);
    return { data: null, error: e as PostgrestError };
  }
};
