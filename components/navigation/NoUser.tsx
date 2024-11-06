import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function NoUser() {
  return (
    <div className="flex gap-4">
      <Link href="/sign-in">
        <Button>Login</Button>
      </Link>
      <Link href="/sign-up" className="hidden lg:block">
        <Button>Registrieren</Button>
      </Link>
    </div>
  );
}
