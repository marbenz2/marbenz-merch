import { createClient } from "./server";
import { Tables } from "@/database.types";
import { cache } from "react";
import { PostgrestError } from "@supabase/supabase-js";

type QueryResult<T> = {
  data: T | null;
  error: PostgrestError | null;
};

type ProductWithImage = Tables<"products"> & {
  primaryImage?: string;
};

// Produkte mit Bildern
export const getServerProductsWithImages = cache(
  async (): Promise<QueryResult<ProductWithImage[]>> => {
    const supabase = await createClient();
    try {
      const { data: products, error: productsError } = await supabase
        .from("products")
        .select("*")
        .returns<Tables<"products">[]>();

      if (productsError) throw productsError;

      // Hole Bilder für alle Produkte in einer einzigen Query
      const { data: images, error: imagesError } = await supabase
        .from("product_images")
        .select("product_id, image_url")
        .eq("is_primary", true)
        .returns<{ product_id: string; image_url: string }[]>();

      if (imagesError) throw imagesError;

      // Verknüpfe Produkte mit ihren Bildern
      const productsWithImages = products.map((product) => ({
        ...product,
        primaryImage: images?.find((img) => img.product_id === product.id)
          ?.image_url,
      }));

      return { data: productsWithImages, error: null };
    } catch (e) {
      console.error("Exception in getServerProductsWithImages:", e);
      return { data: null, error: e as PostgrestError };
    }
  }
);
// Produkte ohne Bilder
export const getServerProducts = cache(
  async (): Promise<QueryResult<Tables<"products">[]>> => {
    const supabase = await createClient();
    try {
      const { data, error } = await supabase
        .from("products")
        .select("")
        .returns<Tables<"products">[]>();

      return { data, error };
    } catch (e) {
      console.error("Exception in getServerProducts:", e);
      return { data: null, error: e as PostgrestError };
    }
  }
);
// Einzelnes Produktbild abrufen
export const getServerProductImage = cache(
  async (productId: string): Promise<QueryResult<string>> => {
    const supabase = await createClient();
    try {
      const { data, error } = await supabase
        .from("product_images")
        .select("image_url")
        .eq("product_id", productId)
        .eq("is_primary", true)
        .returns<{ image_url: string }[]>() // Beachte: Array-Typ hinzugefügt
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
        .select("")
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
