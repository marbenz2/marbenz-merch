"use client";

import Products from "@/components/products/Products";
import Sidebar from "@/components/products/Sidebar";
import { useSearchParams } from "next/navigation";

export default function ProductsPage() {
  const params = useSearchParams();
  const category = params.get("category");

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-4">
        <Sidebar />
        <Products category={category} />
      </div>
    </div>
  );
}
