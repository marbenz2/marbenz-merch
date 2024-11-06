import { Tables } from "@/database.types";

export type Categories = Tables<"categories">;
export type Product = Tables<"products">;

export type Products = Tables<"products"> & {
  primaryImage?: string;
  categories?: Tables<"categories">[];
};

export type ProductWithCategories = Product & { categories?: Categories[] };

export type OrderWithItems = Tables<"orders"> & {
  order_items: (Tables<"order_items"> & {
    products: Tables<"products"> & { primaryImage?: string };
  })[];
};
