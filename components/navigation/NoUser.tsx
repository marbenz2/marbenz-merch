import React from "react";
import Link from "next/link";
import { CardDescription } from "../ui/card";

export default function NoUser() {
  return (
    <div className="flex flex-col md:flex-row gap-1 md:gap-4 items-start md:items-center">
      <Link
        href="/sign-in"
        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
      >
        Login
      </Link>
      <Link
        href="/sign-up"
        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
      >
        Registrieren
      </Link>
    </div>
  );
}
