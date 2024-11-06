"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import Stripe from "./Stripe";
import { useCartStore } from "@/app/stores/cartStore";

export default function PaymentSheet({ amount }: { amount: number }) {
  const { clearCart } = useCartStore();
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  return (
    <Sheet
      onOpenChange={(open) => {
        if (!open && isPaymentSuccessful) {
          clearCart();
        }
      }}
    >
      <SheetTrigger asChild>
        <Button>Zur Kasse</Button>
      </SheetTrigger>
      <SheetContent className="w-full md:w-full md:max-w-lg">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <Stripe
          amount={amount}
          onSuccess={() => setIsPaymentSuccessful(true)}
        />
      </SheetContent>
    </Sheet>
  );
}
