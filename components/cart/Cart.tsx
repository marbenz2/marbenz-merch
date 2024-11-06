"use client";

import { useCartStore } from "@/app/stores/cartStore";
import {
  Card,
  CardBackplate,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import PaymentSheet from "../stripe/PaymentSheet";

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

  if (items.length === 0) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Warenkorb</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Es befinden sich keine Produkte im Warenkorb.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <Card>
        <CardHeader>
          <CardTitle>Warenkorb</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {items.map((item) => (
            <CardBackplate
              key={item.product.id}
              className="flex justify-between p-2"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.product.primaryImage ?? "/placeholder-image.jpg"}
                  alt={item.product.name}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
                <CardHeader>
                  <CardTitle>{item.product.name}</CardTitle>
                  <div className="flex flex-col">
                    <CardDescription>
                      {new Intl.NumberFormat("de-DE", {
                        style: "currency",
                        currency: "EUR",
                      }).format(item.product.price)}
                    </CardDescription>
                    <CardDescription>Größe: {item.size}</CardDescription>
                    <CardDescription>Farbe: {item.color}</CardDescription>
                  </div>
                </CardHeader>
              </div>
              <div className="flex items-center gap-16">
                <div className="flex items-center gap-2">
                  <Button
                    variant="default"
                    size="icon"
                    onClick={() => {
                      const currentQuantity = parseInt(
                        inputValues[item.product.id] ?? item.quantity.toString()
                      );
                      const newQuantity = Math.max(
                        item.product.minimum_order_quantity ?? 0,
                        currentQuantity - 1
                      );
                      setInputValues((prev) => ({
                        ...prev,
                        [item.product.id]: newQuantity.toString(),
                      }));
                      updateQuantity(item.product.id, newQuantity);
                    }}
                  >
                    <MinusIcon />
                  </Button>
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={
                      inputValues[item.product.id] ?? item.quantity.toString()
                    }
                    onChange={(e) => {
                      const newValue = e.target.value.replace(/[^0-9]/g, "");
                      setInputValues((prev) => ({
                        ...prev,
                        [item.product.id]: newValue,
                      }));

                      if (newValue !== "") {
                        const newQuantity = parseInt(newValue);
                        // Prüfen ob die Menge innerhalb der erlaubten Grenzen liegt
                        if (
                          newQuantity >=
                            (item.product.minimum_order_quantity ?? 0) &&
                          newQuantity <=
                            (item.product.maximum_order_quantity ?? 0)
                        ) {
                          updateQuantity(item.product.id, newQuantity);
                        }
                      }
                    }}
                    onBlur={(e) => {
                      const value = e.target.value.trim();
                      let newQuantity =
                        value === ""
                          ? item.product.minimum_order_quantity
                          : parseInt(value);

                      // Grenzen einhalten
                      newQuantity = Math.max(
                        item.product.minimum_order_quantity ?? 0,
                        newQuantity ?? 0
                      );
                      newQuantity = Math.min(
                        item.product.maximum_order_quantity ?? 0,
                        newQuantity ?? 0
                      );

                      setInputValues((prev) => ({
                        ...prev,
                        [item.product.id]: newQuantity.toString(),
                      }));
                      updateQuantity(item.product.id, newQuantity);
                    }}
                    className="w-16 text-center bg-background-navigation [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <Button
                    variant="default"
                    size="icon"
                    onClick={() => {
                      const currentQuantity = parseInt(
                        inputValues[item.product.id] ?? item.quantity.toString()
                      );
                      const newQuantity = Math.min(
                        item.product.maximum_order_quantity ?? 0,
                        currentQuantity + 1
                      );
                      setInputValues((prev) => ({
                        ...prev,
                        [item.product.id]: newQuantity.toString(),
                      }));
                      updateQuantity(item.product.id, newQuantity);
                    }}
                  >
                    <PlusIcon />
                  </Button>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => removeItem(item.product.id)}
                >
                  <TrashIcon />
                </Button>
              </div>
            </CardBackplate>
          ))}
          <div className="mt-4 text-right">
            <p className="text-lg font-bold">
              Gesamtsumme: {getTotalPrice().toFixed(2)} €
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <PaymentSheet amount={getTotalPrice()} />
        </CardFooter>
      </Card>
    </div>
  );
}
