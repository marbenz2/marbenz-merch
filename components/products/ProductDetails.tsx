import { ProductWithImage } from "@/utils/supabase/additionalTypes";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";

type Size = string;
type Color = { name: string; value: string };

export function ProductDetails({
  productWithImage,
}: {
  productWithImage: ProductWithImage;
}) {
  const [selectedSize, setSelectedSize] = useState<Size>();
  const [selectedColor, setSelectedColor] = useState<string>(
    (productWithImage.colors as Color[])[0].name
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Produktbild */}
        <div className="aspect-square relative">
          {productWithImage.primaryImage && (
            <img
              src={productWithImage.primaryImage}
              alt={productWithImage.name}
              className="object-cover rounded-lg"
            />
          )}
        </div>

        {/* Produktinformationen */}
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">{productWithImage.name}</h1>
          <p className="text-xl font-semibold">{productWithImage.price} €</p>
          <p className="text-muted-foreground">
            {productWithImage.description}
          </p>

          {/* Größenauswahl */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Größe</label>
            <Select onValueChange={(value: Size) => setSelectedSize(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Wähle eine Größe" />
              </SelectTrigger>
              <SelectContent>
                {productWithImage.sizes?.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Farbauswahl */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Farbe</label>
            <div className="flex gap-2">
              {(productWithImage.colors as Color[]).map((color: Color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color.name && "border-contrast"
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
            {selectedColor && <p className="text-sm">{selectedColor}</p>}
          </div>

          <Button className="w-full" disabled={!selectedSize || !selectedColor}>
            In den Warenkorb
          </Button>
        </div>
      </div>
    </div>
  );
}
