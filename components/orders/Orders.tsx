"use client";

import { useOrderStore } from "@/app/stores/orderStore";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBackplate,
} from "../ui/card";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { DownloadIcon } from "lucide-react";

const getDeliveryDate = (date: string) => {
  const randomDays = Math.floor(Math.random() * 3) + 1; // Zufällige Zahl zwischen 1-3
  return new Date(date).getTime() + randomDays * 24 * 60 * 60 * 1000;
};

export default function Orders() {
  const { orders } = useOrderStore();

  if (orders?.length === 0) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Bestellungen</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Es sind keine Bestellungen vorhanden.
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
          <CardTitle>Bestellungen</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {orders?.map((order) => (
            <CardBackplate key={order.id} className="flex flex-col p-2">
              <CardHeader>
                <CardTitle>Bestellnummer: {order.order_number}</CardTitle>
                <div className="flex flex-col md:flex-row md:gap-4">
                  <CardDescription>
                    Bestelldatum:{" "}
                    {new Date(order.created_at).toLocaleDateString("de-DE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardDescription>
                  <CardDescription>
                    Lieferdatum:{" "}
                    {new Date(
                      getDeliveryDate(order.created_at)
                    ).toLocaleDateString("de-DE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardDescription>
                </div>
                <CardDescription>
                  <a
                    className="flex items-center gap-1"
                    href={`/files/tyvm.pdf`}
                    download
                  >
                    <DownloadIcon className="size-4" /> Rechnung
                  </a>
                </CardDescription>
                <Separator className="bg-border-navigation my-2" />
              </CardHeader>
              <CardContent>
                {order.order_items.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex items-center gap-4">
                      <Image
                        src={
                          item.products.primaryImage ?? "/placeholder-image.jpg"
                        }
                        alt={item.products.name}
                        width={100}
                        height={100}
                        className="rounded-md"
                      />
                      <CardHeader>
                        <CardTitle>{item.products.name}</CardTitle>
                        <div className="flex flex-col">
                          <CardDescription>Größe: {item.size}</CardDescription>
                          <CardDescription>Farbe: {item.color}</CardDescription>
                          <CardDescription>
                            Menge: {item.quantity}
                          </CardDescription>
                        </div>
                      </CardHeader>
                    </div>
                    {index !== order.order_items.length - 1 && (
                      <Separator className="bg-border-navigation my-2" />
                    )}
                  </div>
                ))}
              </CardContent>
            </CardBackplate>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
