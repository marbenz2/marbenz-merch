import { Products } from "@/utils/supabase/additionalTypes";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { useCartStore } from "@/app/stores/cartStore";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/app/stores/userStore";
import { CardDescription } from "../ui/card";
import Link from "next/link";

type Size = string;
type Color = { name: string; value: string };

export function ProductDetails({ product }: { product: Products }) {
  const { toast } = useToast();
  const { profile } = useUserStore();
  const { addItem } = useCartStore();
  const [selectedSize, setSelectedSize] = useState<Size>();
  const [selectedColor, setSelectedColor] = useState<string>(
    (product.colors as Color[])[0].name
  );

  const handleAddToCart = (product: Products) => {
    addItem(product, 1, selectedSize, selectedColor, () => {
      toast({
        title: "Artikel wurde zum Warenkorb hinzugefügt",
        variant: "default",
      });
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Produktbild */}
        <div className="aspect-square relative">
          {product.primaryImage && (
            <img
              src={product.primaryImage}
              alt={product.name}
              className="object-cover rounded-lg"
            />
          )}
        </div>

        {/* Produktinformationen */}
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-xl font-semibold">{product.price} €</p>
          <p className="text-muted-foreground">{product.description}</p>

          {/* Größenauswahl */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Größe</label>
            <Select onValueChange={(value: Size) => setSelectedSize(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Wähle eine Größe" />
              </SelectTrigger>
              <SelectContent>
                {product.sizes?.map((size) => (
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
              {(product.colors as Color[]).map((color: Color) => (
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

          {!profile && (
            <CardDescription>
              Bitte{" "}
              <Link href="/sign-in" className="underline decoration-dotted">
                logge dich ein
              </Link>{" "}
              um Produkte in den Warenkorb zu legen.
            </CardDescription>
          )}
          {profile && (
            <Button
              onClick={() => handleAddToCart(product)}
              className="w-full"
              disabled={!selectedSize || !selectedColor}
            >
              In den Warenkorb
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
