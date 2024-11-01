import {
  CoinsIcon,
  Package2Icon,
  PackageIcon,
  SmilePlusIcon,
} from "lucide-react";
import React from "react";

export default function InfoBar() {
  return (
    <div className="flex w-full py-3 bg-contrast mt-2 items-center px-12">
      <div className="flex w-full max-w-7xl mx-auto justify-between gap-4 text-muted font-semibold text-xs lg:text-sm">
        <p className="flex items-center gap-2">
          <PackageIcon className="w-6 h-6" />
          <span className="hidden md:block">Lieferung innerhalb 1-3 Tage</span>
        </p>
        <p className="flex items-center gap-2">
          <CoinsIcon className="w-6 h-6" />
          <span className="hidden md:block">Versandkostenfrei ab 65€ (DE)</span>
        </p>
        <p className="flex items-center gap-2">
          <SmilePlusIcon className="w-6 h-6" />
          <span className="hidden md:block">
            Gratis Goodies zu jeder Bestellung
          </span>
        </p>
      </div>
    </div>
  );
}
