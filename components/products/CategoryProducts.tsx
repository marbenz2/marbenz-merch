import { CardContent, CardDescription, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { CarouselComponent } from "../CarouselComponent";
import {
  Categories,
  ProductWithCategories,
} from "@/utils/supabase/additionalTypes";
import ProductCard from "../ui/product-card";
import { useProductStore } from "@/app/stores/productStore";

interface CategoryProductsProps {
  categoryName: string | null | undefined;
  products: ProductWithCategories[];
  categories: Categories[];
}

export function CategoryProducts({
  categoryName,
  products,
  categories,
}: CategoryProductsProps) {
  const { isLoading } = useProductStore();

  const getProductsByCategory = (categoryId: string) => {
    const test = products.filter((product) =>
      product.categories?.some((cat) => cat.id === categoryId)
    );
    return test;
  };

  // Fall 1: Keine Kategorie ausgewählt - zeige alle Hauptkategorien
  if (!categoryName) {
    const mainCategories = categories
      .filter((cat) => cat.category_type === "main")
      .sort((a, b) => a.name.localeCompare(b.name));

    return (
      <div>
        {mainCategories.map((mainCategory) => {
          const mainCategoryProducts = getProductsByCategory(mainCategory.id);
          const subCategories = categories
            .filter((cat) => cat.parent_id === mainCategory.id)
            .sort((a, b) => a.name.localeCompare(b.name));

          return (
            <div key={mainCategory.id}>
              {mainCategoryProducts.length > 0 && (
                <div>
                  <CardTitle className="mb-4">{mainCategory.name}</CardTitle>
                  <CardContent>
                    <CarouselComponent products={mainCategoryProducts} />
                  </CardContent>
                  {subCategories.length > 0 && (
                    <Separator className="my-4 bg-border-navigation" />
                  )}
                </div>
              )}

              {subCategories.map((subCat) => {
                const subCategoryProducts = getProductsByCategory(subCat.id);
                if (!subCategoryProducts.length) return null;

                return (
                  <div key={subCat.id}>
                    <CardTitle className="text-lg ml-4 mb-4">
                      {subCat.name}
                    </CardTitle>
                    <CardContent>
                      <CarouselComponent products={subCategoryProducts} />
                    </CardContent>
                    <Separator className="my-4 bg-border-navigation" />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }

  // Finde die ausgewählte Kategorie
  const selectedCategory = categories.find(
    (cat) => cat.name.toLowerCase() === categoryName
  );
  if (!selectedCategory) return null;

  // Fall 2: Subkategorie ausgewählt
  if (selectedCategory.category_type === "sub") {
    return (
      <div>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </CardContent>
      </div>
    );
  }

  // Fall 3: Hauptkategorie ausgewählt
  const subCategories = categories
    .filter((cat) => cat.parent_id === selectedCategory.id)
    .sort((a, b) => a.name.localeCompare(b.name));

  const mainCategoryProducts = getProductsByCategory(selectedCategory.id);

  return (
    <div>
      {mainCategoryProducts.length > 0 ? (
        <div>
          <CardTitle className="mb-4">{selectedCategory.name}</CardTitle>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {mainCategoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </CardContent>
          {subCategories.length > 0 && (
            <Separator className="my-4 bg-border-navigation" />
          )}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Momentan sind keine Produkte in dieser Kategorie verfügbar.
        </p>
      )}

      {subCategories.map((subCat) => {
        const subCategoryProducts = getProductsByCategory(subCat.id);
        if (!subCategoryProducts.length) return null;

        return (
          <div key={subCat.id}>
            <CardTitle className="text-lg ml-4 mb-4">{subCat.name}</CardTitle>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {subCategoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </CardContent>
            <Separator className="my-4 bg-border-navigation" />
          </div>
        );
      })}
    </div>
  );
}
