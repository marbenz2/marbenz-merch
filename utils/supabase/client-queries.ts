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
