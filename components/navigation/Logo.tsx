import React from "react";
import Link from "next/link";
export default function Logo() {
  return (
    <Link href="/" className="flex flex-col -space-y-3">
      <h1 className="text-4xl font-light text-contrast tracking-tighter">
        MarBenz
      </h1>
      <p className="text-sm text-muted-foreground uppercase tracking-widest">
        merch
      </p>
    </Link>
  );
}
