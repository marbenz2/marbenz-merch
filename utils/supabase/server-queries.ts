import { createClient } from "./server";
import { Tables } from "@/database.types";
import { cache } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import { OrderWithItems, type Products } from "./additionalTypes";

type QueryResult<T> = {
  data: T | null;
  error: PostgrestError | null;
};

type ProductCategoryJoin = {
  product_id: string;
  categories: Tables<"categories">;
};

// Zentrale Produkt-Query
export const getServerProducts = cache(
  async (): Promise<QueryResult<Products[]>> => {
    const supabase = await createClient();
    try {
      // Hole Produkte
      const { data: products, error: productsError } = await supabase
        .from("products")
        .select("*")
        .returns<Tables<"products">[]>();

      if (productsError) throw productsError;

      // Hole primäre Bilder
      const { data: images, error: imagesError } = await supabase
        .from("product_images")
        .select("product_id, image_url")
        .eq("is_primary", true)
        .returns<{ product_id: string; image_url: string }[]>();

      if (imagesError) throw imagesError;

      // Hole Kategorien für alle Produkte
      const { data: productCategories, error: categoriesError } = await supabase
        .from("product_categories")
        .select("product_id, categories (*)")
        .returns<ProductCategoryJoin[]>();

      if (categoriesError) throw categoriesError;

      // Verknüpfe alle Daten
      const enrichedProducts = products.map((product) => ({
        ...product,
        primaryImage: images?.find((img) => img.product_id === product.id)
          ?.image_url,
        categories: productCategories
          ?.filter((pc) => pc.product_id === product.id)
          ?.map((pc) => pc.categories),
      }));

      return { data: enrichedProducts, error: null };
    } catch (e) {
      console.error("Exception in getServerProducts:", e);
      return { data: null, error: e as PostgrestError };
    }
  }
);

// Einzelnes Produktbild abrufen (falls noch benötigt)
export const getServerProductImage = cache(
  async (productId: string): Promise<QueryResult<string>> => {
    const supabase = await createClient();
    try {
      const { data, error } = await supabase
        .from("product_images")
        .select("image_url")
        .eq("product_id", productId)
        .eq("is_primary", true)
        .returns<{ image_url: string }[]>()
        .single();

      return { data: data?.image_url || null, error };
    } catch (e) {
      console.error("Exception in getServerProductImage:", e);
      return { data: null, error: e as PostgrestError };
    }
  }
);

// Kategorien
export const getServerCategories = cache(
  async (): Promise<QueryResult<Tables<"categories">[]>> => {
    const supabase = await createClient();
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("is_active", true)
        .returns<Tables<"categories">[]>();

      return { data, error };
    } catch (e) {
      console.error("Exception in getCategories:", e);
      return { data: null, error: e as PostgrestError };
    }
  }
);

// Bestseller
export const getServerBestsellers = cache(
  async (): Promise<QueryResult<Tables<"bestsellers">[]>> => {
    const supabase = await createClient();
    try {
      const { data, error } = await supabase
        .from("bestsellers")
        .select("")
        .returns<Tables<"bestsellers">[]>();

      return { data, error };
    } catch (e) {
      console.error("Exception in getBestsellers:", e);
      return { data: null, error: e as PostgrestError };
    }
  }
);

// Orders mit Order-Items abrufen
export const getServerOrders = cache(
  async (userId: string): Promise<QueryResult<OrderWithItems[]>> => {
    const supabase = await createClient();
    try {
      // Hole Orders mit Produkten
      const { data: orders, error } = await supabase
        .from("orders")
        .select(
          `
          *,
          order_items (
            *,
            products (*)
          )
        `
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .returns<OrderWithItems[]>();

      if (error) throw error;

      // Hole primäre Bilder für alle Produkte
      const productIds = orders?.flatMap((order) =>
        order.order_items.map((item) => item.products.id)
      );

      const { data: images, error: imagesError } = await supabase
        .from("product_images")
        .select("product_id, image_url")
        .eq("is_primary", true)
        .in("product_id", productIds)
        .returns<{ product_id: string; image_url: string }[]>();

      if (imagesError) throw imagesError;

      // Füge Bilder zu den Produkten hinzu
      const enrichedOrders = orders.map((order) => ({
        ...order,
        order_items: order.order_items.map((item) => ({
          ...item,
          products: {
            ...item.products,
            primaryImage: images?.find(
              (img) => img.product_id === item.products.id
            )?.image_url,
          },
        })),
      }));

      return { data: enrichedOrders, error: null };
    } catch (e) {
      console.error("Exception in getServerOrders:", e);
      return { data: null, error: e as PostgrestError };
    }
  }
);

// Einzelne Order mit Details abrufen
export const getServerOrderById = cache(
  async (orderId: string): Promise<QueryResult<Tables<"orders">>> => {
    const supabase = await createClient();
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(
          `
          *,
          order_items (
            *,
            products (*)
          )
        `
        )
        .eq("id", orderId)
        .returns<Tables<"orders">>()
        .single();

      return { data, error };
    } catch (e) {
      console.error("Exception in getServerOrderById:", e);
      return { data: null, error: e as PostgrestError };
    }
  }
);
