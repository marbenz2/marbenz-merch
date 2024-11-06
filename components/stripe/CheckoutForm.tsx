"use client";

import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { convertToSubcurrency } from "@/utils/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Spinner from "../ui/Spinner";
import Success from "./Success";
import Link from "next/link";
import { useCartStore } from "@/app/stores/cartStore";
import { useUserStore } from "@/app/stores/userStore";
import { createOrder, createOrderItems } from "@/utils/supabase/client-queries";

const CheckoutForm = ({
  amount,
  onSuccess,
}: {
  amount: number;
  onSuccess: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const { profile } = useUserStore();
  const { items, clearCart } = useCartStore();

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [success, setSuccess] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<any>(null);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements || !profile || !shippingAddress) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      clientSecret,
      redirect: "if_required",
      confirmParams: {
        return_url: `${window.location.origin}/protected/orders/`,
      },
    });

    if (result.error) {
      console.log(result.error.message);
      setErrorMessage(result.error.message);
    } else {
      const formattedAddress = `${shippingAddress.name}, ${shippingAddress.address.line1}${
        shippingAddress.address.line2
          ? `, ${shippingAddress.address.line2}`
          : ""
      }, ${shippingAddress.address.postal_code} ${shippingAddress.address.city}, ${
        shippingAddress.address.country
      }`;
      // Bestellung in Supabase erstellen
      const orderResult = await createOrder({
        user_id: profile.id,
        total_amount: amount,
        shipping_address: formattedAddress,
      });

      if (orderResult.error) {
        setErrorMessage("Fehler beim Erstellen der Bestellung");
        setLoading(false);
        return;
      }

      // Order Items erstellen
      const orderItems = items.map((item) => ({
        order_id: orderResult.data!.id,
        product_id: item.product.id,
        quantity: item.quantity,
        price_at_time: item.product.price,
        color: item.color,
        size: item.size,
      }));

      const orderItemsResult = await createOrderItems(orderItems);

      if (orderItemsResult.error) {
        setErrorMessage("Fehler beim Speichern der Bestellpositionen");
        setLoading(false);
        return;
      }
      setLoading(false);
      setSuccess(true);
      onSuccess();
      return;
    }
    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements)
    return (
      <Card className="flex justify-center items-center p-10">
        <Spinner />
      </Card>
    );

  return (
    <Card>
      {!success && (
        <>
          <CardHeader>
            <CardTitle>Bestellung abschließen</CardTitle>
            <CardDescription>
              Betrag:{" "}
              {new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
              }).format(amount)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-16">
              {clientSecret && (
                <div className="flex flex-col gap-4">
                  <PaymentElement />
                  <AddressElement
                    options={{
                      mode: "shipping",
                      allowedCountries: ["DE", "CH", "AT"],
                    }}
                    onChange={(event) => {
                      setShippingAddress(event.value);
                    }}
                  />
                </div>
              )}
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}

              {!success && (
                <Button disabled={!stripe || loading || success}>
                  {loading
                    ? "Lade..."
                    : `${new Intl.NumberFormat("de-DE", {
                        style: "currency",
                        currency: "EUR",
                      }).format(amount)} Bezahlen`}
                </Button>
              )}
            </form>
          </CardContent>
        </>
      )}
      {success && (
        <>
          <CardHeader>
            <CardTitle>Bestellung abgeschlossen</CardTitle>
            <CardDescription>Vielen Dank für Ihre Bestellung!</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Success />
            <Link
              href="/protected/orders"
              className="w-full"
              onClick={() => clearCart()}
            >
              <Button className="w-full">Zur Bestellübersicht</Button>
            </Link>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default CheckoutForm;
