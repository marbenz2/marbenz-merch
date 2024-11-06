"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { signOutAction } from "@/app/actions";
import { useUserStore } from "@/app/stores/userStore";
import Link from "next/link";
import {
  PackageIcon,
  ScrollTextIcon,
  ShoppingCartIcon,
  UserIcon,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { useCartStore } from "@/app/stores/cartStore";

export default function User() {
  const { profile } = useUserStore();
  const { items } = useCartStore();
  const [open, setOpen] = useState(false);

  const itemAmount = items.reduce((acc, item) => acc + item.quantity, 0);

  const userInitials = (
    (profile?.first_name?.charAt(0) ?? "") +
    (profile?.last_name?.charAt(0) ?? "")
  ).toUpperCase();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <div className="relative">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="relative">{userInitials}</AvatarFallback>
          </Avatar>
          {items.length > 0 && itemAmount > 0 && (
            <span className="absolute -right-0.5 -bottom-0.5 w-fit px-1 h-4 bg-contrast rounded-full border border-black text-xs flex items-center justify-center text-black">
              {itemAmount}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-md">
          Hallo {profile?.first_name}
          <p className="text-sm text-muted-foreground">{profile?.email}</p>
          <p className="text-sm text-muted-foreground">
            Kundennummer: {profile?.customer_number}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="h-14" onClick={() => setOpen(false)}>
          <Link
            className="flex items-center gap-2 w-full h-full"
            href="/protected/profile"
          >
            <UserIcon />
            Profil
          </Link>
        </DropdownMenuItem>
        <Separator className="bg-border-navigation" />
        <DropdownMenuItem className="h-14" onClick={() => setOpen(false)}>
          <Link
            className="flex items-center gap-2 w-full h-full"
            href="/protected/cart"
          >
            <ShoppingCartIcon />
            Warenkorb{" "}
            {items.length > 0 && itemAmount > 0 && (
              <span className="w-fit px-2 h-6 bg-contrast rounded-full text-sm flex items-center justify-center text-black">
                {itemAmount}
              </span>
            )}
          </Link>
        </DropdownMenuItem>
        <Separator className="bg-border-navigation" />
        <DropdownMenuItem className="h-14" onClick={() => setOpen(false)}>
          <Link
            className="flex items-center gap-2 w-full h-full"
            href="/protected/orders"
          >
            <PackageIcon />
            Bestellungen
          </Link>
        </DropdownMenuItem>
        <Separator className="bg-border-navigation" />
        <DropdownMenuItem className="h-14" onClick={() => setOpen(false)}>
          <Link
            className="flex items-center gap-2 w-full h-full"
            href="/protected/wishlist"
          >
            <ScrollTextIcon />
            Wunschzettel
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="pt-6">
          <Button className="w-full" onClick={() => signOutAction()}>
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
