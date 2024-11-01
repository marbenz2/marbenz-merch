import { Tables } from "@/database.types";

export type ProductWithImage = Tables<"products"> & {
  primaryImage?: string;
};
