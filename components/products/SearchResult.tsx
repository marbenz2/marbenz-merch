import ProductCard from "../ui/product-card";
import { ProductWithCategories } from "@/utils/supabase/additionalTypes";
import { CardDescription } from "../ui/card";
import { useProductStore } from "@/app/stores/productStore";
import Spinner from "../ui/Spinner";

interface SearchResultsProps {
  products: ProductWithCategories[];
}

export function SearchResults({ products }: SearchResultsProps) {
  const { isLoading } = useProductStore();

  return (
    <div className="flex flex-col gap-4">
      <CardDescription className="text-sm text-muted-foreground pb-2">
        Gefundene Produkte: {products.length}
      </CardDescription>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {isLoading && <Spinner />}
        {!isLoading &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}
